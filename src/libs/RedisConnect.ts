import { createClient, RedisModules } from "redis";
import { Logger } from "../utils/logger";

export const RedisClient = createClient();

RedisClient.on("connect", () => {
	Logger.custom("Connected to Redis", "[REDIS]", 120);
});

RedisClient.on("ready", () => {
	Logger.custom("Redis already to use", "[REDIS]", 120);
});

RedisClient.on("ready", (e) => {
	Logger.error(`Redis error ${e}`, "[REDIS]", 120);
});
