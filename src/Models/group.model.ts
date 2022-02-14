import { model, Schema } from "mongoose";
import { RegistDetails } from "../types";

export type GroupData = {
  jid: string;
  address: string;
  groupName: string;
  isBanned: boolean;
  isRegistered: boolean;
  groupMember: string[];
  dataRegist: RegistDetails | false;
};

const GroupSchema = new Schema({
  jid: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  groupName: {
    type: String,
    required: true,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  isRegistered: {
    type: Boolean,
    default: false,
  },
  groupMember: {
    type: Array,
  },
  dataRegist: {
    type: Object || Boolean,
    default: false,
  },
});

export const GroupModels = model<GroupData>("groups", GroupSchema);
