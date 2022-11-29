import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExam from "../../components/Exam/interfaces/IExam";

export interface CreateExamSliceState {
    examsSelected: IExam[];
}

const initialState: CreateExamSliceState = {
    examsSelected: JSON.parse(localStorage.getItem("examsSelected") || "[]"),
};

const createExamSlice = createSlice({
    name: "createExamSlice",
    initialState,
    reducers: {
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
});

export const { addSelectedExam, removeSelectedExam, removeAllSelectedExam } =
    createExamSlice.actions;

export default createExamSlice;
