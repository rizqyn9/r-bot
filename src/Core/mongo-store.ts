import { GroupData, GroupModels, UserData, UserModels } from "~/models";
import { Logger } from "~/utils/logger";

export async function getData(
  jid: string,
  isGroup: boolean = false
): Promise<null | object> {
  if (isGroup) return await GroupModels.findOne({ jid }).then((data) => data);
  else return await UserModels.findOne({ jid }).then((data) => data);
}

export const group = {
  update: async (jid: string, data: Partial<GroupData>) => {
    return await GroupModels.findOneAndUpdate({ jid }, { ...data }).then(
      (result) => result
    );
  },
};

export const user = {
  update: async (jid: string, data: Partial<UserData>) => {
    return await UserModels.findOneAndUpdate({ jid }, { ...data }).then(
      (result) => result
    );
  },
};

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
      }
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
      }
    );
  },
};

export const registGroup = {
  guest: async (data: Partial<GroupData>): Promise<GroupData | null> => {
    return await GroupModels.create({ ...data, isRegistered: false }).then(
      (result) => {
        if (result) {
          Logger.custom(
            `Success created guest group ${result}`,
            "[MONGO]",
            183
          );
          return result;
        } else {
          handleError("Fail created new guest user", data);
          return null;
        }
      }
    );
  },
  auth: async (data: Partial<UserData>): Promise<GroupData | null> => {
    return await GroupModels.create({ ...data, isRegistered: true }).then(
      (result) => {
        if (result) {
          Logger.custom(`Success created auth group ${result}`, "[MONGO]", 183);
          return result;
        } else {
          handleError("Fail created new auth user", data);
          return null;
        }
      }
    );
  },
};

const handleError = (msg: any, err?: any) => {
  Logger.error(`Msg: ${msg} || Err: ${err}`, "[MONGO]");
};
