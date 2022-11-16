import { RootState } from "./../store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IExam, { ExamPayload } from "../../components/Exam/interfaces/IExam";
import {
    createNewPart,
    PartType,
} from "../../components/Part/interfaces/IPart";
import { PartPayLoad } from "../../components/Part/Modal/create";
import QuestionTypeDatas from "../../const/QuestionTypes";
import examUltis from "../../Utils/examUltis";
import {
    AnswerPayload,
    AnswerType,
    createEmptyAnswer,
} from "../../components/Answer/interfaces/IAnswer";
import { create } from "@mui/material/styles/createTransitions";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface examSliceState extends IExam {}

const initialState: examSliceState = {};

const examSlice = createSlice({
    name: "exam",
    initialState,
    reducers: {
        createExam: (state, action: PayloadAction<IExam>) => {
            return (state = action.payload);
        },
        updateExam: (state, action: PayloadAction<IExam>) => {
            for (const key in action.payload) {
                state[key as keyof examSliceState] = action.payload[
                    key as keyof examSliceState
                ] as undefined; //Just remove warning of ts always returning undefined
            }
        },
        createPart: (state, action: PayloadAction<PartPayLoad>) => {
            const newPartClientId = examUltis.getNewPartClientId(state);
            const newPart = createNewPart(newPartClientId, action.payload);
            if (newPartClientId === 0) {
                state.parts = [];
            }
            state.parts?.push(newPart);
        },
        deletePart: (state, action: PayloadAction<number>) => {
            const partIndex = state.parts?.findIndex(
                (part) => part.clientId === action.payload
            );
            state.parts?.splice(partIndex!, 1);
        },
        createNewQuestion: (
            state,
            action: PayloadAction<{ partClientId: number }>
        ) => {
            const part = state.parts?.find(
                (part) => part.clientId === action.payload.partClientId
            );
            const numberOfAnswers =
                part?.numberOfAnswers ||
                examUltis.getNumberOfAnswer(state, action.payload.partClientId);
            if (part && numberOfAnswers) {
                const newQuestionClientId = examUltis.getNewQuestionClientId(
                    state,
                    action.payload.partClientId
                );
                const newQuestion = examUltis.createEmptyQuestion(
                    part.type,
                    newQuestionClientId,
                    0,
                    numberOfAnswers
                );
                part.questions?.push(newQuestion);
            }
        },
        updateQuestionTitle: (
            state,
            action: PayloadAction<{
                partClientId: number;
                questionClientId: number;
                value: string;
            }>
        ) => {
            const part = examUltis.getPart(state, action.payload.partClientId);
            const question = part?.questions?.find(
                (question) =>
                    question.clientId === action.payload.questionClientId
            );
            question!.title = action.payload.value;
        },
        deleteQuestion: (
            state,
            action: PayloadAction<{
                partClientId: number;
                questionClientId: number;
            }>
        ) => {
            const part = examUltis.getPart(state, action.payload.partClientId);
            const questionIndex = part?.questions?.findIndex(
                (question) =>
                    question.clientId === action.payload.questionClientId
            );
            if (questionIndex !== -1) {
                part?.questions?.splice(questionIndex!, 1);
            }
        },
        createNewAnswer: (
            state,
            action: PayloadAction<{
                partClientId: number;
                questionClientId: number;
            }>
        ) => {
            const { partClientId, questionClientId } = action.payload;
            const answerType = examUltis.getPart(state, partClientId)?.type;
            const question = examUltis.getQuestion(
                state,
                partClientId,
                questionClientId
            );
            const newAnswerClientId = examUltis.getNewAnswerClientId(
                state,
                partClientId,
                questionClientId
            );
            const newAnswer = createEmptyAnswer(
                state,
                answerType!,
                newAnswerClientId
            );
            question?.answers?.push(newAnswer as AnswerType);
        },
        updateAnswer: (
            state,
            action: PayloadAction<{
                partClientId: number;
                questionClientId: number;
                answerClientId: number;
                value: string;
            }>
        ) => {
            const answer = examUltis.getAnswer(
                state,
                action.payload.partClientId,
                action.payload.questionClientId,
                action.payload.answerClientId
            );
            answer!.value = action.payload.value;
        },
        updateCorrectAnswer: (state, action: PayloadAction<AnswerPayload>) => {
            const { partClientId, questionClientId, answerClientId } =
                action.payload;
            const type = examUltis.getPart(state, partClientId)?.type;
            const question = examUltis.getQuestion(
                state,
                partClientId,
                questionClientId
            );

            if (type === QuestionTypeDatas.MultitpleChoice.value) {
                const oldAnswer = question?.answers?.find(
                    (answer) => answer.isTrue === true
                );
                if (oldAnswer) oldAnswer.isTrue = false;
            }
            const newAnswer = question?.answers?.find(
                (answer) => answer.clientId === action.payload.answerClientId
            );
            if (newAnswer) newAnswer.isTrue = !newAnswer.isTrue;
        },
        deleteAnswer: (
            state,
            action: PayloadAction<{
                partClientId: number;
                questionClientId: number;
                answerClientId: number;
            }>
        ) => {
            const { partClientId, questionClientId, answerClientId } =
                action.payload;
            const question = examUltis.getQuestion(
                state,
                partClientId,
                questionClientId
            );
            const answerIndex = question?.answers?.findIndex(
                (answer) => answer.clientId === answerClientId
            );
            if (answerIndex !== -1 && answerIndex !== undefined) {
                question?.answers?.splice(answerIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveExam.pending, (state, action) => {
            console.log("Create exam pending...");
        });
        builder.addCase(saveExam.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(saveExam.rejected, (state, action) => {
            alert("Save Exam Failed");
        });
        builder.addCase(getExam.pending, (state, action) => {
            console.log("Get exam pending...");
        });
        builder.addCase(getExam.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getExam.rejected, (state, action) => {
            alert("Get Exam Failed");
        });
    },
});

//save exam to database.
export const saveExam = createAsyncThunk<
    examSliceState,
    string | undefined,
    {
        state: RootState;
    }
>("exams/create", async (examId, { dispatch, getState }) => {
    const exam: examSliceState = getState().exam;
    //console.log(JSON.stringify(exam));
    if (examId) {
        return await request.patch("exams/" + examId, { ...exam, ownerId: 1 });
    }
    return await request.post("exams", { ...exam, ownerId: 1 });
});

export const getExam = createAsyncThunk<
    examSliceState,
    string | undefined,
    {
        state: RootState;
    }
>("exams/get", async (examId, { dispatch, getState }) => {
    const exam = request.get("exams/" + examId);
    return exam;
});

export const {
    createExam,
    updateExam,
    //saveExam,
    createPart,
    deletePart,
    createNewQuestion,
    updateQuestionTitle,
    deleteQuestion,
    createNewAnswer,
    updateAnswer,
    updateCorrectAnswer,
    deleteAnswer,
} = examSlice.actions;

export default examSlice;
