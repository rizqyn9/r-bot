import {RBot as Base} from "./2.Rbot"
import {MessageType, WAMessage} from "@adiwajshing/baileys";
import {Prefix, RGroupMetaData, RMessage} from "../type";

// Massage Handler
export class RBot extends Base{

    supportedMediaMessage = [MessageType.image, MessageType.video, MessageType.extendedText]

    async messageParser(M: WAMessage): Promise<RMessage> {
        if(M.message?.ephemeralMessage) M.message = M.message.ephemeralMessage.message
        const jid = M.key.remoteJid || ""
        const isGroup = jid.endsWith('g.us')
        const type = (Object.keys(M.message || {})[0] || '') as MessageType
        const user = isGroup ? M.participant : jid;
        const info = this.getContact(user);
        const groupMetaData : RGroupMetaData | null =
            isGroup ? await this.groupMetadata(jid) : null
        if(groupMetaData)
            groupMetaData.admins = groupMetaData.participants.filter(user => user.isAdmin).map(user => user.jid);
        const sender = {
            jid : user,
            username : info.notify || info.vname || info.name || 'RBot anonymous',
            isAdmin : groupMetaData?.admins?.includes(user) || false
        }
        const content: string | null =
            type === MessageType.text && M.message?.conversation
                ? M.message.conversation
                : this.supportedMediaMessage.includes(type)
                ? this.supportedMediaMessage
                    .map((type) => M.message?.[type as MessageType.image | MessageType.video]?.caption)
                    .filter((caption) => caption)[0] || ''
                : type === MessageType.extendedText && M.message?.extendedTextMessage?.text
                    ? M.message?.extendedTextMessage.text
                    : null
        const quoted: RMessage['quoted'] = {}
        quoted.message = M?.message?.[type as MessageType.extendedText]?.contextInfo?.quotedMessage
            ? JSON.parse(JSON.stringify(M).replace('quotedM', 'm')).message?.[type as MessageType.extendedText].contextInfo
            : null
        quoted.sender = M.message?.[type as MessageType.extendedText]?.contextInfo?.participant || null

        return {
            type,
            isGroup,
            content,
            groupMetadata: groupMetaData,
            mentioned: this.getMentionedUsers(M, type),
            prefix: content ? this.getPrefix(content) : null,
            sender,
            quoted,
            WAMessage: M,
            urls: ''            //#TODO
        }
    }

    getContact(jid: string){
        return this.contacts[jid] || ""
    }

    getPrefix(txt: string): Prefix | null {
        try{
            let res: Partial<Prefix> = {}
            let pref: string = txt.trim()
            let allowed = this.config.prefix
            for (let i = 0; i < allowed.length; i++ ){
                if( pref.startsWith(allowed[i])) {
                    let split: Array<string> = pref.slice(1).split(/ +/, 10)
                    res.prefix = String(allowed[i])
                    res.cmd1 = split[0].toLowerCase()
                    break;
                }
            }
            if(!res.prefix) throw new Error("No prefix found");
            if(!res.cmd1) throw new Error("No command found");

            return {
                prefix : res.prefix,
                cmd1: res.cmd1,
                cmd2: res.cmd2,
                text: txt
            };
        }
        catch (e) {
            // console.log(e);
            return null;
        }
    }

    getMentionedUsers = (M: WAMessage, type: string): string[] => {
        const notEmpty = <TValue>(value: TValue | null | undefined): value is TValue =>
            value !== null && value !== undefined
        const array = M?.message?.[type as MessageType.extendedText]?.contextInfo?.mentionedJid
            ? M?.message[type as MessageType.extendedText]?.contextInfo?.mentionedJid
            : []
        return (array || []).filter(notEmpty)
    }
}