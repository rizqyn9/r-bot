import { RBotSocket, RMessage } from "../../types";

function adminHandler(msg: RMessage, rbot: RBotSocket) {
  if (rbot.authorization.isAllowed(msg.auth, "ADMIN_BOT")) {
    console.log(msg);

    rbot.messageHelper.sendMessageSuccess({ jid: msg.jid, text: "Hi Admin" });
  } else {
    return rbot.messageHelper.sendTemp(msg.jid, "noauth");
  }
}

export { adminHandler };
