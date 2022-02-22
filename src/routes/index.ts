import { RMessage, RBotSocket } from "../types";
import { adminHandler } from "./admin";

async function routesHandler(msg: RMessage, rbot: RBotSocket) {
  console.log(msg);
  if (msg.prefix && msg.prefix.prefix) {
    if (msg.prefix.cmd1 === "admin") {
      adminHandler(msg, rbot);
    }
  }
}

export { routesHandler };
