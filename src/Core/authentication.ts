import { UserModels } from "../Models";
export async function validateToken(jid: string) {
	try {
		return UserModels.find({ jid }).then((data) => data);
	} catch (error) {}
}
