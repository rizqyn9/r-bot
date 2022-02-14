import { RedisClient } from "~/libs";
import * as Mongo from "./mongo-store";
import { Logger } from "~/utils/logger";

export async function checkExistingKey(
  key: string,
  cb?: () => any
): Promise<boolean> {
  return await RedisClient.exists(key).then((val) => Boolean(val));
}

export async function setData(key: string, data: { [key: string]: any }) {
  return await RedisClient.json.set(key, "$", data).then((val) => {
    Logger.redisDone(`Collect data ${key} : ${val}`);
    RedisClient.expire(key, Number(process.env.REDIS_EXPIRES_SECONDS) || 1000);
    return val;
  });
}

export async function getData<T>(key: string) {
  return await RedisClient.json.get(key).then((value) => {
    Logger.redisDone(`Get data ${key} :\n${JSON.stringify(value)}`);
    return value;
  });
}

export async function flushAll() {
  await RedisClient.flushAll().then(() => {
    Logger.redisDone(`Flush all`);
  });
}
