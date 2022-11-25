import IMultipleChoiceQuestion from "../../Question/interfaces/IMultipleChoice";
import IPart from "./IPart";

export default interface IMultipleChoicePart extends IPart {
    questions: IMultipleChoiceQuestion[];
}
