import { RBotSocket } from "../types";
import { Singleton } from "./index";

type MessageProps = { jid: string };

export const messageHelper = {
  sendMessageTxt(props: MessageProps & { msg: string }) {
    Singleton.RBot.sendMessage(props.jid, { text: props.msg });
  },
  sendMessageError(props: MessageProps) {},
};

export type MessageHelper = typeof messageHelper;
