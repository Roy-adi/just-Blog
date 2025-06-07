
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost", 
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    username: { 
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      minlength: [1, "Comment cannot be empty."], 
      maxlength: [1000, "Comment cannot exceed 1000 characters."],
    },
  },
  {
    timestamps: true, 
    collection: "comments", 
  }
);

export const Comment = mongoose.model("Comment", commentSchema);