import { model, Schema } from "mongoose";

const GroupSchema = new Schema<GroupProps>({
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
  participants: {
    type: [String],
  },
  authProps: {
    type: Object,
  },
  customCommands: {
    type: Object,
    default: undefined,
  },
});

export const GroupModels = model<GroupProps>("groups", GroupSchema);
