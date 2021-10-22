import { Schema, model } from 'mongoose'
import {RegistDetails} from "../type";

export type UserData = {
    jid: string
    isBanned: boolean
    isRegistered: boolean
    dataRegist: RegistDetails | false
}

const UserSchema = new Schema({
    jid: {
        type: String,
        required: true,
        unique: true
    },
    isBanned: {
        type: Boolean,
        required: true,
        default: false
    },
    isRegistered: {
        type: Boolean,
        required: true,
        default: false
    },
    dataRegist:{
        type: Object || Boolean,
        default: false
    }
})
export const UserModels = model<UserData>('users', UserSchema)