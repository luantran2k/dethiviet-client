import { Delete } from "@mui/icons-material";
import {
    Button,
    FormControlLabel,
    Radio,
    Stack,
    TextField,
} from "@mui/material";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { answerSeletor } from "../../redux/selectors/examSeletors";
import { deleteAnswer, updateAnswer } from "../../redux/slices/examSlice";

export interface IAnswerProps {
    partClientId: number;
    questionClientId: number;
    answerClientId: number;
}

export const MultipleChoiceAnswer = React.memo((props: IAnswerProps) => {
    const { partClientId, questionClientId, answerClientId } = props;
    const dispatch = useAppDispatch();
    const answer = useAppSelector((state) =>
        answerSeletor(state, { partClientId, questionClientId, answerClientId })
    );
    if (answer === undefined) {
        return <></>;
    }

    return (
        <Stack direction="row" alignItems="center">
            <FormControlLabel
                value={answer.clientId}
                checked={answer.isTrue}
                control={<Radio />}
                label={""}
                sx={{ margin: 0 }}
            />
            <li style={{ flexGrow: 1 }}>
                <TextField
                    fullWidth
                    variant="standard"
                    defaultValue={answer.value}
                    placeholder="Nhập đáp án"
                    onChange={(e) => {
                        if (e.target.value !== answer.value)
                            dispatch(
                                updateAnswer({
                                    partClientId,
                                    questionClientId,
                                    answerClientId,
                                    value: e.target.value,
                                })
                            );
                    }}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
            </li>
            <Button
                sx={{
                    opacity: 0.2,
                    "&:hover": {
                        opacity: 1,
                    },
                    transition: "all 0.6s",
                }}
                onClick={() => {
                    dispatch(
                        deleteAnswer({
                            partClientId,
                            questionClientId,
                            answerClientId,
                        })
                    );
                }}
            >
                <Delete />
            </Button>
        </Stack>
    );
});

export default MultipleChoiceAnswer;
