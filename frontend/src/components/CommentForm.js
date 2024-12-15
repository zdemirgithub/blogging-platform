// frontend/src/components/CommentForm.js
import React, { useState } from "react";

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;
