import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAnswer, {
    AnswerPayload,
    AnswerType,
    createEmptyAnswer,
} from "../../components/Answer/interfaces/IAnswer";
import IExam from "../../components/Exam/interfaces/IExam";
import IPart from "../../components/Part/interfaces/IPart";
import IQuestion from "../../components/Question/interfaces/IQuestion";
import QuestionTypeDatas from "../../const/QuestionTypes";
import examUltis from "../../Utils/examUltis";
import request from "../../Utils/request";
import { RootState } from "./../store";

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
        removeExamState: (state) => {
            return {} as examSliceState;
        },
        createPart: (state, action: PayloadAction<IPart>) => {
            if (state.parts) {
                state.parts.push(action.payload);
            } else {
                state.parts = [action.payload];
            }
        },
        updatePart: (state, action: PayloadAction<IPart>) => {
            const { id, title, totalPoints, type, description } =
                action.payload;
            const part = state.parts?.find((part) => part.id === id);
            if (part) {
                part.id = id;
                part.title = title;
                part.totalPoints = totalPoints;
                part.type = type;
                part.description = description;
            }
        },

        deletePart: (state, action: PayloadAction<number>) => {
            const partIndex = state.parts?.findIndex(
                (part) => part.id === action.payload
            );
            state.parts?.splice(partIndex!, 1);
        },
        createNewQuestion: (state, action: PayloadAction<IQuestion>) => {
            const part = state.parts?.find(
                (part) => part.id === action.payload.partId
            );
            part?.questions?.push(action.payload);
        },
        updateQuestionTitle: (
            state,
            action: PayloadAction<{
                partId: number;
                questionId: number;
                value: string;
            }>
        ) => {
            const part = examUltis.getPart(state, action.payload.partId);
            const question = part?.questions?.find(
                (question) => question.id === action.payload.questionId
            );
            question!.title = action.payload.value;
        },
        deleteQuestion: (
            state,
            action: PayloadAction<{
                partId: number;
                questionId: number;
            }>
        ) => {
            const part = examUltis.getPart(state, action.payload.partId);
            const questionIndex = part?.questions?.findIndex(
                (question) => question.id === action.payload.questionId
            );
            if (questionIndex !== -1) {
                part?.questions?.splice(questionIndex!, 1);
            }
        },
        createNewAnswer: (
            state,
            action: PayloadAction<{
                partId: number;
                questionId: number;
                answer: IAnswer;
            }>
        ) => {
            const { partId, questionId, answer } = action.payload;
            const question = examUltis.getQuestion(state, partId, questionId);
            question?.answers?.push(answer);
        },
        updateAnswer: (
            state,
            action: PayloadAction<{
                partId: number;
                questionId: number;
                answerId: number;
                value: string;
            }>
        ) => {
            const answer = examUltis.getAnswer(
                state,
                action.payload.partId,
                action.payload.questionId,
                action.payload.answerId
            );
            answer!.value = action.payload.value;
        },
        updateCorrectAnswer: (state, action: PayloadAction<AnswerPayload>) => {
            const { partId, questionId, answerId } = action.payload;
            const type = examUltis.getPart(state, partId)?.type;
            const question = examUltis.getQuestion(state, partId, questionId);

            if (type === QuestionTypeDatas.MultitpleChoice.value) {
                const oldAnswer = question?.answers?.find(
                    (answer) => answer.isTrue === true
                );
                if (oldAnswer) oldAnswer.isTrue = false;
            }
            const newAnswer = question?.answers?.find(
                (answer) => answer.id === action.payload.answerId
            );
            if (newAnswer) newAnswer.isTrue = !newAnswer.isTrue;
        },
        deleteAnswer: (
            state,
            action: PayloadAction<{
                partId: number;
                questionId: number;
                answerId: number;
            }>
        ) => {
            const { partId, questionId, answerId } = action.payload;
            const question = examUltis.getQuestion(state, partId, questionId);
            const answerIndex = question?.answers?.findIndex(
                (answer) => answer.id === answerId
            );
            if (answerIndex !== -1 && answerIndex !== undefined) {
                question?.answers?.splice(answerIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveExam.pending, (state, action) => {});
        builder.addCase(saveExam.rejected, (state, action) => {
            alert("Save Exam Failed");
        });
        builder.addCase(getExam.pending, (state, action) => {});
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
    IExam | undefined,
    {
        state: RootState;
    }
>("exams/create", async (exam, { dispatch, getState }) => {
    const updateRespone = await request.patch<IExam>("exams/" + exam!.id, exam);
    dispatch(updateExam(updateRespone));
    return updateRespone;
});

export const getExam = createAsyncThunk<
    examSliceState,
    { examId: number; includePart: boolean },
    {
        state: RootState;
    }
>("exams/get", async ({ examId, includePart }, { dispatch, getState }) => {
    const exam: IExam = await request
        .get<{ includePart: boolean }>("exams/" + examId, {
            includePart: true,
        })
        .catch((error) => console.log(error));
    return exam;
});

export const {
    createExam,
    updateExam,
    removeExamState,
    //saveExam,
    createPart,
    updatePart,
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
