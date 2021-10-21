import {config} from "dotenv";
config();
import RBot from "./src/lib/RBot";
import {enumCommand, Logger} from "./src/utils/logger"
import {MongoConnect} from "./src/lib/MongoConnect";
import * as Schema from "./src/Models"

async function Start(){
    try {
        await MongoConnect(String(process.env.MONGO_URI))

        const rbot = new RBot(Schema.Group, Schema.User, Schema.Session);
        rbot.logger.level = "warn";

        // Find existing session
        const existSession = await rbot.getSession(process.env.SESSION_ID || "R-Bot");
        if(existSession) rbot.loadAuthInfo(existSession);

        rbot.on("open", () => {
            rbot.updateSession(process.env.SESSION_ID || "R-Bot");
            rbot.writeFileSession();
        })

        await rbot.connect()

    }catch (e) {
        Logger.error(`Error ${e}`)
        // process.abort();
    }
}

Start().then(()=>{
    Logger.bot("Ready for use");
}).catch(e => {
    console.log(e)
});

/**
 * Init DB (Mongo)
 * Init Redis
 * Init WA Client
 */

