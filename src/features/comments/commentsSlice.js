import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchComments = () => async (dispatch) => {
  dispatch(fetchCommentsStart());
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    dispatch(fetchCommentsSuccess(response.data));
  } catch (err) {
    dispatch(fetchCommentsFailure(err.toString()));
  }
};

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: [], status: "idle", error: null },
  reducers: {
    fetchCommentsStart: (state) => {
      state.status = "loading";
    },
    fetchCommentsSuccess: (state, action) => {
      state.status = "succeeded";
      state.comments = state.comments.concat(action.payload);
    },
    fetchCommentsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentsSlice.actions;
export default commentsSlice.reducer;
