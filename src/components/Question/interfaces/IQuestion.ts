import { AnswerType } from "./../../Answer/interfaces/IAnswer";
import IMultipleChoiceQuestion from "./IMultipleChoice";
import IMultiSelectQuestion from "./IMultiSelect";

export type QuestionType = IMultipleChoiceQuestion | IMultiSelectQuestion;

export default interface IQuestion {
    id: number;
    partId: number;
    index?: number;
    title: string;
    description?: string;
    questionAudio?: string;
    questionImages?: string[];
    explain?: string;
    answers?: AnswerType[];
}
