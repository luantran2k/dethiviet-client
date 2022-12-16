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
    answer?: AnswerType;
}

const MultipleChoiceAnswerHasDocument = memo(
    (props: IMultipleChoiceAnswerHasDocumentProps) => {
        const { partId, question, answerId, value, answer: answerProp } = props;
        const sendRequest = !useAppSelector((state) => state.exam.isPractice);
        const dispatch = useAppDispatch();
        const answer =
            answerProp ||
            useAppSelector((state) =>
                answerSeletor(state, {
                    partId,
                    questionId: question.id,
                    answerId,
                })
            );

        if (answer === undefined) {
            return <></>;
        }
        return (
            <li
                key={answer.id}
                className={`${styles.answer} ${answer.isTrue && styles.true}`}
                onClick={async (e) => {
                    const oldAnswer: IAnswer | undefined =
                        question.answers?.find(
                            (answer) => answer.isTrue === true
                        );
                    if (oldAnswer) {
                        if (sendRequest) {
                            request.patch("answers", [
                                { id: oldAnswer.id, isTrue: false },
                                {
                                    id: answerId,
                                    isTrue: true,
                                },
                            ]);
                        }

                        dispatch(
                            updateCorrectAnswer({
                                partId,
                                questionId: question.id,
                                answerId,
                            })
                        );
                    } else {
                        if (sendRequest) {
                            request.patch<IAnswer>("answers/" + answerId, {
                                isTrue: true,
                            });
                        }

                        dispatch(
                            updateCorrectAnswer({
                                partId,
                                questionId: question.id,
                                answerId,
                            })
                        );
                    }
                }}
            >
                {value}
            </li>
        );
    }
);
export default MultipleChoiceAnswerHasDocument;
