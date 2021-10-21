import { Schema, model } from 'mongoose'
import { ISessionModel } from "../type"

const SessionSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: Object,
        required: false,
        unique: true
    }
})

export const Session = model<ISessionModel>('session', SessionSchema)
