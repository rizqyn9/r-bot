import { Schema, model, Document } from "mongoose";
import { RegistDetails } from "../types";

export type UserData = {
  jid: string;
  isBanned: boolean;
  isRegistered: boolean;
  dataRegist: RegistDetails | false;
  pushName: string;
};

const UserSchema = new Schema({
  jid: {
    type: String,
    required: true,
    unique: true,
  },
  isBanned: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRegistered: {
    type: Boolean,
    required: true,
    default: false,
  },
  dataRegist: {
    type: Object || Boolean,
    default: false,
  },
  pushName: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const UserModels = model<UserData>("users", UserSchema);
