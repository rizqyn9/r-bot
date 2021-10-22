import {RBot as Base} from "./1.Rbot";
import {Logger} from "../utils/logger";
import {InputRegister} from "../type";
import {UserData} from "../Models";

export class RBot extends Base{
    async register(data: InputRegister, isGroup: boolean): Promise<UserData<false>>{
        if(isGroup)
            this.GroupModel.create({
                groupName: data.name,
                address: data.address
            }).then()
    }

    async checkAuth(key: string){
        await this.RedisClient.checkExitsKey(key).then( async res => {
            if(res) {
                Logger.redisDone("Found cache")
                return await this.RedisClient.getDataObj(key)
            } else {
                let dummy = {
                    dummy : "okay"
                }
                await this.RedisClient.setDataObj(key, dummy).then(val=> {
                    if(val) Logger.redisDone("Success new cache")
                })
            }
        })
    }
}