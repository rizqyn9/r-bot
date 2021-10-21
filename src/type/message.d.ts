import {MessageType, WAMessage} from "@adiwajshing/baileys";

export interface IValidatedMsg {
    prefix: "#" | "!" | string
    type: MessageType
    isGroup: boolean
}

export interface IValidMessage extends IValidatedMsg , WAMessage { }