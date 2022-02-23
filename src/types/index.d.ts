export * from "./client";
export * from "./message";
export * from "./type";
export * from "./user";
export * from "./auth";
export * from "./models";
export * from "../../types";

import type { WASocket } from "@adiwajshing/baileys";
import { AuthorizationProps } from "~/core/authorization";
import { MessageHelper } from "../core/message-helper";
import { AuthorizationHelper } from "../core/authorization";
import { LoggerHelper } from "../utils/logger";
import { ConfigProps } from "../config";

export type RBotSocket = WASocket & {
  messageHelper: MessageHelper;
  ENV: EnvProps;
  authorization: AuthorizationHelper;
  logger: LoggerHelper;
  config: ConfigProps;
};
