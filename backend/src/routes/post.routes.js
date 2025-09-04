import express from "express";
import { body } from "express-validator";
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
} from "../controllers/post.controller.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/posts
router.get("/", listPosts);

// GET /api/posts/:id
router.get("/:id", getPost);

// POST /api/posts
router.post(
  "/",
  authRequired,
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  createPost
);

// PUT /api/posts/:id
router.put("/:id", authRequired, updatePost);

// DELETE /api/posts/:id
router.delete("/:id", authRequired, deletePost);

// PATCH /api/posts/:id/like
router.patch("/:id/like", authRequired, toggleLike);

export default router;
