import { Singleton } from "./index";

type MessageProps = { jid: string };

export const messageHelper = {
  sendMessageTxt(props: MessageProps & { text: string }) {
    Singleton.RBot.sendMessage(props.jid, { text: props.text });
  },
  sendMessageSuccess(props: MessageProps & { text: string }) {
    Singleton.RBot.sendMessage(props.jid, { text: `✅ ${props.text}` });
  },
  sendMessageError(props: MessageProps & { text: string }) {
    Singleton.RBot.sendMessage(props.jid, { text: `❌ ${props.text}` });
  },
  sendMessageInfo(props: MessageProps & { text: string }) {
    Singleton.RBot.sendMessage(props.jid, { text: `ℹ ${props.text}` });
  },
};

export type MessageHelper = typeof messageHelper;
