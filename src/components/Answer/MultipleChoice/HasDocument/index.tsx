import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { answerSeletor } from "../../../../redux/selectors/examSeletors";
import { updateCorrectAnswer } from "../../../../redux/slices/examSlice";
import request from "../../../../Utils/request";
import IMultipleChoiceQuestion from "../../../Question/interfaces/IMultipleChoice";
import IAnswer, { AnswerType } from "../../interfaces/IAnswer";
import styles from "./style.module.scss";

export interface IMultipleChoiceAnswerHasDocumentProps {
    partId: number;
    question: IMultipleChoiceQuestion;
    answerId: number;
    value: string;
}

const MultipleChoiceAnswerHasDocument = memo(
    (props: IMultipleChoiceAnswerHasDocumentProps) => {
        const { partId, question, answerId, value } = props;
        const dispatch = useAppDispatch();
        const answer = useAppSelector((state) =>
            answerSeletor(state, { partId, questionId: question.id, answerId })
        );
        if (answer === undefined) {
            return <></>;
        }
        return (
            <li
                className={`${styles.answer} ${answer.isTrue && styles.true}`}
                onClick={async (e) => {
                    const oldAnswer: IAnswer | undefined =
                        question.answers?.find(
                            (answer) => answer.isTrue === true
                        );
                    if (oldAnswer) {
                        const updatedAnswers = await request.patch("answers", [
                            { id: oldAnswer.id, isTrue: false },
                            {
                                id: answerId,
                                isTrue: true,
                            },
                        ]);
                        if (updatedAnswers) {
                            dispatch(
                                updateCorrectAnswer({
                                    partId,
                                    questionId: question.id,
                                    answerId,
                                })
                            );
                        }
                    } else {
                        const updatedAnswer = await request.patch<IAnswer>(
                            "answers/" + answerId,
                            { isTrue: true }
                        );
                        if (updatedAnswer) {
                            dispatch(
                                updateCorrectAnswer({
                                    partId,
                                    questionId: question.id,
                                    answerId: updatedAnswer.id,
                                })
                            );
                        }
                    }
                }}
            >
                {value}
            </li>
        );
    }
);
export default MultipleChoiceAnswerHasDocument;
