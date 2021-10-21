import { Schema, model } from 'mongoose'
import { IUserModel } from '../type'

const UserSchema = new Schema({
    jid: {
        type: String,
        required: true,
        unique: true
    },
    ban: {
        type: Boolean,
        required: true,
        default: false
    },
    warnings: {
        type: Number,
        required: true,
        default: 0
    }
})
export const User = model<IUserModel>('users', UserSchema)
