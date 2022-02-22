import type { WAMessage } from "@adiwajshing/baileys";
import * as Mongo from "./mongo-store";
import * as Redis from "./redis-store";

/**
 * * AUTHORIZATION *
 * Check Redis
 * (true) return data
 * (false) find in mongo store
 * 		(true) return the data and set to redis
 * 		(false) regist the data
 * 				(true) return the data and set to redis
 * 				(false) skipped this conversation
 */

const getAuth = {
  user: async (msg: WAMessage): Promise<UserProps | undefined> => {
    let user: UserProps | undefined;
    user?.authProps;
    let msgId = msg.key.remoteJid!;
    try {
      if (await Redis.checkExistingKey(msgId)) {
        user = (await Redis.getData(msgId)) as UserProps;
      } else {
        await Mongo.getData(msgId).then(async (result) => {
          if (result) {
            user = result as UserProps;

            await Redis.setData(msgId, result);
          } else {
            await Mongo.registUser
              .guest({
                jid: msg.key.remoteJid!,
                pushName: msg.pushName || "User Not Set",
                authProps: { role: "GUEST" },
              })
              .then((val) => {
                if (val) {
                  user = val;
                  Redis.setData(msg.key.remoteJid!, val!);
                }
              });
          }
        });
      }
      return user;
    } catch (error) {
      console.log("User :", error);
      throw new Error("Failed to get authorization user");
    }
  },
  group: async (msg: WAMessage): Promise<GroupProps | undefined> => {
    let group: GroupProps | undefined;
    let msgId = msg.key.remoteJid!;
    try {
      if (await Redis.checkExistingKey(msgId)) {
        group = (await Redis.getData(msgId)) as GroupProps;
      } else {
        await Mongo.getData(msgId, true).then(async (result) => {
          if (result) {
            group = result as GroupProps;

            await Redis.setData(msgId, result);
          } else {
            await Mongo.registGroup
              .guest({
                jid: msg.key.remoteJid!,
                pushName: "guest",
                authProps: {
                  role: "GUEST",
                },
              })
              .then((val) => {
                if (val) {
                  group = val;
                  Redis.setData(msg.key.remoteJid!, val!);
                }
              });
          }
        });
      }
      return group;
    } catch (error) {
      console.log("Group :", error);
      throw new Error("Failed to get authorization group");
    }
  },
};

function isAllowed(auth: AuthRoleType, listAuth: AuthRoleType | Array<AuthRoleType>): boolean {
  if (Array.isArray(listAuth)) return Boolean(listAuth.indexOf(auth) >= 0);
  else return listAuth == auth;
}

function isExcepted(auth: AuthRoleType, listExcept: AuthRoleType | Array<AuthRoleType>): boolean {
  return !isAllowed(auth, listExcept);
}

const Authorization: AuthorizationHelper = {
  getAuth,
  isAllowed,
  isExcepted,
};

export type AuthorizationHelper = {
  getAuth: typeof getAuth;
  isAllowed: (auth: AuthRoleType, listAuth: AuthRoleType | Array<AuthRoleType>) => boolean;
  isExcepted: (auth: AuthRoleType, listAuth: AuthRoleType | Array<AuthRoleType>) => boolean;
};

export { Authorization };
