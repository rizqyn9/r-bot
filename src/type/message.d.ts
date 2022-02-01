import {MessageType, WAGroupMetadata, WAMessage} from "@adiwajshing/baileys";

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
    type: MessageType
    prefix: Prefix | null
    isGroup: boolean
    mentioned: string[]
    content: string | null
    groupMetadata?: RGroupMetaData | null
    sender: {
        jid: string
        username: string
        isAdmin: boolean
    }
    quoted?: {
        message?: WAMessage
        sender?: string | null
    }
    WAMessage: WAMessage
    urls: string[] | string
}

export type RQuotedMessage = {

}

export interface RGroupMetaData extends WAGroupMetadata{
    admins? : string[]
}