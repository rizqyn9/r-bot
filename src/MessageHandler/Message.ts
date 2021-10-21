import RBot from "../lib/RBot"
import {MessageType, WA, WAMessage} from "@adiwajshing/baileys";
import {IValidMessage, IValidatedMsg} from "../type/message";

export class Message {
    validTypes = [MessageType.text, MessageType.video, MessageType.image, MessageType.extendedText]

    constructor(rbot: RBot) {

    }

    log(data:any):void{
        console.log(data)
    }

    /**
     * @param msg
     *
     */
    validate(msg: WAMessage): IValidMessage | false {
        const M = msg.message?.ephemeralMessage || msg
        if (!M.message) return false
        if (!!msg.key.fromMe) return false
        if (msg.key.remoteJid?.endsWith('broadcast')) return false
        const type = Object.keys(M.message)[0]
        if (!this.validTypes.includes(type as MessageType)) return false
        const dataValid: IValidatedMsg = {
            prefix: "#",
            type: type as MessageType,
            targetChat : msg.key.remoteJid?.endsWith('g.us') ? 'group' : 'dm'
        }
        return Object.assign<WAMessage, IValidatedMsg>(msg, dataValid);
    }

    msgHandler(msg: IValidMessage){
        console.log(msg)
    }
}