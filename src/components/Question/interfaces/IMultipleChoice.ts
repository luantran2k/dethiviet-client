import IMultipleChoiceAnswer, {
    createEmptyMultipleChoiceAnswers,
} from "../../Answer/interfaces/IMultipleChoice";
import IQuestion from "./IQuestion";

export default interface IMultipleChoiceQuestion extends IQuestion {
    answers?: IMultipleChoiceAnswer[];
}

const createEmptyMultipleChoiceQuestion = (
    newQuestionClientId: number,
    numberOfAnswers: number,
    newAnswerClientId: number
): IMultipleChoiceQuestion => {
    const answers: IMultipleChoiceAnswer[] = createEmptyMultipleChoiceAnswers(
        newAnswerClientId,
        numberOfAnswers
    );
    return {
        clientId: newQuestionClientId,
        title: "",
        answers,
    };
};

const createEmptyMultipleChoiceQuestions = (
    newQuestionClientId: number,
    numberOfQuestion: number,
    newAnswerClientId: number,
    numberOfAnswers: number
): IMultipleChoiceQuestion[] => {
    const questions: IMultipleChoiceQuestion[] = [];

    for (let i = 0; i < numberOfQuestion; i++) {
        newQuestionClientId = newQuestionClientId + i;
        const question = createEmptyMultipleChoiceQuestion(
            newQuestionClientId,
            newAnswerClientId,
            numberOfAnswers
        );
        questions.push(question);
        newAnswerClientId = newAnswerClientId + numberOfAnswers;
    }
    return questions;
};

export {
    createEmptyMultipleChoiceQuestion,
    createEmptyMultipleChoiceQuestions,
};
