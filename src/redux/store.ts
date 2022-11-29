import examSlice from "./slices/examSlice";
import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import createExamSlice from "./slices/createExamSlice";
// ...

export const store = configureStore({
    reducer: {
        exam: examSlice.reducer,
        app: appSlice.reducer,
        createExam: createExamSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
