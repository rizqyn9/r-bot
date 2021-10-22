import { WAParticipantAction, WAContact } from '@adiwajshing/baileys'
import { Document } from "mongoose"

export interface IConfig {
    name: string
    prefix: string
    admins: string[]
    cron: string | null
}

export interface IEvent {
    jid: string
    participants: string[]
    actor?: string | undefined
    action: WAParticipantAction
}

export interface ICommand {
    command: string
    description: string
    usage: string
    flags?: string[]
}

export interface IUserInfo {
    user: WAContact
    // data: IUserModel
}

export interface RegistDetails extends Document {
    date: Date
    isPremium: boolean
    nameRegist: string
    address: string
}
