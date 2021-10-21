import {RBot} from "../Rbot"
import {MessageType, WAMessage} from "@adiwajshing/baileys";
import {IValidatedMsg, IValidMessage} from "../type";

export class Message {
    validTypes = [MessageType.text, MessageType.video, MessageType.image, MessageType.extendedText]

    constructor(
        public rbot: RBot
    ) {

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
            isGroup : Boolean(msg.key.remoteJid?.endsWith('g.us'))
        }
        return Object.assign<WAMessage, IValidatedMsg>(msg, dataValid);
    }



    async msgHandler(msg: IValidMessage){
        console.log(msg)
        await this.rbot.sendMessage(<string>msg.key.remoteJid, "hahah", MessageType.text)
        if(msg.prefix == "#"){

        }
    }
}