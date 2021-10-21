import {MessageType, WAMessage} from "@adiwajshing/baileys";

export interface IValidatedMsg {
    prefix: "#" | "!" | string
    type: MessageType
    targetChat: "group" | "dm"
}

export interface IValidMessage extends IValidatedMsg , WAMessage { }