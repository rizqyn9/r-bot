import {RBot as Base} from "./1.Rbot";

export class RBot extends Base{

    async checkAuth(key: string){
        await this.RedisClient.checkExitsKey(key).then( async res => {
            if(res) {
                return await this.RedisClient.getDataObj(key)
            } else {
                let dummy = {
                    dummy : "okay"
                }
                await this.RedisClient.setDataObj(key, dummy)
            }
        })
    }
}