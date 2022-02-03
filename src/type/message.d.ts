import { MessageType, WAGroupMetadata, WAMessage } from "@adiwajshing/baileys";
import { UserData } from "../models";

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
	text: string;
};

export interface IValidMessage extends IValidatedMsg, WAMessage {}

export type RMessage = WAMessage & {
	userData?: UserData | null;
	prefix?: Prefix | null;
};

export type RQuotedMessage = {};

export interface RGroupMetaData extends WAGroupMetadata {
	admins?: string[];
}
