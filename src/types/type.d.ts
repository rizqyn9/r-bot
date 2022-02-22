import { WAParticipantAction, WAContact } from "@adiwajshing/baileys";
import { IUserModel } from "./Mongo";

export interface IConfig {
  name: string;
  prefix: string[];
  admins: string[];
}

export interface IEvent {
  jid: string;
  participants: string[];
  actor?: string | undefined;
  action: WAParticipantAction;
}

export interface ICommand {
  command: string;
  description: string;
  usage: string;
  flags?: string[];
}

export interface IGroup {
  jid: string;
  events: boolean;
  nsfw: boolean;
  safe: boolean;
  mod: boolean;
}

export interface IUser {
  jid: string;
  ban: boolean;
  warnings: number;
}

export interface IUserInfo {
  user: WAContact;
  data: IUserModel;
}
