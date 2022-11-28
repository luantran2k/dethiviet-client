import { direction } from "./../../const/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExam from "../../components/Exam/interfaces/IExam";
import request, { removeToken, saveRefreshToken } from "../../Utils/request";
import { RootState } from "../store";
import { v4 as uuid } from "uuid";

export interface User {
    id: number;
    username: string;
    profileImg?: string;
    email?: string;
    phone?: string;
    name?: string;
    createAt?: string;
}

export interface AlertPayload {
    message: string;
    severity?: "error" | "info" | "success" | "warning";
}
export interface Alert extends AlertPayload {
    id: string;
}

export interface AppSliceState {
    isSignIn: boolean;
    isLoading?: boolean;
    userInfo?: User;
    examsSelected: IExam[];
    alerts: Alert[];
}

const initialState: AppSliceState = {
    isSignIn: false,
    isLoading: false,
    userInfo: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : undefined,
    examsSelected: JSON.parse(localStorage.getItem("examsSelected") || "[]"),
    alerts: [],
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
        addAlert: (state, action: PayloadAction<Alert>) => {
            state.alerts.push(action.payload);
        },
        removeAlert: (state, action: PayloadAction<string>) => {
            const alertIndex = state.alerts.findIndex(
                (alert) => alert.id === action.payload
            );
            if (alertIndex !== -1) state.alerts.splice(alertIndex, 1);
        },
        addSelectedExam: (state, action: PayloadAction<IExam>) => {
            const examIndex = state.examsSelected.findIndex(
                (exam) => exam.id === action.payload.id
            );
            if (examIndex === -1) {
                state.examsSelected.push(action.payload);
                localStorage.setItem(
                    "examsSelected",
                    JSON.stringify(state.examsSelected)
                );
            }
        },
        removeSelectedExam: (state, action: PayloadAction<number>) => {
            const examIndex = state.examsSelected.findIndex(
                (exam) => exam.id === action.payload
            );
            if (examIndex !== -1) {
                state.examsSelected.splice(examIndex, 1);
                localStorage.setItem(
                    "examsSelected",
                    JSON.stringify(state.examsSelected)
                );
            }
        },
        removeAllSelectedExam: (state) => {
            state.examsSelected = [];
            localStorage.removeItem("examsSelected");
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

export const sendAlert = createAsyncThunk(
    "sendAlert",
    async (alert: AlertPayload, { dispatch, getState }) => {
        const id = uuid();
        dispatch(addAlert({ ...alert, id }));
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve("resolved");
            }, 10 * 1000);
        });
        dispatch(removeAlert(id));
    }
);

export const {
    setIsSignIn,
    signOut,
    addSelectedExam,
    removeSelectedExam,
    removeAllSelectedExam,
    addAlert,
    removeAlert,
} = appSlice.actions;

export default appSlice;
