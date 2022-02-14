import type { WASocket } from "@adiwajshing/baileys";
import type { RMessage, StructMessage, StructMessages } from "../type";
import * as Utils from "../utils";
import * as Mongo from "../core/mongo-store";
import * as Redis from "../core/redis-store";

export async function authentication(
	msg: RMessage,
	rbot: WASocket,
): Promise<any> {
	console.log(msg);

	if (msg.auth?.isRegistered) {
		return rbot.sendMessage(msg.jid, {
			text: `${msg.isGroup ? "Group" : "User"} already registered`,
		});
	}
	if (msg.prefix && msg.prefix.text) {
		let parse = Utils.parseSymbol(msg.prefix.text.replace(msg.prefix.cmd1, ""));
		if (parse.length < 2) {
			return rbot.sendMessage(msg.jid, {
				text: tmpMsg.reqAuthUser["id"],
			});
		} else {
			return await Mongo.group
				.update(msg.jid, {
					groupName: parse[0],
					isRegistered: true,
				})
				.then(async (val) => {
					if (val) {
						await Redis.setData(msg.jid, val);
						return rbot.sendMessage(msg.jid, {
							text: JSON.stringify(val),
						});
					}
				});
		}
	}
}

const tmpMsg: StructMessages = {
	reqAuthUser: {
		id: "asdasd",
	},
};
