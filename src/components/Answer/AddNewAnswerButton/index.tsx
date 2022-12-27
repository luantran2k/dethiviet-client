import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createNewAnswer } from "../../../redux/slices/examSlice";
import request from "../../../Utils/request";
import IQuestion from "../../Question/interfaces/IQuestion";
import IAnswer from "../interfaces/IAnswer";
import styles from "./styles.module.scss";

export interface IAddNewAnswerButtonProps {
    question: IQuestion;
    partId: number;
    hasDocument?: boolean;
    type?: "multipleChoiceAs" | "multiSlelectAs";
}

export default function AddNewAnswerButton(props: IAddNewAnswerButtonProps) {
    const { question, partId, hasDocument, type = "multipleChoiceAs" } = props;
    const dispatch = useAppDispatch();
    const isOriginal = useAppSelector((state) => state.exam.isOriginal);

    const handleClick = async () => {
        const answer = await request.post<IAnswer>("answers", {
            questionId: question.id,
        });
        dispatch(
            createNewAnswer({
                partId,
                questionId: question.id,
                answer,
            })
        );
    };

    if (!isOriginal) {
        return <></>;
    }

    return (
        <>
            {hasDocument ? (
                <Add
                    className={`${styles.addAnswerDocument} ${styles[type]}`}
                    onClick={handleClick}
                />
            ) : (
                <Button
                    variant="outlined"
                    title="Thêm câu trả lời mới"
                    sx={{ marginTop: "-1rem", marginLeft: "0.5rem" }}
                    onClick={handleClick}
                >
                    <Add />
                </Button>
            )}
        </>
    );
}
