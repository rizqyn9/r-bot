import { RMessage, RBotSocket } from "../../types";
import { tempMessage } from "./temp.command";

function commandRoute(msg: RMessage, rbot: RBotSocket) {
  if (msg.prefix && msg.prefix.cmd1) {
    rbot.sendMessage(msg.jid, tempMessage["data"]);
  }
}

export { commandRoute };
