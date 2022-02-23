import { RBotSocket, RMessage } from "../../../types";
import { helpTempMsg } from "./msgTemp.help";

const helpRouter = (msg: RMessage, rbot: RBotSocket) => {
  return rbot.sendMessage(msg.jid, helpTempMsg["help"]);
};

export { helpRouter };
