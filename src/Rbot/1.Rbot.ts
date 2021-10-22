import {WAConnection} from "@adiwajshing/baileys"
import {existsSync, writeFileSync} from "fs-extra"
import {join} from "path";
import {IConfig} from "../type";
import {GroupModels, UserModels, SessionModels, SessionParse} from "../Models"
import {RedisStore} from "../lib/Redis";

const browser: [string, string, string] = ["R-Bot", "Well", "Indeed"];

export class RBot extends WAConnection {

    browserDescription = browser

    private config: Partial<IConfig> = {
        admins: this.getModerator(),
        name: String(process.env.BOT_NAME) || "R-BOT",
        prefix: String(process.env.PREFIX) || "#"
    }
    constructor(
        public RedisClient: RedisStore
    ) {
        super();
        this.emit("config", this.config);
    }

    getModerator(): string[] {
        if (!process.env.ADMINS) return []
        if (process.env.ADMINS.includes(','))
            return process.env.ADMINS.replace(/\+/g, '')
                .split(',')
                .map((num) => `${num}@s.whatsapp.net`)
        return [`${process.env.ADMINS}@s.whatsapp.net`]
    }

    async getSession(id: string): Promise<SessionParse | false>{
        if(existsSync(`./sessions/${id}.session.json`)) return require(join(__dirname, '..', '..', `./sessions/${id}.session.json`))
        const session = await SessionModels.findOne({id})
        if(!session) return false;
        return session.session;
    }

    writeFileSession(): void {
        writeFileSync(
            `./sessions/${process.env.SESSION_ID}.session.json`,
            JSON.stringify(this.base64EncodedAuthInfo(), null, '\t')
        )
    }

    async updateSession(id: string){

    }
}