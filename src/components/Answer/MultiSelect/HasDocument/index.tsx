import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { answerSeletor } from "../../../../redux/selectors/examSeletors";
import { updateCorrectAnswer } from "../../../../redux/slices/examSlice";
import request from "../../../../Utils/request";
import IMultiSelectQuestion from "../../../Question/interfaces/IMultiSelect";
import IAnswer, { AnswerType } from "../../interfaces/IAnswer";
import IMultiSelectAnswer from "../../interfaces/IMultiSelect";
import styles from "./style.module.scss";

export interface IMultiSelectAnswerHasDocumentProps {
    partId: number;
    question: IMultiSelectQuestion;
    answerId: number;
    value: string;
    answer?: AnswerType;
}

const MultiSelectAnswerHasDocument = memo(
    (props: IMultiSelectAnswerHasDocumentProps) => {
        const { partId, question, answerId, value, answer: answerProp } = props;
        const dispatch = useAppDispatch();
        const sendRequest = !useAppSelector((state) => state.exam.isPractice);
        const answer: IMultiSelectAnswer | undefined =
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
                    if (sendRequest) {
                        request.patch<IAnswer>("answers/" + answerId, {
                            isTrue: !answer.isTrue,
                        });
                    }

                    dispatch(
                        updateCorrectAnswer({
                            partId,
                            questionId: question.id,
                            answerId,
                        })
                    );
                }}
            >
                {value}
            </li>
        );
    }
);

export default MultiSelectAnswerHasDocument;
