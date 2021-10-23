import {RBot as Base} from "./1.Rbot";
import {Logger} from "../utils/logger";
import {InputRegister} from "../type";
import {GroupData, GroupModels, UserData} from "../Models";
import {WAMessage} from "@adiwajshing/baileys";

export class RBot extends Base{
    async register(data: GroupData, isGroup: boolean): Promise<void>{
        if(isGroup)
            GroupModels.create(
                data
                // groupName: data.name,
                // address: data.address
            ).then()
    }

    async checkAuth(key: string){
        await this.redisClient.checkExitsKey(key).then( async res => {
            if(res) {
                Logger.redisDone("Found cache")
                return await this.redisClient.getDataObj(key)
            } else {
                let dummy = {
                    dummy : "okay"
                }
                await this.redisClient.setDataObj(key, dummy).then(val=> {
                    if(val) Logger.redisDone("Success new cache")
                })
            }
        })
    }
}

