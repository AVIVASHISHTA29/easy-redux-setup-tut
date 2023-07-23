import React from "react";
import Posts from "./features/posts/Posts";
import Comments from "./features/comments/Comments";

function App() {
  return (
    <div className="App">
      <h1>Posts</h1>
      <Posts />
      <h1>Comments</h1>
      <Comments />
    </div>
  );
}

export default App;
