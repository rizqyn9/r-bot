import { WASocket } from "@adiwajshing/baileys";
import { RMessage } from "../type";
import { authentication } from "./authentication";

export * from "./authentication";

export async function messageRouter(msg: RMessage, rbot: WASocket) {
	console.log(msg.prefix);

	if (msg.prefix && msg.prefix.prefix) {
		switch (msg.prefix.cmd1.toLowerCase()) {
			case "daftar":
				authentication(msg, rbot);
				break;

			default:
				break;
		}
	}
}
