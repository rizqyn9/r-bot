import { MessageType, WAGroupMetadata, WAMessage } from "@adiwajshing/baileys";
import { GroupData, UserData } from "../models";

export type Prefix = {
  prefix: string | false;
  cmd1: string;
  cmd2?: string;
  text?: string;
  any: any;
};

export type RMessage = WAMessage & {
  jid: string;
  auth: AuthRoleType;
  isGroup: boolean;
  userData?: UserData;
  groupData?: GroupData;
  prefix?: Prefix | false;
};

// Response Message Template
export type Lang = "id" | "en";
export type StructMessage = { [key in Lang]?: any };
export type StructMessages = { [key: string]: StructMessage };
