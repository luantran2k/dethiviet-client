import { QuestionType } from "../../Question/interfaces/IQuestion";
import IMultipleChoicePart from "./IMultipleChoice";
import IMultiSelectPart from "./IMultiSelect";

export type PartType = IMultipleChoicePart | IMultiSelectPart;

export default interface IPart {
    id: number;
    examId: number;
    title: string;
    type: string;
    totalPoints: number;
    partAudio: string;
    description: string;
    numberOfAnswers: number;
    numberCorrectQuestionsOfPart?: number;
    partScore?: number;
    questions?: QuestionType[];
    questionIds?: number[];
}
