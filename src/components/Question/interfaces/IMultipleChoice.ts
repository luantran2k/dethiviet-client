import IMultipleChoiceAnswer, {
    createEmptyMultipleChoiceAnswers,
} from "../../Answer/interfaces/IMultipleChoice";
import IQuestion from "./IQuestion";

export default interface IMultipleChoiceQuestion extends IQuestion {
    answers?: IMultipleChoiceAnswer[];
}

const createEmptyMultipleChoiceQuestion = (
    newquestionId: number,
    numberOfAnswers: number,
    newanswerId: number
): IMultipleChoiceQuestion => {
    const answers: IMultipleChoiceAnswer[] = createEmptyMultipleChoiceAnswers(
        newanswerId,
        numberOfAnswers
    );
    return {
        id: newquestionId,
        title: "",
        answers,
    };
};

const createEmptyMultipleChoiceQuestions = (
    newquestionId: number,
    numberOfQuestion: number,
    newanswerId: number,
    numberOfAnswers: number
): IMultipleChoiceQuestion[] => {
    const questions: IMultipleChoiceQuestion[] = [];

    for (let i = 0; i < numberOfQuestion; i++) {
        newquestionId = newquestionId + i;
        const question = createEmptyMultipleChoiceQuestion(
            newquestionId,
            newanswerId,
            numberOfAnswers
        );
        questions.push(question);
        newanswerId = newanswerId + numberOfAnswers;
    }
    return questions;
};

export {
    createEmptyMultipleChoiceQuestion,
    createEmptyMultipleChoiceQuestions,
};
