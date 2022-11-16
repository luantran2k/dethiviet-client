import IMultiSelectAnswer from "../../Answer/interfaces/IMultiSelect";
import Question from "./IQuestion";

export default interface IMultiSelectQuestion extends Question {
    answers?: IMultiSelectAnswer[];
}
