import express from "express";
import { body } from "express-validator";
import {
  listComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

// GET /api/posts/:postId/comments
router.get("/posts/:postId/comments", listComments);

// POST /api/posts/:postId/comments
router.post(
  "/posts/:postId/comments",
  authRequired,
  body("content").notEmpty().withMessage("Content is required"),
  createComment
);

// PUT /api/comments/:id
router.put("/comments/:id", authRequired, updateComment);

// DELETE /api/comments/:id
router.delete("/comments/:id", authRequired, deleteComment);

export default router;
