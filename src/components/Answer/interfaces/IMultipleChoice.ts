import IAnswer from "./IAnswer";

export default interface IMultipleChoiceAnswer extends IAnswer {
    isTrue?: boolean;
}

const createEmptyMultipleChoiceAnswers = (
    newAnswerClientId: number,
    numberOfAnswers: number
): IMultipleChoiceAnswer[] => {
    const answers: IMultipleChoiceAnswer[] = [];
    for (let i = 0; i < numberOfAnswers; i++) {
        answers.push({
            clientId: newAnswerClientId + i,
            value: "",
            isTrue: false,
        });
    }

    return answers;
};

export { createEmptyMultipleChoiceAnswers };
