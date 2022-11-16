import { examSliceState } from "../redux/slices/examSlice";
import { PartType } from "../components/Part/interfaces/IPart";
import {
    createEmptyMultipleChoiceQuestion,
    createEmptyMultipleChoiceQuestions,
} from "../components/Question/interfaces/IMultipleChoice";
import QuestionTypeDatas from "../const/QuestionTypes";
import IMultiSelectAnswer from "../components/Answer/interfaces/IMultiSelect";
import { AnswerType } from "../components/Answer/interfaces/IAnswer";
import IMultiSelectQuestion from "../components/Question/interfaces/IMultiSelect";
import { QuestionType } from "../components/Question/interfaces/IQuestion";

const examUltis = {
    createEmptyQuestion: (
        type: string,
        newQuestionClientId: number,
        newanswerClientId: number = 0,
        numberOfAnswers: number = 3
    ): QuestionType => {
        switch (type) {
            case QuestionTypeDatas.MultitpleChoice.value: {
                return createEmptyMultipleChoiceQuestion(
                    newQuestionClientId,
                    numberOfAnswers,
                    newanswerClientId
                );
            }

            case QuestionTypeDatas.MultiSelect.value: {
                const answers: IMultiSelectAnswer[] = Array(numberOfAnswers)
                    .fill({})
                    .map((x, index) => ({
                        clientId: index,
                        value: "",
                        isTrue: false,
                    }));

                const newQuestion: IMultiSelectQuestion = {
                    clientId: newQuestionClientId,
                    title: "",
                    answers,
                };
                return newQuestion;
            }
            default: {
                return createEmptyMultipleChoiceQuestion(
                    newQuestionClientId,
                    newanswerClientId,
                    numberOfAnswers
                );
            }
        }
    },
    createManyEmptyQuestion: (
        type: string,
        numberOfQuestions: number,
        numberOfAnswers?: number,
        newQuestionClientId: number = 0,
        newanswerClientId: number = 0
    ) => {
        const questions = [];
        for (
            let questionClientId = newQuestionClientId;
            questionClientId < newQuestionClientId + numberOfQuestions;
            questionClientId++
        ) {
            questions.push(
                examUltis.createEmptyQuestion(
                    type,
                    questionClientId,
                    newanswerClientId,
                    numberOfAnswers
                )
            );
        }
        return questions;
    },
    getNewPartClientId(state: examSliceState): number {
        const part = state?.parts?.[state.parts.length - 1];
        return part ? part.clientId + 1 : 0;
    },
    getNewQuestionClientId(
        state: examSliceState,
        partClientId: number
    ): number {
        const part = examUltis.getPart(state, partClientId);
        const question = part?.questions?.[part.questions.length - 1];
        return question ? question.clientId + 1 : 0;
    },
    getNewAnswerClientId(
        state: examSliceState,
        partClientId: number,
        questionClientId: number
    ): number {
        const question = examUltis.getQuestion(
            state,
            partClientId,
            questionClientId
        );
        const answer = question?.answers?.[question.answers.length - 1];
        return answer ? answer.clientId + 1 : 0;
    },
    getPart(state: examSliceState, partClientId: number): PartType | undefined {
        return state.parts?.find((part) => part.clientId === partClientId);
    },
    getQuestion(
        state: examSliceState,
        partClientId: number,
        questionClientId: number
    ): QuestionType | undefined {
        const part = examUltis.getPart(state, partClientId);
        return part?.questions?.find(
            (question) => question.clientId === questionClientId
        );
    },
    getAnswer(
        state: examSliceState,
        partClientId: number,
        questionClientId: number,
        answerClientId: number
    ): AnswerType | undefined {
        const question = examUltis.getQuestion(
            state,
            partClientId,
            questionClientId
        );
        return question?.answers?.find(
            (answer) => answer.clientId === answerClientId
        );
    },
    getNumberOfAnswer(
        state: examSliceState,
        partClientId: number
    ): number | undefined {
        const part = examUltis.getPart(state, partClientId);
        return part?.questions?.[0].answers?.length;
    },
    getMaxLengthOfAnswer(answers: AnswerType[]) {
        return answers.reduce((maxLength, currentAnswer) => {
            if (maxLength < String(currentAnswer.value)?.length) {
                return String(currentAnswer.value)?.length;
            }
            return maxLength;
        }, Number.NEGATIVE_INFINITY);
    },
    getSizeOfColumnAnswer(answers?: AnswerType[]) {
        if (answers === undefined) return 3;
        const maxLength = examUltis.getMaxLengthOfAnswer(answers);
        if (maxLength > 60) {
            return 12;
        } else if (maxLength > 34) {
            return 6;
        } else if (answers.length % 3 === 0) {
            return 4;
        } else if (answers.length % 5 === 0) {
            if (maxLength <= 7) {
                return 2.4;
            } else return 4;
        } else return 3;
    },
};

export default examUltis;
