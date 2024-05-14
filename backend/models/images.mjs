import { Schema, model } from "mongoose";

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  folder: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export const Image = model("Image", imageSchema);
