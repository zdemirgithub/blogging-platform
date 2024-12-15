// backend/routes/postRoutes.js
const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create new post
router.post("/", async (req, res) => {
  const { title, body, authorId } = req.body;
  const newPost = new Post({ title, body, author: authorId });

  try {
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add comment to post
router.post("/:postId/comment", async (req, res) => {
  const { body, authorId } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    post.comments.push({ body, author: authorId });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
