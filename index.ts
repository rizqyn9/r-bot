import process from "process";
import { config } from "dotenv";
config();
import { MongoConnect, RedisClient } from "./src/libs";
import { StartRBot } from "./src/core";
import { FigletChalkStarter, Logger } from "./src/utils/logger";
import { cleanEnv, email, makeValidator, num, str } from "envalid";

const ownerNumber = makeValidator((num) => {
  if (num.split(" ").length > 0) return [...num.split(" ")];
  else throw new Error("Owner ");
});

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
  MONGO_URI: str(),
  EMAIL: email(),
  SESSION_ID: str(),
  REDIS_EXPIRES_SECONDS: num(),
  OWNER_NUMBER: ownerNumber(),
});

async function Start() {
  try {
    FigletChalkStarter("RBOT");

    await RedisClient.connect();
    await MongoConnect(env.MONGO_URI);

    StartRBot({ env });
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
