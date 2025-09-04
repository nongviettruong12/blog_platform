import { validationResult } from "express-validator";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Lấy danh sách comment theo post
export const listComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .populate("author", "username")
    .sort({ createdAt: -1 });

  res.json({ comments });
};

// Tạo comment mới
export const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { content } = req.body;
  const { postId } = req.params;

  // Kiểm tra post tồn tại
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    post: postId,
    author: req.user.id,
    content,
  });

  res.status(201).json({ comment });
};

// Cập nhật comment
export const updateComment = async (req, res) => {
  const { id } = req.params; // comment id
  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  if (comment.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (req.body.content) comment.content = req.body.content;
  await comment.save();

  res.json({ comment });
};

// Xóa comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  if (comment.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  await comment.deleteOne();
  res.json({ message: "Deleted" });
};
