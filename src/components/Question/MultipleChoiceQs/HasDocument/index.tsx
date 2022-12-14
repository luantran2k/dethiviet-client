import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import AddNewAnswerButton from "../../../Answer/AddNewAnswerButton";
import DeleteAnswerButton from "../../../Answer/DeleteAnswerButton";
import MultipleChoiceAnswerHasDocument from "../../../Answer/MultipleChoice/HasDocument";
import { QuestionType } from "../../interfaces/IQuestion";
import QuestionLayout from "../../QuestionLayout";
import styles from "./styles.module.scss";

export interface IMultipleChoiceQsHasDocumentProps {
    question: QuestionType;
    partId: number;
}

export default function MultipleChoiceQsHasDocument(
    props: IMultipleChoiceQsHasDocumentProps
) {
    const isPractice = useAppSelector((state) => state.exam.isPractice);
    const { question, partId } = props;
    return (
        <QuestionLayout question={question} partId={partId}>
            <ul className={styles.answerList}>
                {question.answers?.map((answer, index) => (
                    <MultipleChoiceAnswerHasDocument
                        key={answer.id}
                        partId={partId}
                        question={question}
                        answerId={answer.id}
                        value={String.fromCharCode(index + 65)}
                    />
                ))}
                {!isPractice && (
                    <li>
                        <AddNewAnswerButton
                            question={question}
                            partId={partId}
                            hasDocument={true}
                        />
                    </li>
                )}
                {question.answers?.at(-1)?.id && !isPractice && (
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
