import { examSliceState, updateCorrectAnswer } from "../redux/slices/examSlice";
import { PartType } from "../components/Part/interfaces/IPart";
import QuestionTypeDatas from "../const/QuestionTypes";
import IMultiSelectAnswer from "../components/Answer/interfaces/IMultiSelect";
import { AnswerType } from "../components/Answer/interfaces/IAnswer";
import IMultiSelectQuestion from "../components/Question/interfaces/IMultiSelect";
import { QuestionType } from "../components/Question/interfaces/IQuestion";
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

const examUltis = {
    getNewpartId(state: examSliceState): number {
        const part = state?.parts?.[state.parts.length - 1];
        return part ? part.id + 1 : 0;
    },
    getNewquestionId(state: examSliceState, partId: number): number {
        const part = examUltis.getPart(state, partId);
        const question = part?.questions?.[part.questions.length - 1];
        return question ? question.id + 1 : 0;
    },
    getNewanswerId(
        state: examSliceState,
        partId: number,
        questionId: number
    ): number {
        const question = examUltis.getQuestion(state, partId, questionId);
        const answer = question?.answers?.[question.answers.length - 1];
        return answer ? answer.id + 1 : 0;
    },
    getPart(state: examSliceState, partId: number): PartType | undefined {
        return state.parts?.find((part) => part.id === partId);
    },
    getQuestion(
        state: examSliceState,
        partId: number,
        questionId: number
    ): QuestionType | undefined {
        const part = examUltis.getPart(state, partId);
        return part?.questions?.find((question) => question.id === questionId);
    },
    getAnswer(
        state: examSliceState,
        partId: number,
        questionId: number,
        answerId: number
    ): AnswerType | undefined {
        const question = examUltis.getQuestion(state, partId, questionId);
        return question?.answers?.find((answer) => answer.id === answerId);
    },
    getNumberOfAnswer(
        state: examSliceState,
        partId: number
    ): number | undefined {
        const part = examUltis.getPart(state, partId);
        return part?.questions?.[0].answers?.length;
    },
    getMaxLengthOfAnswer(answers: AnswerType[]) {
        return answers.reduce((maxLength, currentAnswer) => {
            if (maxLength < String(currentAnswer.value)?.length) {
                return String(currentAnswer.value)?.length;
            }
            return maxLength;
        }, Number.NEGATIVE_INFINITY);
    },
    getSizeOfColumnAnswer(answers?: AnswerType[]) {
        if (answers === undefined) return 3;
        const maxLength = examUltis.getMaxLengthOfAnswer(answers);
        if (maxLength > 60) {
            return 12;
        } else if (maxLength > 34) {
            return 6;
        } else if (answers.length % 3 === 0) {
            return 4;
        } else if (answers.length % 5 === 0) {
            if (maxLength <= 7) {
                return 2.4;
            } else return 4;
        } else return 3;
    },
};

export default examUltis;
