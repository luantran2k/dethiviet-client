import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { questionSeletor } from "../../redux/selectors/examSeletors";
import MultiSelectAnswer from "../Answer/MultiSelect";
import OrderList from "../OrderList";
import IMultiSelectQuestion from "./interfaces/IMultiSelect";
import QuestionLayout from "./QuestionLayout";

export interface IMultiSelectQuestionProps {
    questionId: number;
    partId: number;
}

export const MultiSelectQuestion = React.memo(
    (props: IMultiSelectQuestionProps) => {
        const { questionId, partId } = props;
        const dispatch = useAppDispatch();
        const question: IMultiSelectQuestion | undefined = useAppSelector(
            (state) => questionSeletor(state, { questionId, partId })
        );

        if (question === undefined) {
            return <></>;
        }

        return (
            <QuestionLayout question={question} partId={partId}>
                <OrderList variant="upper-alpha">
                    {question?.answers
                        ?.map((answer) => answer.id)
                        ?.map((answerId, index) => (
                            <MultiSelectAnswer
                                partId={partId}
                                questionId={questionId}
                                answerId={answerId}
                                key={answerId}
                            />
                        ))}
                </OrderList>
            </QuestionLayout>
        );
    }
);
