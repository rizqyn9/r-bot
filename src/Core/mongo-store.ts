import { UserData, UserModels } from "../Models";
import { Logger } from "../utils/logger";

export async function getData(jid: string): Promise<null | object> {
	return await UserModels.findOne({ jid }).then((data) => {
		return data;
	});
}

export const registUser = {
	guest: async (data: Partial<UserData>): Promise<UserData | null> => {
		return await UserModels.create({ ...data, isRegistered: false }).then(
			(data) => {
				if (data) {
					Logger.custom(`Success created guest user ${data}`, "[MONGO]", 183);
				}
				return data;
			},
		);
	},
};
