import {RBot} from "../Rbot"
import {MessageType, WAMessage} from "@adiwajshing/baileys";
import {IValidMessage} from "../type";

export class Message {
    validTypes = [MessageType.text, MessageType.video, MessageType.image, MessageType.extendedText]

    constructor(
        public rbot: RBot
    ) {

    }

    async msgHandler(msg: IValidMessage){
        console.log(msg)
        await this.rbot.sendMessage(<string>msg.key.remoteJid, "hahah", MessageType.text)
        // if(msg.prefix == "#"){
        //
        // }
    }
}