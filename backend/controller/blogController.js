import mongoose from "mongoose";
import { User } from "../model/user.js";
import { BlogPost } from "../model/blogPost.js";
import { v2 as cloudinary } from "cloudinary";

// Controller to create a new blog post
export const createBlogPost = async (req, res) => {
  try {
    const { title, description,category } = req.body;
    const author_id = req.user._id;

    const user = await User.findById(author_id);
    if (!user) {
      return res.status(404).json({ message: "Author not found." });
    }
    const authorname = user.username;


    let blogImg = null;
    let blogImgPublicId = null; // Initialize publicId

    if (req.files && req.files.image && req.files.image.length > 0) {
      const imageFile = req.files.image[0];
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      blogImg = imgUpload.secure_url;
      blogImgPublicId = imgUpload.public_id; // Store the public_id
    }

    const newBlogPost = new BlogPost({
      title,
      description,
      category,
      authorid: author_id,
      authorname,
      blogImg,
      blogImgPublicId, // Save the public_id
    });

    await newBlogPost.save();
    res
      .status(201)
      .json({ message: "Blog post created successfully!", blog: newBlogPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not create blog post." });
  }
};

// Controller to get blogs by category
export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    // Define match condition
    let matchStage = {};
    if (category && category.trim().toLowerCase() !== "all" && category.trim() !== "") {
      matchStage.category = category;
    }

    const blogs = await BlogPost.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "users", // MongoDB collection name (check if it's plural lowercase)
          localField: "authorid",
          foreignField: "_id",
          as: "authorDetails"
        }
      },
      {
        $unwind: {
          path: "$authorDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          title: 1,
          blogImg: 1,
          blogImgPublicId: 1,
          description: 1,
          category: 1,
          authorid: 1,
          authorname: 1,
          createdAt: 1,
          updatedAt: 1,
          authorDetails: {
            _id: 1,
            name: 1,
            username: 1,
            imageUrl: 1,
            email: 1,
            gender: 1,
          }
        }
      },
      { $sort: { createdAt: -1 }}
    ]);


    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });

  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
};

// Controller to edit a blog post
export const editBlogPost = async (req, res) => {
  console.log(req.files.image, req.body, 'edit blog');
  try {
    const { id } = req.params;
     const { title, description,category } = req.body;
    const current_user_id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog post ID." });
    }

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    if (blogPost.authorid.toString() !== current_user_id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this blog post." });
    }

    let blogImg = blogPost.blogImg;
    let blogImgPublicId = blogPost.blogImgPublicId; // Get existing public_id

    console.log(blogImg, blogImgPublicId, title, 'edit blog post details1');

    // Handle image upload if a new image is provided
    if (req.files && req.files.image && req.files.image.length > 0) {
      const imageFile = req.files.image[0];

      // If an old image exists, delete it from Cloudinary
      if (blogImgPublicId) {
        await cloudinary.uploader.destroy(blogImgPublicId, (error, result) => {
          if (error) {
            console.error("Error deleting old image from Cloudinary:", error);
            // Decide how to handle this. You might still want to proceed with new upload.
          } else {
            console.log("Old image deleted from Cloudinary:", result);
          }
        });
      }

      // Upload the new image
      const imgUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      blogImg = imgUpload.secure_url;
      blogImgPublicId = imgUpload.public_id; // Store the new public_id
    } else if (req.body.removeImage === "true") {
      // Allow users to explicitly remove the image without uploading a new one
      if (blogImgPublicId) {
        await cloudinary.uploader.destroy(blogImgPublicId, (error, result) => {
          if (error) {
            console.error("Error deleting image from Cloudinary:", error);
          } else {
            console.log("Image removed from Cloudinary:", result);
          }
        });
      }
      blogImg = null;
      blogImgPublicId = null;
    }

    console.log(blogImg, blogImgPublicId, title, 'edit blog post details2');

    blogPost.title = title || blogPost.title;
    blogPost.category = category || blogPost.category;
    blogPost.description = description || blogPost.description;
    blogPost.blogImg = blogImg;
    blogPost.blogImgPublicId = blogImgPublicId; // Update with new or null public_id

    await blogPost.save();
    res
      .status(200)
      .json({ message: "Blog post updated successfully!", blog: blogPost });
  } catch (error) {
    console.error("Error editing blog post:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not update blog post." });
  }
};

// Controller to delete a blog post
export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params; // Blog post ID from URL
    const current_user_id = req.user._id; // Get current user's ID from authenticated token

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog post ID." });
    }

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    // Check if the current user is the author of the blog post
    if (blogPost.authorid.toString() !== current_user_id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog post." });
    }

    await BlogPost.deleteOne({ _id: id }); // Use deleteOne or findByIdAndDelete
    res.status(200).json({ message: "Blog post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not delete blog post." });
  }
};

//  Controller to get a single blog post
export const getBlogPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid blog post ID." });
    }

    const blogPost = await BlogPost.findById(id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    res.status(200).json(blogPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve blog post." });
  }
};

//  Controller to get all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(blogPosts);
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
    res
      .status(500)
      .json({ message: "Server error. Could not retrieve blog posts." });
  }
};
