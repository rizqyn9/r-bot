import { Schema, model } from "mongoose";

const UserSchema = new Schema<UserProps>({
  jid: {
    type: String,
    required: true,
    unique: true,
  },
  pushName: {
    type: String,
    required: true,
  },
  region: {
    type: String,
  },
  authProps: {
    type: Object,
  },
  customCommands: {
    type: Object,
    default: undefined,
  },
});

export const UserModels = model<UserProps>("users", UserSchema);
