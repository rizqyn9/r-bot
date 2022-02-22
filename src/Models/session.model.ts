import { Schema, model } from "mongoose";

export interface SessionParse {
  clientID: string;
  serverToken: string;
  clientToken: string;
  encKey: string;
  macKey: string;
}

export type SessionData = {
  ID: string;
  session: SessionParse;
};

const SessionSchema = new Schema({
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  session: {
    type: Object,
    required: false,
    unique: true,
  },
});

export const SessionModels = model<SessionData>("session", SessionSchema);
