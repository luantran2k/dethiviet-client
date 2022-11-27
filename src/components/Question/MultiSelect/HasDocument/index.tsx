import { useAppDispatch } from "../../../../app/hooks";
import AddNewAnswerButton from "../../../Answer/AddNewAnswerButton";
import DeleteAnswerButton from "../../../Answer/DeleteAnswerButton";
import MultipleChoiceAnswerHasDocument from "../../../Answer/MultipleChoice/HasDocument";
import MultiSelectAnswerHasDocument from "../../../Answer/MultiSelect/HasDocument";
import IMultiSelectQuestion from "../../interfaces/IMultiSelect";
import QuestionLayout from "../../QuestionLayout";
import styles from "./style.module.scss";

export interface IMultiSelectQsHasDocumentProps {
    question: IMultiSelectQuestion;
    partId: number;
}

export default function MultiSelectQsHasDocument(
    props: IMultiSelectQsHasDocumentProps
) {
    const dispatch = useAppDispatch();
    const { question, partId } = props;
    return (
        <QuestionLayout question={question} partId={partId}>
            <ul className={styles.answerList}>
                {question.answers?.map((answer, index) => (
                    <MultiSelectAnswerHasDocument
                        partId={partId}
                        question={question}
                        answerId={answer.id}
                        value={String.fromCharCode(index + 65)}
                    />
                ))}
                <li>
                    <AddNewAnswerButton
                        question={question}
                        partId={partId}
                        hasDocument={true}
                        type="multiSlelectAs"
                    />
                </li>
                {question.answers?.at(-1)?.id && (
                    <li>
                        <DeleteAnswerButton
                            partId={partId}
                            questionId={question.id}
                            answerId={question.answers?.at(-1)?.id as number}
                            type="multiSlelectAs"
                        />
                    </li>
                )}
            </ul>
        </QuestionLayout>
    );
}
