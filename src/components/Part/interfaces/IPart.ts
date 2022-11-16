import { PartPayLoad } from "./../Modal/create";
import IMultipleChoicePart from "./IMultipleChoice";
import IMultiSelectPart from "./IMultiSelect";
import QuestionTypeDatas from "../../../const/QuestionTypes";
import { QuestionType } from "../../Question/interfaces/IQuestion";
import examUltis from "../../../Utils/examUltis";

export type PartType = IMultipleChoicePart | IMultiSelectPart;

export default interface IPart {
    id?: number;
    clientId: number;
    index?: number;
    title: string;
    description?: string;
    type: string;
    totalPoints: number;
    questions?: QuestionType[];
}

export const createNewPart = (
    newPartClientId: number,
    part: PartPayLoad
): PartType => {
    const newQuestionClientId: number = 0;
    const newAnswerClientId: number = 0;

    const {
        title,
        description,
        numberOfQuesitons,
        numberOfAnswers,
        totalPoints,
        type,
    } = part;

    //Create Questions
    const questions: QuestionType[] = examUltis.createManyEmptyQuestion(
        type,
        numberOfQuesitons,
        numberOfAnswers,
        newQuestionClientId,
        newAnswerClientId
    );
    switch (type) {
        case QuestionTypeDatas.MultitpleChoice.value: {
            const newPart: IMultipleChoicePart = {
                clientId: newPartClientId,
                title,
                description,
                numberOfAnswers,
                totalPoints,
                type,
                questions,
            };
            return newPart;
        }
        case QuestionTypeDatas.MultiSelect.value: {
            const newPart: IMultiSelectPart = {
                clientId: newPartClientId,
                title,
                description,
                numberOfAnswers,
                totalPoints,
                type,
                questions,
            };
            return newPart;
        }
        default: {
            const newPart: IMultipleChoicePart = {
                clientId: newPartClientId,
                title,
                description,
                numberOfAnswers,
                totalPoints,
                type,
                questions,
            };
            return newPart;
        }
    }
};
