import { config } from "dotenv";
config();
import { MongoConnect, RedisClient } from "./src/lib";
import { StartRBot } from "./src/Core";
import { FigletChalkStarter, Logger } from "./src/utils/logger";

async function Start() {
	try {
		FigletChalkStarter("RBOT");

		await MongoConnect(String(process.env.MONGO_URI));

		StartRBot();
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
