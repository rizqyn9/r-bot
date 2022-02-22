import { RMessage, RBotSocket } from "../types";
import { adminHandler } from "./admin";
import { commandRouter } from "./command";
import { helpRouter } from "./services";

async function routesHandler(msg: RMessage, rbot: RBotSocket) {
  if (msg.prefix && msg.prefix.prefix) {
    switch (msg.prefix.cmd1) {
      case "admin":
        adminHandler(msg, rbot);
        break;

      case "command":
        commandRouter(msg, rbot);
        break;

      case "help":
        helpRouter(msg, rbot);
        break;

      default:
        break;
    }
  }
}

export { routesHandler };
