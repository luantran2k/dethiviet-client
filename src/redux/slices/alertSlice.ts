import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

const alertSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<string>) => {
            state.push(action.payload);
        },
        removeAlert: (state, action: PayloadAction<string>) => {
            state.push(action.payload);
        },
    },
});
