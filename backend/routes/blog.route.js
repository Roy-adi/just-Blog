import { Router } from "express";
import { createBlogPost, deleteBlogPost, editBlogPost, getAllBlogPosts, getBlogPost, getBlogsByCategory } from "../controller/blogController.js";
import { authenticateToken } from "../middleware/jwtverify.js";
import upload from '../middleware/multer.js'


const router = Router();

// Route to create a new blog post (requires authentication)

router.post('/createblog', authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }]), createBlogPost);

// Route to edit a blog post by ID (requires authentication and author's ownership)
router.put("/editblog/:id", authenticateToken, upload.fields([{ name: 'image', maxCount: 1 }]), editBlogPost );

// Route to delete a blog post by ID (requires authentication and author's ownership)
router.route("/deleteblog/:id").delete(authenticateToken, deleteBlogPost);

// Optional: Route to get a single blog post by ID
router.route("/blog/:id").get(getBlogPost);

// Optional: Route to get all blog posts
router.route("/blogs").get(getAllBlogPosts);

// Route to get blog posts by category
router.post("/blogs/category", getBlogsByCategory);

export default router;