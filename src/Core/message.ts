import type { WAMessage, MessageUpdateType } from "@adiwajshing/baileys";
import type { Prefix, RMessage } from "../types";
import * as Redis from "./redis-store";
import { getAuth } from "./authentication";
import * as Message from "../messageHandler";
import { RBotSocket } from "../types/index";

export async function messageHandler(
  WAmsg: WAMessage,
  type: MessageUpdateType,
  rbot: RBotSocket
) {
  try {
    if (WAmsg.key.fromMe) return;
    if (type !== "notify") {
      // Handle on Development mode
      console.log(WAmsg.key.remoteJid, type.toUpperCase());
      return;
    }

    /**
     * clearance all redis
     */
    if (WAmsg.message?.conversation) {
      if (WAmsg.message.conversation.includes("flush")) {
        Redis.flushAll();
        return rbot.messageHelper.sendMessageTxt({
          jid: WAmsg.key.remoteJid!,
          text: "Success to flush redis cache",
        });
      }
    }

    /**
     * Parse message
     */
    let msg: RMessage = await messageParser(WAmsg);

    await Message.messageRouter(msg, rbot);

    if (msg.auth && !msg.auth.isRegistered) {
      console.log("Authentication Routes");
      return await Message.authentication(msg, rbot);
    }

    if (msg.auth && msg.auth.isRegistered) {
      if (msg.prefix && msg.prefix.cmd1 == "test") {
        rbot.messageHelper.sendMessageInfo({
          jid: msg.jid,
          text: JSON.stringify(msg),
        });
      }
    } else {
      if (!msg.isGroup) {
        return rbot.messageHelper.sendMessageError({
          jid: msg.jid,
          text: "you dont have authorization for this action",
        });
      }
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      return rbot.messageHelper.sendMessageError({
        jid: WAmsg.key.remoteJid!,
        text: error.message,
      });
    else
      return rbot.messageHelper.sendMessageError({
        jid: WAmsg.key.remoteJid!,
        text: `Unknown Error : ${JSON.stringify(error)}`,
      });
  }
}

async function messageParser(msg: WAMessage): Promise<RMessage> {
  let isGroup = Boolean(msg.key.participant);

  let auth = isGroup ? await getAuth.group(msg) : await getAuth.user(msg);
  let prefix = getPrefix(
    msg.message?.conversation || msg.message?.imageMessage?.caption || ""
  );
  if (!prefix) console.log(msg);
  return { ...msg, prefix, auth, jid: msg.key.remoteJid!, isGroup };
}

function getPrefix(msg: string, prefix: string = "#"): Prefix | false {
  if (msg.indexOf(prefix) >= 0) {
    let noPrefix = msg.slice(msg.indexOf(prefix) + 1);
    let cmd = noPrefix.trim().split(" ", 2);

    return {
      prefix,
      cmd1: cmd[0],
      cmd2: cmd[1],
      text: noPrefix.trim(),
      any: cmd,
    };
  } else return false;
}
