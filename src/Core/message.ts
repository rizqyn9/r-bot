import type { WAMessage, WASocket } from "@adiwajshing/baileys";
import type { Prefix, RMessage } from "../type";
import * as Redis from "./redis-store";
import { getAuth } from "./authentication";
import * as Message from "../messageHandler";

export async function messageHandler(WAmsg: WAMessage, rbot: WASocket) {
	if (WAmsg.key.fromMe) return;
	if (WAmsg.message?.conversation) {
		if (WAmsg.message.conversation.includes("flush")) {
			Redis.flushAll();
		}
	}
	let msg: RMessage = await messageParser(WAmsg);

	await Message.messageRouter(msg, rbot);

	if (msg.auth && !msg.auth.isRegistered) {
		Message.authentication(msg, rbot);
	}

	if (msg.auth && msg.auth.isRegistered) {
		if (msg.prefix && msg.prefix.cmd1 == "test") {
			rbot.sendMessage(msg.key.remoteJid!, { text: JSON.stringify(msg) });
		}
	} else {
		if (!msg.isGroup) {
			rbot.sendMessage(msg.jid, {
				text: "you dont have authorization for this action",
			});
		}
	}
}

async function messageParser(msg: WAMessage): Promise<RMessage> {
	let isGroup = Boolean(msg.key.participant);

	let auth = isGroup ? await getAuth.group(msg) : await getAuth.user(msg);
	let prefix = getPrefix(
		msg.message?.conversation || msg.message?.imageMessage?.caption || "",
	);
	if (!prefix) console.log(msg);
	return { ...msg, prefix, auth, jid: msg.key.remoteJid!, isGroup };
}

function getPrefix(msg: string, prefix: string = "#"): Prefix | false {
	if (msg.indexOf(prefix) >= 0) {
		let noPrefix = msg.slice(msg.indexOf(prefix) + 1);
		let cmd = noPrefix.trim().split(" ", 2);

		return {
			prefix,
			cmd1: cmd[0],
			cmd2: cmd[1],
			text: noPrefix.trim(),
			any: cmd,
		};
	} else return false;
}
