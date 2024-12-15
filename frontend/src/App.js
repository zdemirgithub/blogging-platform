// frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import Post from "./components/Post";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (authToken) {
      axios
        .get("http://localhost:5000/api/posts", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    }
  }, [authToken]);

  return (
    <Router>
      <Header setAuthToken={setAuthToken} />
      <Switch>
        <Route path="/" exact>
          <PostForm setPosts={setPosts} />
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
