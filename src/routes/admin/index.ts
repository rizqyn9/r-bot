import { RBotSocket, RMessage } from "../../types";
function adminHandler(msg: RMessage, rbot: RBotSocket) {
  console.log(msg);

  rbot.messageHelper.sendMessageSuccess({ jid: msg.jid, text: "Hi Admin" });
}

export { adminHandler };
