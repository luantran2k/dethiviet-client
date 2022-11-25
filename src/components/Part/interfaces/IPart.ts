import { PartPayLoad } from "./../Modal/create";
import IMultipleChoicePart from "./IMultipleChoice";
import IMultiSelectPart from "./IMultiSelect";
import QuestionTypeDatas from "../../../const/QuestionTypes";
import { QuestionType } from "../../Question/interfaces/IQuestion";
import examUltis from "../../../Utils/examUltis";

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
    questions?: QuestionType[];
}
