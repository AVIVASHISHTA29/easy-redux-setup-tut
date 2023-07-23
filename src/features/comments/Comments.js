// Comments.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments } from "./commentsSlice";

function Comment({ comment }) {
  return (
    <div key={comment.id}>
      <h3>
        {comment.id}.{comment.email}
      </h3>
      <p>{comment.body}</p>
    </div>
  );
}

function Comments() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const commentStatus = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);

  useEffect(() => {
    if (commentStatus === "idle") {
      dispatch(fetchComments());
    }
  }, [commentStatus, dispatch]);

  if (commentStatus === "loading") {
    return <div>Loading...</div>;
  } else if (commentStatus === "succeeded") {
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  } else if (commentStatus === "failed") {
    return <div>{error}</div>;
  }
}

export default Comments;
