import IMultipleChoiceQuestion from "./IMultipleChoice";
import IMultiSelectQuestion from "./IMultiSelect";

export type QuestionType = IMultipleChoiceQuestion | IMultiSelectQuestion;

export default interface IQuestion {
    id: number;
    partId: number;
    index?: number;
    title: string;
    description?: string;
    explain?: string;
}
