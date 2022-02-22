import { Singleton } from ".";

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
  sendTemp(jid: string, tempKey: keyof typeof templateMessage) {
    Singleton.RBot.sendMessage(jid, { text: templateMessage[tempKey] });
  },
};

const templateMessage = {
  noauth: "❌ You dont have authorization to perform this action",
};

export type MessageHelper = typeof messageHelper;
