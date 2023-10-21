import { configureStore } from "@reduxjs/toolkit";
import incrementReducer from "./reducers/incrementReducer/incrementReducer";
import postsReducer from "./reducers/postsReducer/postsReducer";
import peoplesReducer from "./reducers/peoplesReducer/peoplesReducer";

export const store = configureStore({
  reducer: {
    increment: incrementReducer,
    posts: postsReducer,
    peoples: peoplesReducer,
  },
});
