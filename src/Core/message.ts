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
	messageParser(msg);
	// let parseMsg: RMessage;
	// parseMsg = { ...msg, userData: await getAuth(msg, rbot) };

	// console.log(parseMsg);
}

function messageParser(msg: WAMessage): RMessage {
	let prefix: Prefix | null;
	if (msg.message?.conversation) {
		getPrefix(msg.message?.conversation);
	} else if (msg.message?.imageMessage) {
	}
	return { ...msg };
}

function getPrefix(msg: string): Prefix | null {
	console.log(msg);

	return null;
}
