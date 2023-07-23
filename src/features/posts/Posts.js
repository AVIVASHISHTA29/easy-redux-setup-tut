// Posts.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./postsSlice";

function Post({ post }) {
  return (
    <div key={post.id}>
      <h3>
        {post.id}. {post.title}
      </h3>
      <p>{post.body}</p>
    </div>
  );
}

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === "loading") {
    return <div>Loading...</div>;
  } else if (postStatus === "succeeded") {
    return posts.map((post) => <Post key={post.id} post={post} />);
  } else if (postStatus === "failed") {
    return <div>{error}</div>;
  }
}

export default Posts;
