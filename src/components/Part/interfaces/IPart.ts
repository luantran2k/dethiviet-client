import { PartPayLoad } from "./../Modal/create";
import IMultipleChoicePart from "./IMultipleChoice";
import IMultiSelectPart from "./IMultiSelect";
import QuestionTypeDatas from "../../../const/QuestionTypes";
import { QuestionType } from "../../Question/interfaces/IQuestion";
import examUltis from "../../../Utils/examUltis";

export type PartType = IMultipleChoicePart | IMultiSelectPart;

export default interface IPart {
    id: number;
    index?: number;
    title: string;
    description?: string;
    type: string;
    totalPoints: number;
    questions?: QuestionType[];
}
