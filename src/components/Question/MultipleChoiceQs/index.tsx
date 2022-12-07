import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { questionSeletor } from "../../../redux/selectors/examSeletors";
import MultipleChoiceQsHasDocument from "./HasDocument";
import MultipleChoiceQsNoDocument from "./NoDocument";
export interface IQuestionProps {
    questionId: number;
    partId: number;
    hasDocument: boolean;
}

export const MultipleChoiceQuestion = React.memo((props: IQuestionProps) => {
    const { questionId, partId, hasDocument } = props;
    const question = useAppSelector((state) =>
        questionSeletor(state, { questionId, partId })
    );

    if (question === undefined) {
        return <></>;
    }
    if (hasDocument) {
        return (
            <MultipleChoiceQsHasDocument question={question} partId={partId} />
        );
    }
    return <MultipleChoiceQsNoDocument question={question} partId={partId} />;
});
