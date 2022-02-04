import process from "process";
import { config } from "dotenv";
config();
import { MongoConnect, RedisClient } from "./src/lib";
import { StartRBot } from "./src/Core";
import { FigletChalkStarter, Logger } from "./src/utils/logger";

async function Start() {
	try {
		FigletChalkStarter("RBOT");

		await RedisClient.connect();
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

process.on("exit", (code) => {
	console.log(`About to exit with code: ${code}`);
});
