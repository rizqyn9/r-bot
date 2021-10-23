import {WAConnection} from "@adiwajshing/baileys"
import {existsSync, writeFileSync} from "fs-extra"
import {join} from "path";
import {IConfig, RMessage} from "../type";
import {GroupModels, UserModels, SessionModels, SessionParse} from "../Models"
import {RedisStore} from "../lib/Redis";

const browser: [string, string, string] = ["R-Bot", "Well", "Indeed"];

export class RBot extends WAConnection {

    browserDescription = browser

    public config: IConfig = {
        admins: this.getModerator(),
        name: String(process.env.BOT_NAME) || "R-BOT",
        prefix: ["#", "!"]
    }

    public redisClient: RedisStore ;
    constructor() {
        super();
        this.redisClient = new RedisStore();
        this.emit("config", this.config);
        // this.on("chat-update", this)
    }

    emitMessage = async (M:Promise<RMessage>): Promise<void> => void this.emit("rbot-new-message", await M)

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