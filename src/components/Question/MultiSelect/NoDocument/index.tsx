import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { questionSeletor } from "../../../../redux/selectors/examSeletors";
import MultiSelectAnswer from "../../../Answer/MultiSelect/NoDocument";
import OrderList from "../../../OrderList";
import IMultiSelectQuestion from "../../interfaces/IMultiSelect";
import QuestionLayout from "../../QuestionLayout";

export interface IMultiSelectQsNoDocumentProps {
    question: IMultiSelectQuestion;
    partId: number;
}

const MultiSelectQsNoDocument = React.memo(
    (props: IMultiSelectQsNoDocumentProps) => {
        const { question, partId } = props;
        const dispatch = useAppDispatch();
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
                                questionId={question.id}
                                answerId={answerId}
                                key={answerId}
                            />
                        ))}
                </OrderList>
            </QuestionLayout>
        );
    }
);

export default MultiSelectQsNoDocument;
