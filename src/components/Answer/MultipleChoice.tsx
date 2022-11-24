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
import request from "../../Utils/request";
import DeleteButton from "../Button/DeleteButton";

export interface IAnswerProps {
    partId: number;
    questionId: number;
    answerId: number;
}

export const MultipleChoiceAnswer = React.memo((props: IAnswerProps) => {
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
                                    partId,
                                    questionId,
                                    answerId,
                                    value: e.target.value,
                                })
                            );
                    }}
                    onBlur={() => {
                        request.patch("answers/" + answerId, {
                            value: answer.value,
                        });
                    }}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />
            </li>
            <DeleteButton
                onClick={async () => {
                    const res = await request.delete("answers/" + answerId);
                    if (res)
                        dispatch(
                            deleteAnswer({
                                partId,
                                questionId,
                                answerId,
                            })
                        );
                }}
            />
        </Stack>
    );
});

export default MultipleChoiceAnswer;
