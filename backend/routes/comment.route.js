import { Router } from "express";
import { authenticateToken } from "../middleware/jwtverify.js";
import upload from '../middleware/multer.js'
import { createComment, deleteComment, editComment, getCommentsForBlogPost } from "../controller/comment.controller.js";

const router = Router();

// Route for creating a comment on a specific blog post
router.route("/addBlog/:blogPostId/comments").post(authenticateToken, createComment);

// Routes for editing a specific comment
router.route("/comments/:commentId").put(authenticateToken, editComment);

// Route to get all comments for a specific blog post
router.route("/blogs/:blogPostId/comments").get(getCommentsForBlogPost);

// Routes for delete a specific comment

router.route("/comments/:commentId").delete(authenticateToken, deleteComment);

// Export the router to be used in the main app
export default router;