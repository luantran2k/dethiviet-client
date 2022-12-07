import {
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { answerSeletor } from "../../../../redux/selectors/examSeletors";
import {
    deleteAnswer,
    updateAnswer,
    updateCorrectAnswer,
} from "../../../../redux/slices/examSlice";
import { Delete } from "@mui/icons-material";
import request from "../../../../Utils/request";
import DeleteButton from "../../../Button/DeleteButton";

export interface IMultiSelectAnswerNoDocumentProps {
    partId: number;
    questionId: number;
    answerId: number;
}

const MultiSelectAnswerNoDocument = React.memo(
    (props: IMultiSelectAnswerNoDocumentProps) => {
        const { partId, questionId, answerId } = props;
        const dispatch = useAppDispatch();
        const isOriginal = useAppSelector((state) => state.exam.isOriginal);
        const answer = useAppSelector((state) =>
            answerSeletor(state, { partId, questionId, answerId })
        );
        if (answer === undefined) {
            return <></>;
        }
        return (
            <Stack direction="row" alignItems="center">
                {isOriginal ? (
                    <FormControlLabel
                        value={answer.id}
                        checked={answer.isTrue}
                        control={
                            <Checkbox
                                onChange={async () => {
                                    const res = await request.patch(
                                        "answers/" + answer.id,
                                        {
                                            isTrue: !answer.isTrue,
                                        }
                                    );
                                    if (res)
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
                ) : (
                    <Checkbox checked={answer.isTrue} />
                )}
                <li style={{ flexGrow: 1 }}>
                    {isOriginal ? (
                        <TextField
                            variant="standard"
                            defaultValue={answer.value}
                            fullWidth
                            placeholder="Nhập đáp án"
                            onBlur={(e) => {
                                if (e.target.value !== answer.value)
                                    dispatch(
                                        updateAnswer({
                                            partId,
                                            questionId,
                                            answerId,
                                            value: e.target.value,
                                        })
                                    );
                                request.patch("answers/" + answerId, {
                                    value: e.target.value,
                                });
                            }}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    ) : (
                        <Typography>{answer.value}</Typography>
                    )}
                </li>
                {isOriginal && (
                    <DeleteButton
                        onClick={async () => {
                            const res = await request.delete(
                                "answers/" + answerId
                            );
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
                )}
            </Stack>
        );
    }
);

export default MultiSelectAnswerNoDocument;
