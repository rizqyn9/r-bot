import type { WASocket } from "@adiwajshing/baileys";
import { MessageHelper } from "../core/message-helper";

export type RBotSocket = WASocket & { messageHelper: MessageHelper };
