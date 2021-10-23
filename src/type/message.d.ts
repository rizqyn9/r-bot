import {MessageType, WAMessage} from "@adiwajshing/baileys";

export type ParseMsg = SimpleMsg & WAMessage

export type SimpleMsg = {
    jid: string
    prefix: Prefix | false
    type: MessageType
    isGroup: boolean
    caption?: string | null
}

export type Prefix = {
    prefix: string | false
    cmd1 : string
    cmd2? : string
    text : string
}

export interface IValidMessage extends IValidatedMsg , WAMessage { }

export type RMessage = {

}