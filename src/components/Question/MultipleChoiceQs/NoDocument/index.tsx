import { RadioGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateCorrectAnswer } from "../../../../redux/slices/examSlice";
import request from "../../../../Utils/request";
import IAnswer from "../../../Answer/interfaces/IAnswer";
import MultipleChoiceAnswerNoDocument from "../../../Answer/MultipleChoice/NoDocument";
import OrderList from "../../../OrderList";
import { QuestionType } from "../../interfaces/IQuestion";
import QuestionLayout from "../../QuestionLayout";

export interface IMultipleChoiceQsNoDocumentProps {
    question: QuestionType;
    partId: number;
}

export default function MultipleChoiceQsNoDocument(
    props: IMultipleChoiceQsNoDocumentProps
) {
    const dispatch = useAppDispatch();
    const { question, partId } = props;
    const isOriginal = useAppSelector((state) => state.exam.isOriginal);
    return (
        <QuestionLayout question={question} partId={partId}>
            <RadioGroup
                name={`${partId}/${question.id}}`}
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
                                    questionId: question.id,
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
                                    questionId: question.id,
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
                            <MultipleChoiceAnswerNoDocument
                                partId={partId}
                                questionId={question.id}
                                answerId={answerId}
                                key={`${partId}/${question.id}/${answerId}`}
                            />
                        ))}
                </OrderList>
            </RadioGroup>
        </QuestionLayout>
    );
}
