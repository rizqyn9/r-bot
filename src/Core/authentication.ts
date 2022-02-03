import type { WAMessage, WASocket } from "@adiwajshing/baileys";
import { UserData } from "../models";
import * as Mongo from "./mongo-store";
import * as Redis from "./redis-store";

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
export async function getAuth(
	msg: WAMessage,
	rbot: WASocket,
): Promise<UserData | null> {
	let user: UserData | null;
	let msgId = msg.key.remoteJid!;
	try {
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
		return user!;
	} catch (error) {
		throw new Error(error as any);
	}
}
