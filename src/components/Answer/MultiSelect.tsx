import {
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { answerSeletor } from "../../redux/selectors/examSeletors";
import {
    deleteAnswer,
    updateAnswer,
    updateCorrectAnswer,
} from "../../redux/slices/examSlice";
import { Delete } from "@mui/icons-material";

export interface IMultiSelectAnswerProps {
    partId: number;
    questionId: number;
    answerId: number;
}

const MultiSelectAnswer = React.memo((props: IMultiSelectAnswerProps) => {
    const { partId, questionId, answerId } = props;
    const dispatch = useAppDispatch();
    const answer = useAppSelector((state) =>
        answerSeletor(state, { partId, questionId, answerId })
    );
    if (answer === undefined) {
        return <></>;
    }
    return (
        <Stack direction="row" alignItems="center">
            <FormControlLabel
                value={answer.id}
                checked={answer.isTrue}
                control={
                    <Checkbox
                        onChange={() => {
                            dispatch(
                                updateCorrectAnswer({
                                    partId,
                                    questionId,
                                    answerId: answerId,
                                })
                            );
                        }}
                    />
                }
                label={""}
                sx={{ margin: 0 }}
            />
            <li style={{ flexGrow: 1 }}>
                <TextField
                    variant="standard"
                    defaultValue={answer.value}
                    fullWidth
                    placeholder="Nhập đáp án"
                    onChange={(e) => {
                        if (e.target.value !== answer.value)
                            dispatch(
                                updateAnswer({
                                    partId,
                                    questionId,
                                    answerId,
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
                            partId,
                            questionId,
                            answerId,
                        })
                    );
                }}
            >
                <Delete />
            </Button>
        </Stack>
    );
});

export default MultiSelectAnswer;
