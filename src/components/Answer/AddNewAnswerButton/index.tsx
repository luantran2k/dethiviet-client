import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useAppDispatch } from "../../../app/hooks";
import { createNewAnswer } from "../../../redux/slices/examSlice";
import request from "../../../Utils/request";
import IQuestion from "../../Question/interfaces/IQuestion";
import IAnswer from "../interfaces/IAnswer";
import styles from "./style.module.scss";

export interface IAddNewAnswerButtonProps {
    question: IQuestion;
    partId: number;
    hasDocument?: boolean;
    type?: "multipleChoiceAs" | "multiSlelectAs";
}

export default function AddNewAnswerButton(props: IAddNewAnswerButtonProps) {
    const { question, partId, hasDocument, type = "multipleChoiceAs" } = props;
    const dispatch = useAppDispatch();

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
