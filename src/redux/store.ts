import examSlice from "./slices/examSlice";
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appSlice, { AppSliceState } from "./slices/appSlice";
import createExamSlice, {
    CreateExamSliceState,
} from "./slices/createExamSlice";
import IExam from "../components/Exam/interfaces/IExam";
// ...

export const store = configureStore({
    reducer: {
        exam: examSlice.reducer,
        app: appSlice.reducer,
        createExam: createExamSlice.reducer,
    },
});

export type StoreType = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
