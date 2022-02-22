import { RMessage, RBotSocket } from "../types";
import { adminHandler } from "./admin";
import { commandRoute } from "./command";

async function routesHandler(msg: RMessage, rbot: RBotSocket) {
  if (msg.prefix && msg.prefix.prefix) {
    switch (msg.prefix.cmd1) {
      case "admin":
        adminHandler(msg, rbot);
        break;

      case "command":
        commandRoute(msg, rbot);
        break;

      default:
        break;
    }
  }
}

export { routesHandler };
