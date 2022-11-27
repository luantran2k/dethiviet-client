import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { questionSeletor } from "../../../redux/selectors/examSeletors";
import MultiSelectQsHasDocument from "./HasDocument";
import MultiSelectQsNoDocument from "./NoDocument";
export interface IQuestionProps {
    questionId: number;
    partId: number;
    hasDocument: boolean;
}

const MultiSelectQuestion = React.memo((props: IQuestionProps) => {
    const { questionId, partId, hasDocument } = props;
    const question = useAppSelector((state) =>
        questionSeletor(state, { questionId, partId })
    );

    if (question === undefined) {
        return <></>;
    }
    if (hasDocument) {
        return <MultiSelectQsHasDocument question={question} partId={partId} />;
    }
    return <MultiSelectQsNoDocument question={question} partId={partId} />;
});

export default MultiSelectQuestion;
