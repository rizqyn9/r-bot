import Chalk from "chalk";

const allowedCommand = {
  DEV: "[DEV]",
  BOT: "[RBOT]",
  ERR: "[ERR]",
  WARN: "[WARN]",
  SPAM: "[SPAM]",
  GROUP: "[GROUP]",
  PRCS: "[PRCS]",
  DONE: "[DONE]",
  EMPTY: "",
  CSTM: "[CSTM]",
  RDIS: "[REDIS]",
  MNGO: "[MONGODB]",
  REG: "[REG]",
};

/**
 * For documentation ansi256 color index
 * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 */

type AllowedCommand = keyof typeof allowedCommand;

const Logger = {
  // Default Config Logger
  error: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["ERR"],
    color = 196
  ) => printLogger(color, cmd, msg),
  warn: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["WARN"],
    color = 208
  ) => printLogger(color, cmd, msg),
  dev: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["DEV"],
    color = 147
  ) => printLogger(color, cmd, msg),
  process: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["PRCS"],
    color = 117
  ) => printLogger(color, cmd, msg),
  done: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["DONE"],
    color = 118
  ) => printLogger(color, cmd, msg),
  bot: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["BOT"],
    color = 123
  ) => printLogger(color, cmd, msg),
  redisDone: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["RDIS"],
    color: number = 200
  ) => printLogger(color, cmd, msg),
  custom: (
    msg: any,
    cmd: AllowedCommand | string = allowedCommand["CSTM"],
    color = 201
  ) => printLogger(color, cmd, msg),
};

const printLogger = (color: number, cmd: string | undefined, msg: any) => {
  let print = cmd ? `${cmd}\t${msg}` : msg;
  return console.log(Chalk.ansi256(color)(print));
};

type LoggerHelper = typeof Logger;

export type { LoggerHelper, AllowedCommand };

export { Logger };
