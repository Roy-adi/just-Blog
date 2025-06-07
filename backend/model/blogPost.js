import mongoose from "mongoose";

const blogPostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    blogImg: {
      type: String,
      default: null,
    },
     blogImgPublicId: {
      // This field is used to store the public ID of the image in cloud storage (e.g., Cloudinary)
      type: String,
      default: null,
    },
    description: {
      type: String,
    },
    authorid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    authorname: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "blogPosts", // Specify the collection name
  }
);

export const BlogPost = mongoose.model("BlogPost", blogPostsSchema);
