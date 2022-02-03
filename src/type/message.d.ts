import { MessageType, WAGroupMetadata, WAMessage } from "@adiwajshing/baileys";
import { GroupData, UserData } from "../models";

export type ParseMsg = SimpleMsg & WAMessage;

export type SimpleMsg = {
	jid: string;
	prefix: Prefix | false;
	type: MessageType;
	isGroup: boolean;
	caption?: string | null;
};

export type Prefix = {
	prefix: string | false;
	cmd1: string;
	cmd2?: string;
};

export interface IValidMessage extends IValidatedMsg, WAMessage {}

export type RMessage = WAMessage & {
	userData?: UserData | null;
	groupData?: GroupData | null;
	prefix?: Prefix | false;
	auth?: UserData | GroupData | null;
};

export type RQuotedMessage = {};

export interface RGroupMetaData extends WAGroupMetadata {
	admins?: string[];
}
