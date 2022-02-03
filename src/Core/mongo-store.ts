import { UserData, UserModels } from "../Models";
import { Logger } from "../utils/logger";

export async function getData(jid: string): Promise<null | object> {
	return await UserModels.findOne({ jid }).then((data) => data);
}

export const registUser = {
	guest: async (data: Partial<UserData>): Promise<UserData | null> => {
		return await UserModels.create({ ...data, isRegistered: false }).then(
			(result) => {
				if (result) {
					Logger.custom(`Success created guest user ${result}`, "[MONGO]", 183);
					return result;
				} else {
					handleError("Fail created new guest user", data);
					return null;
				}
			},
		);
	},
	auth: async (data: Partial<UserData>): Promise<UserData | null> => {
		return await UserModels.create({ ...data, isRegistered: true }).then(
			(result) => {
				if (result) {
					Logger.custom(`Success created auth user ${result}`, "[MONGO]", 183);
					return result;
				} else {
					handleError("Fail created new auth user", data);
					return null;
				}
			},
		);
	},
};

const handleError = (msg: any, err?: any) => {
	Logger.error(`Msg: ${msg} || Err: ${err}`, "[MONGO]");
};
