import Chalk from 'chalk'

export enum enumCommand {
    DEV = "[DEV]",
    BOT = "[RBOT]",
    ERR = "[ERR]",
    WARN = "[WARN]",
    SPAM = "[SPAM]",
    GROUP = "[GROUP]",
    PRCS = "[PRCS]",
    DONE = "[DONE]",
    EMPTY = "",
    CSTM="[CSTM]",
    RDIS="[REDIS]",
    MNGO="[MONGODB]",
    REG= "[REG]"
}

interface IMessageLogger {
    cmd? : enumCommand | string | null,
    msg? : any,
    color? : string
}

/**
 * For documentation ansi256 color index
 * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
 */

export const Logger = {
    // Default Config Logger
    error : ( msg:any ,cmd :  string = enumCommand.ERR, color= 196) => {
        return PrintLogger(color, cmd, msg)
    },
    warn : ( msg:any ,cmd :  string = enumCommand.WARN, color= 208) => {
        return PrintLogger(color, cmd, msg)
    },
    dev : ( msg:any ,cmd :  string = enumCommand.DEV, color= 147) => {
        return PrintLogger(color, cmd, msg)
    },
    process : ( msg:any ,cmd :  string = enumCommand.PRCS, color= 117) => {
        return PrintLogger(color, cmd, msg)
    },
    done : ( msg:any ,cmd :  string = enumCommand.DONE, color= 118) => {
        return PrintLogger(color, cmd, msg)
    },
    bot : ( msg:any ,cmd :  string = enumCommand.BOT, color= 123) => {
        return PrintLogger(color, cmd, msg)
    },
    redisDone : (msg:any ,cmd :  string = enumCommand.RDIS, color: number = 200) => {
        return PrintLogger(color, cmd, msg)
    },
    custom : ( msg:any ,cmd :  string = enumCommand.CSTM, color= 201) => {
        return PrintLogger(color, cmd, msg)
    }
}


const PrintLogger = (color: number, cmd : string | undefined | null, msg : any) => {
    let print = cmd ? `${cmd}\t${msg}` : msg
    return console.log(Chalk.ansi256(color)(print))
}