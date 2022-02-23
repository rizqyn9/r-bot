import { RBotSocket, RMessage } from "../../types";
function shopRouter(msg: RMessage, rbot: RBotSocket) {
  rbot.sendMessage(msg.jid, {
    title: "RShop",
    text: "Best services with automation",
    footer: "Rdev studio",
    buttons: [{ buttonId: "Pusat Bantuan", buttonText: { displayText: "Pusat Bantuan" } }],
    sections: [
      {
        title: "Diamond",
        rows: [{ title: "Diamond title", description: "Diamond desc" }],
      },
    ],
  });

  rbot.sendMessage(msg.jid, {
    text: "Pusat bantuan",
    buttons: [{ buttonId: "Pusat Bantuan", buttonText: { displayText: "Pusat Bantuan" } }],
  });
  return;
}

export { shopRouter };
