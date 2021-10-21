import Redis from "ioredis"
import {enumCommand, Logger} from "../utils/logger";

export function InitRedis(): Redis.Redis {
    const client = new Redis();
    redisListener(client);
    return client;
}

function redisListener(redis: Redis.Redis) {
    redis.on("connect", () => {
        Logger.custom("Connected to Redis", "[REDIS]", 120)
    })
    redis.on("ready", () => {
        Logger.custom("Redis already to use", "[REDIS]", 120)
    })

}

export class RedisStore {
    public redisClient: Redis.Redis = new Redis();
    constructor() {
        Logger.redisDone("Init Redis", enumCommand.RDIS);
        this.redisListener();
    }

    redisListener() {
        this.redisClient.on("connect", () => {
            Logger.redisDone("Connected to Redis", enumCommand.RDIS)
        })
        this.redisClient.on("ready", () => {
            Logger.redisDone("Redis already to use", enumCommand.RDIS)
        })
    }
}


