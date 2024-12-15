// frontend/src/components/PostForm.js
import React, { useState } from "react";
import axios from "axios";

const PostForm = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, body, authorId: localStorage.getItem("userId") };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        newPost,
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Post Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
