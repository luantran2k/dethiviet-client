import QuestionTypeDatas from "../../../const/QuestionTypes";
import { examSliceState } from "../../../redux/slices/examSlice";
import IMultipleChoiceAnswer from "./IMultipleChoice";
import IMultiSelectAnswer from "./IMultiSelect";

export type AnswerType = IMultipleChoiceAnswer | IMultiSelectAnswer;

export default interface IAnswer {
    id?: number;
    clientId: number;
    value?: string | number;
}

export interface AnswerPayload {
    partClientId: number;
    questionClientId: number;
    answerClientId: number;
    isTrue?: boolean;
    value?: string | number;
}

export const createEmptyAnswer = (
    state: examSliceState,
    answerType: string,
    answerclientId: number
) => {
    switch (answerType) {
        case QuestionTypeDatas.MultitpleChoice.value: {
            const newAnswer: IMultipleChoiceAnswer = {
                clientId: answerclientId,
                value: "",
                isTrue: false,
            };
            return newAnswer;
        }
        case QuestionTypeDatas.MultiSelect.value: {
            const newAnswer: IMultiSelectAnswer = {
                clientId: answerclientId,
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
//     const { partClientId, questionClientId, answerClientId, isTrue, value } = payload;
//     if (question === undefined || type === undefined) return undefined;
//     switch (type) {
//         case QuestionTypeDatas.MultitpleChoice.value: {
//             const oldAnswer = question?.answers?.find(
//                 (answer) => answer.isTrue === true
//             );
//             if (oldAnswer) oldAnswer.isTrue = false;

//             let answer = question?.answers?.find(
//                 (answer) => answer.clientId === answerClientId
//             );
//             const newAnswer: IMultipleChoiceAnswer = {
//                 clientId: answerClientId,
//                 ...payload,
//             };
//             return newAnswer;
//         }

//         case QuestionTypeDatas.MultiSelect.value: {
//             let answer = question?.answers?.find(
//                 (answer) => answer.clientId === answerClientId
//             );
//             const newAnswer: IMultipleChoiceAnswer = {
//                 clientId: answerClientId,
//                 isTrue,
//                 value,
//             };
//             return newAnswer;
//         }
//     }
// };
