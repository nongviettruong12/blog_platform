import { validationResult } from "express-validator";
import Post from "../models/Post.js";

export const listPosts = async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);
  const q = req.query.q?.trim();
  const filter = { published: true };
  if (q)
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
    ];

  const [items, total] = await Promise.all([
    Post.find(filter)
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Post.countDocuments(filter),
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) });
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "author",
    "username"
  );
  if (!post || !post.published)
    return res.status(404).json({ message: "Not found" });
  res.json({ post });
};

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, content, tags } = req.body;
  const post = await Post.create({ title, content, tags, author: req.user.id });
  res.status(201).json({ post });
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const { title, content, tags, published } = req.body;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (tags !== undefined) post.tags = tags;
  if (published !== undefined) post.published = published;
  await post.save();
  res.json({ post });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  await post.deleteOne();
  res.json({ message: "Deleted" });
};

export const toggleLike = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Not found" });

  const has = post.likes.some((u) => u.toString() === req.user.id);
  if (has) {
    // Nếu đã like -> bỏ like
    post.likes = post.likes.filter((u) => u.toString() !== req.user.id);
  } else {
    // Nếu chưa like -> thêm like
    post.likes.push(req.user.id);
  }

  await post.save();
  res.json({ likes: post.likes.length, liked: !has });
};
