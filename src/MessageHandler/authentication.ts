import type { RMessage, StructMessages, RBotSocket } from "../types";
import * as Utils from "../utils";
import { MongoStore, RedisStore } from "../core";

export async function authentication(
  msg: RMessage,
  rbot: RBotSocket
): Promise<any> {
  if (msg.auth !== "GUEST") {
    return rbot.messageHelper.sendMessageError({
      jid: msg.jid,
      text: `${msg.pushName || "Unknown"} already registered`,
    });
  }
  if (msg.prefix && msg.prefix.text) {
    try {
      let parse = Utils.parseSymbol(
        msg.prefix.text.replace(msg.prefix.cmd1, "")
      );

      if (parse.length < 2) {
        throw new Error(`Example #Daftar asdad | asd`);
      } else {
        return msg.isGroup
          ? await authGroup(msg, parse, rbot)
          : await authUser(msg, parse, rbot);
      }
    } catch (error) {
      if (error instanceof Error) throw error;
      else throw new Error(JSON.stringify(error));
    }
  }
}

async function authGroup(msg: RMessage, parse: string[], rbot: RBotSocket) {
  await MongoStore.group
    .update(msg.jid, {
      pushName: parse[0],
      authProps: { role: "USER" },
    })
    .then(async (val) => {
      if (val) {
        await RedisStore.setData(msg.jid, val);
        return rbot.messageHelper.sendMessageSuccess({
          jid: msg.jid,
          text: `Success : ${JSON.stringify(val)}`,
        });
      } else throw new Error("Group regist fail");
    })
    .catch((e) => {
      throw new Error(e);
    });
}

async function authUser(msg: RMessage, parse: string[], rbot: RBotSocket) {
  await MongoStore.user
    .update(msg.jid, {
      pushName: parse[0],
      authProps: { role: "USER" },
    })
    .then(async (val) => {
      if (val) {
        await RedisStore.setData(msg.jid, val);
        return rbot.messageHelper.sendMessageSuccess({
          jid: msg.jid,
          text: `Success : ${JSON.stringify(val)}`,
        });
      } else throw new Error("User regist fail");
    })
    .catch((e) => {
      throw new Error(e);
    });
}
