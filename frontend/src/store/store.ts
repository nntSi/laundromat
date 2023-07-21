import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// register
import customerReducer from "./slices/customerSlice";
import generalReducer from "./slices/generalSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    general: generalReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
