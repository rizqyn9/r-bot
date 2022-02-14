import { RMessage, RBotSocket } from "../types";
import { authentication } from "./authentication";

export * from "./authentication";

export async function messageRouter(msg: RMessage, rbot: RBotSocket) {
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
