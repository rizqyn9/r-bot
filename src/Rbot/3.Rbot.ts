import {RBot as Base} from "./2.Rbot"
import {MessageType, proto, WAMessage} from "@adiwajshing/baileys";
import {ParseMsg, Prefix, SimpleMsg} from "../type";
import IMessage = proto.IMessage;
import {config} from "dotenv";

// Massage Handler
export class RBot extends Base{

    parseMassage(msg: WAMessage): ParseMsg | false {
        if(!msg.message) return false;
        if(msg.key.fromMe) return false;
        if(msg.key.remoteJid?.endsWith('broadcast')) return false;

        let type: MessageType = Object.keys(msg.message)[0] as MessageType;

        let caption = this.getCaption(msg.message, type)
        let prefix = caption ? this.getPrefix(caption) : false

        const res:SimpleMsg = {
            jid: "a",
            prefix,
            type,
            isGroup: Boolean(msg.key.remoteJid?.endsWith('g.us')),
            caption
        };

        return Object.assign(msg, res);
    }

    getPrefix(txt: string): Prefix | false {
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
            console.log(e);
            return false;
        }
    }

    getCaption(msg: IMessage, type:MessageType): string | null | undefined {
        switch (type) {
            case MessageType.text:
                return msg.conversation
            case MessageType.image:
                return msg.imageMessage?.caption
            case MessageType.extendedText:
                return msg.extendedTextMessage?.text
            case MessageType.video:
                return msg.videoMessage?.caption
        }
        return null
    }
}