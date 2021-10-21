import mongoose, {mongo} from "mongoose"
import {Logger} from "../utils/logger";

export async function MongoConnect(URI: string): Promise<any> {
    return new Promise(((resolve, reject) => {
        mongoose.connect(encodeURI(URI)).then(()=>{
            Logger.custom("Success Connected to Database", "[MONGO]");
            resolve("Okay")
        }).catch(()=>{
            Logger.error("Cannot found ", "[MONGO]");
            throw new Error("Cannot found mongoDB");
        })
    }))

}

mongoose.connection.on("error", () => {
    Logger.error("Disconnect from Mongo", "[MONGO]");
})
mongoose.connection.on("disconnected", () => {
    Logger.error("Disconnect from Mongo", "[MONGO]");
})