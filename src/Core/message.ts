import type { WAMessage, WASocket } from "@adiwajshing/baileys";
import { UserData } from "../Models";
import * as Mongo from "./mongo-store";
import * as Redis from "./redis-store";

export function messageHandler(msg: WAMessage, rbot: WASocket) {
	if (msg.key.fromMe) return;
	if (msg.message?.conversation) {
		if (msg.message.conversation.includes("flush")) {
			Redis.flushAll();
		}
	}
	getAuth(msg, rbot);
}

async function getAuth(msg: WAMessage, rbot: WASocket) {
	try {
		let user: UserData | null;
		let msgId = msg.key.remoteJid!;

		/**
		 * * AUTHENTICATION *
		 * Check Redis
		 * (true) return data
		 * (false) find in mongo store
		 * 		(true) return the data and set to redis
		 * 		(false) regist the data
		 * 				(true) return the data and set to redis
		 * 				(false) skipped this conversation
		 */

		if (await Redis.checkExistingKey(msgId)) {
			user = (await Redis.getData(msgId)) as UserData;
		} else {
			await Mongo.getData(msgId).then(async (result) => {
				if (result) {
					user = result as UserData;

					await Redis.setData(msgId, result);
				} else {
					await Mongo.registUser
						.guest({
							jid: msg.key.remoteJid!,
							pushName: msg.pushName || "User Not Set",
						})
						.then((val) => {
							user = val;
							Redis.setData(msg.key.remoteJid!, val!);
						});
				}
			});
		}

		console.log(user!);
	} catch (error) {}
}
