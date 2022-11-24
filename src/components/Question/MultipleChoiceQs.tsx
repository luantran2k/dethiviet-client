import { RadioGroup } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { questionSeletor } from "../../redux/selectors/examSeletors";
import { updateCorrectAnswer } from "../../redux/slices/examSlice";
import request from "../../Utils/request";
import IAnswer from "../Answer/interfaces/IAnswer";
import MultipleChoiceAnswer from "../Answer/MultipleChoice";
import OrderList from "../OrderList";
import QuestionLayout from "./QuestionLayout";
export interface IQuestionProps {
    questionId: number;
    partId: number;
}

export const MultipleChoiceQuestion = React.memo((props: IQuestionProps) => {
    const { questionId, partId } = props;
    const dispatch = useAppDispatch();
    const question = useAppSelector((state) =>
        questionSeletor(state, { questionId, partId })
    );

    if (question === undefined) {
        return <></>;
    }

    return (
        <QuestionLayout question={question} partId={partId}>
            <RadioGroup
                name={`${partId}/${questionId}}`}
                onChange={async (e) => {
                    const oldAnswer: IAnswer | undefined =
                        question.answers?.find(
                            (answer) => answer.isTrue === true
                        );
                    if (oldAnswer) {
                        const updatedAnswers = await request.patch("answers", [
                            { id: oldAnswer.id, isTrue: false },
                            {
                                id: Number(e.target.value),
                                isTrue: true,
                            },
                        ]);
                        if (updatedAnswers) {
                            dispatch(
                                updateCorrectAnswer({
                                    partId,
                                    questionId,
                                    answerId: Number(e.target.value),
                                })
                            );
                        }
                    } else {
                        const updatedAnswer = await request.patch<IAnswer>(
                            "answers/" + e.target.value,
                            { isTrue: true }
                        );
                        if (updatedAnswer) {
                            dispatch(
                                updateCorrectAnswer({
                                    partId,
                                    questionId,
                                    answerId: updatedAnswer.id,
                                })
                            );
                        }
                    }
                }}
            >
                <OrderList variant="upper-alpha">
                    {question?.answers
                        ?.map((answer) => answer.id)
                        ?.map((answerId, index) => (
                            <MultipleChoiceAnswer
                                partId={partId}
                                questionId={questionId}
                                answerId={answerId}
                                key={`${partId}/${questionId}/${answerId}`}
                            />
                        ))}
                </OrderList>
            </RadioGroup>
        </QuestionLayout>
    );
});
