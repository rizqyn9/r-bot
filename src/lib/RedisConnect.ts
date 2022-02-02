import Redis from "ioredis";
import { Logger } from "../utils/logger";

export const RedisClient: Redis.Redis = new Redis();

RedisClient.on("connect", () => {
	Logger.custom("Connected to Redis", "[REDIS]", 120);
});

RedisClient.on("ready", () => {
	Logger.custom("Redis already to use", "[REDIS]", 120);
});
