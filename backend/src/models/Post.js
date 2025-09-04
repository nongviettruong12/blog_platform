import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // markdown
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
