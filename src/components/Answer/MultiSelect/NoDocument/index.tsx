import {
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
import request from "../../../../Utils/request";
import DeleteButton from "../../../Button/DeleteButton";
import IMultiSelectAnswer from "../../interfaces/IMultiSelect";

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

        const handleCheck = async (
            partId: number,
            questionId: number,
            answer: IMultiSelectAnswer
        ) => {
            const res = await request.patch("answers/" + answer.id, {
                isTrue: !answer.isTrue,
            });
            if (res)
                dispatch(
                    updateCorrectAnswer({
                        partId,
                        questionId,
                        answerId: answer.id,
                    })
                );
        };

        const handleChangeAnswer = (
            e: React.FocusEvent<
                HTMLInputElement | HTMLTextAreaElement,
                Element
            >,
            partId: number,
            questionId: number,
            answer: IMultiSelectAnswer
        ) => {
            if (e.target.value !== answer.value)
                dispatch(
                    updateAnswer({
                        partId,
                        questionId,
                        answerId: answer.id,
                        value: e.target.value,
                    })
                );
            request.patch("answers/" + answer.id, {
                value: e.target.value,
            });
        };

        const handleDeleteAnswer = async () => {
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
                                onChange={() =>
                                    handleCheck(partId, questionId, answer)
                                }
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
                                handleChangeAnswer(
                                    e,
                                    partId,
                                    questionId,
                                    answer
                                );
                            }}
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />
                    ) : (
                        <Typography>{answer.value}</Typography>
                    )}
                </li>
                {isOriginal && <DeleteButton onClick={handleDeleteAnswer} />}
            </Stack>
        );
    }
);

export default MultiSelectAnswerNoDocument;
