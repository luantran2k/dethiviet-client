import IMultipleChoiceAnswer from "../../Answer/interfaces/IMultipleChoice";
import IQuestion from "./IQuestion";

export default interface IMultipleChoiceQuestion extends IQuestion {
    answers?: IMultipleChoiceAnswer[];
}
