import { BlogPost } from "../model/blogPost.js";
import { Comment } from "../model/Comment.model.js";
import { User } from "../model/user.js";
import mongoose from "mongoose";

// @desc    Create a new comment on a blog post
// @route   POST /api/blogs/:blogPostId/comments
// @access  Private (Auth required)
export const createComment = async (req, res) => {
  try {
    const { blogPostId } = req.params; // Get blogPostId from URL params
    const { text } = req.body;
    const userId = req.user._id; // Get userId from authenticated token

    // 1. Validate blogPostId
    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).json({ message: "Invalid blog post ID." });
    }

    // 2. Check if blog post exists
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found." });
    }

    // 3. Get username of the commenter
    const user = await User.findById(userId);
    if (!user) {
      // This case should ideally not happen if authenticateToken works correctly
      return res.status(404).json({ message: "Commenting user not found." });
    }
    const username = user.username;

    // 4. Validate comment text
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Comment cannot be empty." });
    }
    if (text.length > 1000) {
        return res.status(400).json({ message: "Comment cannot exceed 1000 characters." });
    }


    const newComment = new Comment({
      blogPostId,
      userId,
      username,
      text: text.trim(), // Trim whitespace from comment
    });

    await newComment.save();
    res.status(201).json({ message: "Comment added successfully!", comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Server error. Could not add comment." });
  }
};


// @desc    Get all comments for a specific blog post
// @route   GET /api/blogs/:blogPostId/comments
// @access  Public
export const getCommentsForBlogPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
      return res.status(400).json({ message: "Invalid blog post ID." });
    }

    // Optional: Check if blog post exists (good practice but not strictly required for just fetching comments)
    // const blogPost = await BlogPost.findById(blogPostId);
    // if (!blogPost) {
    //   return res.status(404).json({ message: "Blog post not found." });
    // }

    const comments = await Comment.find({ blogPostId })
      .sort({ createdAt: 1 }); // Sort by oldest first or -1 for newest first

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error. Could not retrieve comments." });
  }
};


// @desc    Edit a specific comment by its author
// @route   PUT /api/comments/:commentId
// @access  Private (Auth required, Comment Author only)
export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id; // User ID from authenticated token

    // 1. Validate commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID." });
    }

    // 2. Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // 3. Authorization: Check if the current user is the author of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to edit this comment." });
    }

    // 4. Validate new comment text
    if (!text || text.trim().length === 0) {
        return res.status(400).json({ message: "Comment text cannot be empty." });
    }
    if (text.length > 1000) {
        return res.status(400).json({ message: "Comment cannot exceed 1000 characters." });
    }


    comment.text = text.trim(); // Update text and trim whitespace
    await comment.save();

    res.status(200).json({ message: "Comment updated successfully!", comment });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Server error. Could not update comment." });
  }
};

// @desc    Delete a specific comment by its author
// @route   DELETE /api/comments/:commentId
// @access  Private (Auth required, Comment Author only)
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id; // User ID from authenticated token

    // 1. Validate commentId
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID." });
    }

    // 2. Find the comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    // 3. Authorization: Check if the current user is the author of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not authorized to delete this comment." });
    }

    // 4. Delete the comment
    await Comment.deleteOne({ _id: commentId }); // Or findByIdAndDelete(commentId)
    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Server error. Could not delete comment." });
  }
};