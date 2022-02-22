import type { WAMessage, MessageUpdateType } from "@adiwajshing/baileys";
import type { Prefix, RBotSocket, RMessage } from "../types";
import * as Redis from "./redis-store";
import * as Message from "../messageHandler";

export async function messageHandler(WAmsg: WAMessage, type: MessageUpdateType, rbot: RBotSocket) {
  try {
    if (WAmsg.key.fromMe) return;
    if (type !== "notify") {
      // Handle on Development mode
      console.log(WAmsg.key.remoteJid, type.toUpperCase());
      return;
    }

    console.log(WAmsg);
    console.log(JSON.stringify(WAmsg.message));

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
    let msg: RMessage = await messageParser(WAmsg, rbot);

    console.log(msg);
    await Message.messageRouter(msg, rbot);

    if (rbot.authorization.isAllowed(msg.auth, ["GUEST", "ADMIN_BOT"])) {
      if (msg.prefix && msg.prefix.cmd1 == "test") {
        // rbot.messageHelper.sendMessageInfo({
        //   jid: msg.jid,
        //   text: JSON.stringify(msg),
        // });
      }
    } else {
      if (!msg.isGroup) {
        return rbot.messageHelper.sendMessageError({
          jid: msg.jid,
          text: "You dont have authorization to perform this action",
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

// Problem in message Parser
async function messageParser(msg: WAMessage, rbot: RBotSocket): Promise<RMessage> {
  let isGroup = Boolean(msg.key.participant);
  let getAuth = isGroup
    ? await rbot.authorization.getAuth.group(msg)
    : await rbot.authorization.getAuth.user(msg);
  let prefix = getPrefix(msg.message?.conversation || msg.message?.imageMessage?.caption || "");

  if (!prefix) console.log(msg);

  return {
    ...msg,
    jid: msg.key.remoteJid!,
    auth: getAuth?.authProps.role || "GUEST",
    isGroup,
    userData: isGroup ? undefined : (getAuth as UserProps),
    groupData: isGroup ? (getAuth as GroupProps) : undefined,
    prefix,
  };
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

/**
 * Docs
 * Button message
 */

// rbot.sendMessage(msg.jid, {
//   buttons: [
//     {
//       buttonId: "1",
//       buttonText: {
//         displayText: "Test1 Display",
//       },
//       nativeFlowInfo: {
//         name: "Test1 Native",
//         paramsJson: "Test1 Param",
//       },
//     },
//     {
//       buttonId: "2",
//       type: 1,
//       buttonText: {
//         displayText: "Response",
//       },
//     },
//     {
//       buttonId: "3",
//       type: 2,
//       buttonText: {
//         displayText: "Native flow",
//       },
//     },
//     {
//       buttonId: "4",
//       type: 0,
//       buttonText: {
//         displayText: "Unknown",
//       },
//     },
//   ],

//   buttonText: "Button",
//   text: "asdasd",
// });

/**
 * Button with footer header
 */

// const buttons = [
//   { buttonId: "id1", buttonText: { displayText: "Button 1" }, type: 1 },
//   { buttonId: "id2", buttonText: { displayText: "Button 2" }, type: 1 },
//   { buttonId: "id3", buttonText: { displayText: "Button 3" }, type: 1 },
// ];

// const buttonMessage = {
//   text: "Hi it's button message",
//   footer: "Hello World",
//   buttons: buttons,
//   headerType: 1,
// };

// rbot.sendMessage(msg.jid, buttonMessage);

/**
 * Template buttons
 */

//  const templateButtons = [
//   {
//     index: 1,
//     urlButton: {
//       displayText: "⭐ Star Baileys on GitHub!",
//       url: "https://github.com/adiwajshing/Baileys",
//     },
//   },
//   {
//     index: 2,
//     callButton: {
//       displayText: "Call me!",
//       phoneNumber: "+1 (234) 5678-901",
//     },
//   },
//   {
//     index: 3,
//     quickReplyButton: {
//       displayText: "This is a reply, just like normal buttons!",
//       id: "id-like-buttons-message",
//     },
//   },
// ];

// const templateMessage = {
//   text: "Hi it's a template message",
//   footer: "Hello World",
//   templateButtons: templateButtons,
// };

// rbot.sendMessage(msg.jid, templateMessage);

/**
 *  List sections
 * */

//  const sections = [
//   {
//     title: "Section 1",
//     rows: [
//       { title: "Option 1", rowId: "option1" },
//       {
//         title: "Option 2",
//         rowId: "option2",
//         description: "This is a description",
//       },
//     ],
//   },
//   {
//     title: "Section 2",
//     rows: [
//       { title: "Option 3", rowId: "option3" },
//       {
//         title: "Option 4",
//         rowId: "option4",
//         description: "This is a description V2",
//       },
//     ],
//   },
// ];

// const listMessage = {
//   text: "This is a list",
//   footer: "nice footer, link: https://google.com",
//   title: "Amazing boldfaced list title",
//   buttonText: "Required, text on the button to view the list",
//   sections,
// };

// const a = rbot.sendMessage(msg.jid, listMessage);
// console.log(a);
