import type { WASocket } from "@adiwajshing/baileys";
import { MessageHelper } from "~/core/message-helper";
import { EnvProps } from "../../types";

export type RBotSocket = WASocket & {
  messageHelper: MessageHelper;
  ENV: EnvProps;
};

export * from "./client";
export * from "./message";
export * from "./type";
export * from "./user";
export * from "./auth";
export * from "./models";
export * from "../../types";
