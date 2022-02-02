import type { WAMessage, WASocket } from "@adiwajshing/baileys";
import * as Mongo from "./mongo-store";
import * as Redis from "./redis-store";

export function messageHandler(msg: WAMessage, rbot: WASocket) {
	if (msg.key.fromMe) return;
	getAuth(msg, rbot);
}

async function getAuth(msg: WAMessage, rbot: WASocket) {
	let result = await Redis.checkExistingKey(msg.key.id!);
	if (result) {
		return result;
	} else {
		// Try to check on Mongo Store
		let data = await Mongo.getData(msg.key.remoteJid!);
		if (!data) {
			Mongo.registUser
				.guest({
					jid: msg.key.remoteJid!,
					pushName: msg.pushName || "User Not Set",
				})
				.then((val) => {
					Redis.setData(msg.key.remoteJid!, val!);
				});
		}
	}
}
