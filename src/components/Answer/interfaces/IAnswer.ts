import QuestionTypeDatas from "../../../const/QuestionTypes";
import { examSliceState } from "../../../redux/slices/examSlice";
import IMultipleChoiceAnswer from "./IMultipleChoice";
import IMultiSelectAnswer from "./IMultiSelect";

export type AnswerType = IMultipleChoiceAnswer | IMultiSelectAnswer;

export default interface IAnswer {
    id: number;
    value?: string | number;
}

export interface AnswerPayload {
    partId: number;
    questionId: number;
    answerId: number;
    isTrue?: boolean;
    value?: string | number;
}

export const createEmptyAnswer = (
    state: examSliceState,
    answerType: string,
    answerId: number
) => {
    switch (answerType) {
        case QuestionTypeDatas.MultipleChoice.value: {
            const newAnswer: IMultipleChoiceAnswer = {
                id: answerId,
                value: "",
                isTrue: false,
            };
            return newAnswer;
        }
        case QuestionTypeDatas.MultiSelect.value: {
            const newAnswer: IMultiSelectAnswer = {
                id: answerId,
                value: "",
                isTrue: false,
            };
            return newAnswer;
        }
        default: {
        }
    }
};

// export const uppdateAnswerInfo = (
//     state: examSliceState,
//     type: string,
//     question: QuestionType,
//     payload: AnswerPayload
// ) => {
//     const { partId, questionId, answerId, isTrue, value } = payload;
//     if (question === undefined || type === undefined) return undefined;
//     switch (type) {
//         case QuestionTypeDatas.MultipleChoice.value: {
//             const oldAnswer = question?.answers?.find(
//                 (answer) => answer.isTrue === true
//             );
//             if (oldAnswer) oldAnswer.isTrue = false;

//             let answer = question?.answers?.find(
//                 (answer) => answer.id === answerId
//             );
//             const newAnswer: IMultipleChoiceAnswer = {
//                 id: answerId,
//                 ...payload,
//             };
//             return newAnswer;
//         }

//         case QuestionTypeDatas.MultiSelect.value: {
//             let answer = question?.answers?.find(
//                 (answer) => answer.id === answerId
//             );
//             const newAnswer: IMultipleChoiceAnswer = {
//                 id: answerId,
//                 isTrue,
//                 value,
//             };
//             return newAnswer;
//         }
//     }
// };
