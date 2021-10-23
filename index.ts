import {config} from "dotenv";
config();
import {RBot} from "./src/Rbot";
import {enumCommand, FigletChalkStarter, Logger} from "./src/utils/logger"
import {MongoConnect} from "./src/lib/MongoConnect";
import * as Schema from "./src/Models";
import {Message} from "./src/MessageHandler";
import {RedisStore} from "./src/lib/Redis";

async function Start(){
    try {
        FigletChalkStarter("RBOT");

        await MongoConnect(String(process.env.MONGO_URI))

        // const redisClient = InitRedis();
        // const redisClient = new RedisStore()

        const rbot = new RBot();
        rbot.logger.level = "warn";

        // Find existing session
        const existSession = await rbot.getSession(process.env.SESSION_ID || "R-Bot");
        if(existSession) rbot.loadAuthInfo(existSession);

        const msg = new Message(rbot);

        rbot.on("open", () => {
            rbot.updateSession(process.env.SESSION_ID || "R-Bot");
            rbot.writeFileSession();
        })

        rbot.on("chat-update", (update) => {
            if(!update.messages) return;
            const {messages} = update;
            const all = messages.all();

            try{
                console.log(all)
                console.log(
                    rbot.parseMassage(all[0])

                )
                // rbot.checkAuth(all[0])
                //
                // const validatedMesssage = msg.validate(all[0]);
                // if(!validatedMesssage) return;
                // msg.msgHandler(validatedMesssage)
            } catch (e) {
                Logger.error(e)
                // rbot.sendMessage(update)
            }
        })

        // Run our server
        await rbot.connect()

    }catch (e) {
        Logger.error(`Error ${e}`)
        process.exit();
    }
}

Start().then(()=>{
})

/**
 * Init DB (Mongo)
 * Init Redis
 * Init WA Client
 */

