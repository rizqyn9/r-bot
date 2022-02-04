import type { WASocket } from "@adiwajshing/baileys";
import type { RMessage } from "../type";
import * as Utils from "../utils";

export function authentication(msg: RMessage, rbot: WASocket): any {
	if (msg.userData?.isRegistered || msg.groupData?.isRegistered) {
		return rbot.sendMessage(msg.jid, {
			text: `${msg.isGroup ? "Group" : "User"} already registered`,
		});
	}
	if (msg.prefix && msg.prefix.text) {
		let parse = Utils.parseSymbol(msg.prefix.text.replace(msg.prefix.cmd1, ""));
		if (parse.length < 2) {
			return rbot.sendMessage(msg.jid, {
				text: "Example: #daftar <Nama> | <Asal>",
			});
		} else {
			return rbot.sendMessage(msg.jid, {
				text: "Saved auth",
			});
		}
	}
}
