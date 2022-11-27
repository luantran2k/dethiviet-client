import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request, { removeToken, saveRefreshToken } from "../../Utils/request";
import { RootState } from "../store";

export interface User {
    id: number;
    username: string;
    profileImg?: string;
    email?: string;
    phone?: string;
    name?: string;
    createAt?: string;
}

export interface AppSliceState {
    isSignIn: boolean;
    isLoading?: boolean;
    userInfo?: User;
}

const initialState: AppSliceState = {
    isSignIn: false,
    isLoading: false,
    userInfo: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : undefined,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setIsSignIn: (state) => {
            state.isSignIn = true;
            state.userInfo = JSON.parse(
                localStorage.getItem("userInfo") || "{}"
            );
        },
        signOut: (state) => {
            state.isSignIn = false;
            state.userInfo = undefined;
            removeToken();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isSignIn = true;
            state.isLoading = false;
            saveRefreshToken(action.payload);
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            console.log("signUp rejected", action.payload);
        });
        builder.addCase(signIn.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSignIn = true;
            state.userInfo = action.payload.userInfo;
            saveRefreshToken(action.payload);
        });
        builder.addCase(signIn.rejected, (state, action) => {
            state.isLoading = false;
            console.log("Sign in rejected", action.payload);
        });
    },
});

export const signUp = createAsyncThunk<
    { accessToken: string; refreshToken: string; userInfo: User },
    { username: string; password: string },
    { state: RootState }
>("signUp", async ({ username, password }, { dispatch, getState }) => {
    const data = await request.post<{
        accessToken: string;
        refreshToken: string;
        userInfo: User;
    }>("auth/signUp", {
        username,
        password,
    });
    return data;
});

export const signIn = createAsyncThunk<
    { accessToken: string; refreshToken: string; userInfo: User },
    { username: string; password: string },
    { state: RootState }
>("signIn", async ({ username, password }, { dispatch, getState }) => {
    const data = await request.post<{
        accessToken: string;
        refreshToken: string;
        userInfo: User;
    }>("auth/signIn", {
        username,
        password,
    });
    return data;
});

export const { setIsSignIn, signOut } = appSlice.actions;

export default appSlice;
