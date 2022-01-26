import makeWASocket, {
	useSingleFileAuthState,
	DisconnectReason,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import P from "pino";
import { Logger } from "./utils/logger";

const { state, saveState } = useSingleFileAuthState("./rbot_session.json");

export default function RBot() {
	const rBot = makeWASocket({
		printQRInTerminal: true,
		logger: P({ level: "silent" }),
		auth: state,
	});

	rBot.ev.on("connection.update", (update) => {
		const { connection, lastDisconnect } = update;
		Logger.bot(
			`Connection ${update.connection}, last disconnect ${update.lastDisconnect}`,
		);
		if (connection === "close") {
			// reconnect if not logged out
			if (
				(lastDisconnect?.error as Boom)?.output?.statusCode !==
				DisconnectReason.loggedOut
			) {
				RBot();
			} else {
				Logger.error("Connection closed");
			}
		}
	});

	rBot.ev.on("messages.update", (data) => {
		console.log("msgupdt", data);
	});

	rBot.ev.on("creds.update", saveState);

	rBot.ev.on("chats.set", (data) => {
		console.log("chat", data);
	});

	rBot.ev.on("messages.set", (data) => {
		console.log("msg", data);
	});

	rBot.ev.on("contacts.set", (data) => {
		console.log(data);
	});

	rBot.ev.on("chats.upsert", (data) => {
		console.log("chtup", data);
	});

	// rBot.ev.on("chats.update", (data) => {
	// 	console.log("chtudt", data);
	// });

	rBot.ev.on("chats.delete", (data) => {
		console.log(data);
	});

	rBot.ev.on("presence.update", (data) => {});

	rBot.ev.on("contacts.upsert", (data) => {
		console.log(data);
	});

	rBot.ev.on("contacts.update", (data) => {
		console.log(data);
	});

	rBot.ev.on("messages.delete", (data) => {
		console.log(data);
	});

	rBot.ev.on("messages.upsert", (data) => {
		console.log("msgUp", data);
	});

	rBot.ev.on("message-receipt.update", (data) => {
		console.log("msgRcp", data);
	});

	rBot.ev.on("groups.upsert", (data) => {
		console.log(data);
	});

	rBot.ev.on("groups.update", (data) => {
		console.log(data);
	});

	rBot.ev.on("group-participants.update", (data) => {
		console.log(data);
	});

	rBot.ev.on("blocklist.set", (data) => {
		console.log(data);
	});

	rBot.ev.on("blocklist.update", (data) => {
		console.log(data);
	});
}
