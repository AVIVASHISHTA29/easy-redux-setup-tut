import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsStart());
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch(fetchPostsSuccess(response.data));
  } catch (err) {
    dispatch(fetchPostsFailure(err.toString()));
  }
};

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: "idle", error: null },
  reducers: {
    fetchPostsStart: (state) => {
      state.status = "loading";
    },
    fetchPostsSuccess: (state, action) => {
      state.status = "succeeded";
      state.posts = state.posts.concat(action.payload);
    },
    fetchPostsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } =
  postsSlice.actions;
export default postsSlice.reducer;
