import makeWASocket from "@adiwajshing/baileys";

const Client = () => {
	const socket = makeWASocket({});

	// Socket punya method untuk response message
	socket.sendMessage("asd", { text: "Hello there!" });

	socket.ev.on("messages.upsert", (data) => {
		// msgHandler(socket, data);
	});

	return socket;
};
