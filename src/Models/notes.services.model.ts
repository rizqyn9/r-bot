import { model, Schema } from "mongoose";

const NotesSchema = new Schema<GroupNotes>({
  title: {
    type: String,
  },
  notes: {
    type: [Schema.Types.Mixed],
  },
});

export const NoteModels = model<GroupNotes>("notes", NotesSchema);
