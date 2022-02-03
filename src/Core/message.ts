import type { WAMessage, WASocket } from "@adiwajshing/baileys";
import type { Prefix, RMessage } from "../type";
import * as Redis from "./redis-store";
import { getAuth } from "./authentication";

export async function messageHandler(msg: WAMessage, rbot: WASocket) {
	if (msg.key.fromMe) return;
	if (msg.message?.conversation) {
		if (msg.message.conversation.includes("flush")) {
			Redis.flushAll();
		}
	}
	let RMsg = await messageParser(msg);

	if (RMsg.prefix && RMsg.prefix.cmd1 == "test") {
		rbot.sendMessage(msg.key.remoteJid!, { text: JSON.stringify(RMsg) });
	}
}

async function messageParser(msg: WAMessage): Promise<RMessage> {
	let isGroup = Boolean(msg.key.participant);
	console.log(isGroup);

	let auth = isGroup ? await getAuth.group(msg) : await getAuth.user(msg);
	let prefix = getPrefix(
		msg.message?.conversation || msg.message?.imageMessage?.caption || "",
	);
	if (!prefix) console.log(msg);
	return { ...msg, prefix, auth };
}

function getPrefix(msg: string, prefix: string = "#"): Prefix | false {
	if (msg.indexOf(prefix) >= 0) {
		let cmd = msg
			.slice(msg.indexOf(prefix) + 1)
			.split(" ", 4)
			.filter((res) => res);

		return {
			prefix,
			cmd1: cmd[0],
			cmd2: cmd[1],
		};
	} else return false;
}
