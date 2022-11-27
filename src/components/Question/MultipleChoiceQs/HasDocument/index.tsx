import { Add } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { useAppDispatch } from "../../../../app/hooks";
import AddNewAnswerButton from "../../../Answer/AddNewAnswerButton";
import DeleteAnswerButton from "../../../Answer/DeleteAnswerButton";
import MultipleChoiceAnswerHasDocument from "../../../Answer/MultipleChoice/HasDocument";
import { QuestionType } from "../../interfaces/IQuestion";
import QuestionLayout from "../../QuestionLayout";
import styles from "./style.module.scss";

export interface IMultipleChoiceQsHasDocumentProps {
    question: QuestionType;
    partId: number;
}

export default function MultipleChoiceQsHasDocument(
    props: IMultipleChoiceQsHasDocumentProps
) {
    const dispatch = useAppDispatch();
    const { question, partId } = props;
    return (
        <QuestionLayout question={question} partId={partId}>
            <ul className={styles.answerList}>
                {question.answers?.map((answer, index) => (
                    <MultipleChoiceAnswerHasDocument
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
                    />
                </li>
                {question.answers?.at(-1)?.id && (
                    <li>
                        <DeleteAnswerButton
                            partId={partId}
                            questionId={question.id}
                            answerId={question.answers?.at(-1)?.id as number}
                        />
                    </li>
                )}
            </ul>
        </QuestionLayout>
    );
}
