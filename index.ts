import { config } from "dotenv";
import RBot from "./src/Rbot";
config();
// import {RBot} from "./src/Rbot";
import { enumCommand, FigletChalkStarter, Logger } from "./src/utils/logger";
import { MongoConnect } from "./src/lib/MongoConnect";
// import * as Schema from "./src/Models";
// import {Message} from "./src/MessageHandler";
import { RedisStore } from "./src/lib/Redis";
// import {RMessage} from "./src/type";

async function Start() {
	try {
		FigletChalkStarter("RBOT");

		await MongoConnect(String(process.env.MONGO_URI));

		new RedisStore();

		RBot();
	} catch (e) {
		Logger.error(`Error ${e}`);
		process.exit();
	}
}

Start().then(() => {});

// /**
//  * Init DB (Mongo)
//  * Init Redis
//  * Init WA Client
//  */
