import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    authorAvatar: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    tags: [{
      type: String,
      trim: true,
    }]
  },
  {
    timestamps: true,
  }
);

export const Update = mongoose.model("Update", updateSchema);
