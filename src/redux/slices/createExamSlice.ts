import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExam from "../../components/Exam/interfaces/IExam";
import IPart from "../../components/Part/interfaces/IPart";
import { v4 as uuid } from "uuid";

interface PartTemp extends Partial<IPart> {
    clientId: string;
    numberOfQuestions?: string;
}

export interface CreateExamSliceState {
    examsSelected: IExam[];
    parts: PartTemp[];
    numberOfExams: number;
    examToCreateInfo: IExam;
}

const initialState: CreateExamSliceState = {
    examsSelected: JSON.parse(localStorage.getItem("examsSelected") || "[]"),
    parts: [],
    numberOfExams: 1,
    examToCreateInfo: {},
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
        addPartTemp: (state) => {
            state.parts.push({ clientId: uuid() });
        },
        updateFieldPartTemp: (
            state,
            action: PayloadAction<{
                clientId: string;
                field: keyof PartTemp;
                value: string | number;
            }>
        ) => {
            const part = state.parts.find(
                (part) => part.clientId === action.payload.clientId
            );
            if (part) {
                part[action.payload.field] = action.payload.value as never;
            }
        },
        removePartTemp: (state, action: PayloadAction<string>) => {
            const partIndex = state.parts.findIndex(
                (part) => part.clientId === action.payload
            );
            console.log(partIndex);
            if (partIndex !== -1) {
                state.parts.splice(partIndex, 1);
            }
        },
        removeAllPartsTemp: (state) => {
            state.parts = [];
        },
        updateNumberOfExams: (state, action: PayloadAction<number>) => {
            state.numberOfExams = action.payload;
        },
        updateExamToCreateInfo: (state, action: PayloadAction<IExam>) => {
            state.examToCreateInfo = action.payload;
        },
    },
});

export const {
    addSelectedExam,
    removeSelectedExam,
    removeAllSelectedExam,
    addPartTemp,
    updateFieldPartTemp,
    removePartTemp,
    removeAllPartsTemp,
    updateNumberOfExams,
    updateExamToCreateInfo,
} = createExamSlice.actions;

export default createExamSlice;
