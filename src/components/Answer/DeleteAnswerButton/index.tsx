import {
    Add,
    Cancel,
    CancelOutlined,
    CancelRounded,
    Delete,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteAnswer } from "../../../redux/slices/examSlice";
import request from "../../../Utils/request";
import styles from "./styles.module.scss";

export interface IDeleteAnswerButtonProps {
    partId: number;
    questionId: number;
    answerId: number;
    type?: "multipleChoiceAs" | "multiSlelectAs";
}

export default function DeleteAnswerButton(props: IDeleteAnswerButtonProps) {
    const { partId, questionId, answerId, type = "multipleChoiceAs" } = props;
    const dispatch = useAppDispatch();
    const isOriginal = useAppSelector((state) => state.exam.isOriginal);

    const handleClick = async () => {
        const res = await request.delete("answers/" + answerId);
        if (res)
            dispatch(
                deleteAnswer({
                    partId,
                    questionId,
                    answerId,
                })
            );
    };

    if (!isOriginal) {
        return <></>;
    }

    return (
        <Box
            className={`${styles.deleteAnswerButton} ${styles[type]}`}
            onClick={handleClick}
        >
            <Add
                sx={{
                    rotate: "45deg",
                    scale: "1.4",
                }}
            />
        </Box>
    );
}
