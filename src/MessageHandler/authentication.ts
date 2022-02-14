import type { RMessage, StructMessages, RBotSocket } from "../types";
import * as Utils from "../utils";
import { MongoStore, RedisStore } from "../core";

export async function authentication(
  msg: RMessage,
  rbot: RBotSocket
): Promise<any> {
  if (msg.auth?.isRegistered) {
    return rbot.sendMessage(msg.jid, {
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
        console.log("aasdasd", parse);
        return await MongoStore.group
          .update(msg.jid, {
            groupName: parse[0],
            isRegistered: true,
          })
          .then(async (val) => {
            if (val) {
              await RedisStore.setData(msg.jid, val);
              return rbot.messageHelper.sendMessageSuccess({
                jid: msg.jid,
                text: `Success : ${JSON.stringify(val)}`,
              });
            } else throw new Error("Regist fail");
          })
          .catch((e) => {
            throw new Error(e);
          });
      }
    } catch (error) {
      if (error instanceof Error) throw error;
      else throw new Error(JSON.stringify(error));
    }
  }
}

const tmpMsg: StructMessages = {
  reqAuthUser: {
    id: "asdasd",
  },
};
