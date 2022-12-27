import IMultipleChoiceAnswer from "./IMultipleChoice";
import IMultiSelectAnswer from "./IMultiSelect";

export type AnswerType = IMultipleChoiceAnswer | IMultiSelectAnswer;

export default interface IAnswer {
    id: number;
    value?: string | number;
    isAnswerFail?: boolean;
}

export interface AnswerPayload {
    partId: number;
    questionId: number;
    answerId: number;
    isTrue?: boolean;
    isAnswerFail?: boolean;
    value?: string | number;
}
