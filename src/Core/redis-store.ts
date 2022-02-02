import { RedisClient } from "../lib";
import { enumCommand, Logger } from "../utils/logger";

export async function checkExistingKey(
	key: string,
	cb?: () => any,
): Promise<boolean> {
	return await RedisClient.exists(key).then((val) => Boolean(val));
}

export async function setData(
	key: string,
	data: { [key: string]: any },
): Promise<boolean> {
	Logger.redisDone(`Collect data ${key}`);
	return await RedisClient.hmset(key, data).then((val) => Boolean(val));
}
