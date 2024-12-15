// frontend/src/components/Post.js
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import axios from "axios";

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments);

  const addComment = async (comment) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${post._id}/comment`,
        { body: comment, authorId: post.author._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
      );
      setComments(response.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>Comments:</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          <p>{comment.body}</p>
        </div>
      ))}
      <CommentForm addComment={addComment} />
    </div>
  );
};

export default Post;
