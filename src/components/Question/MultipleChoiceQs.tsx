import { Add, Delete, Edit } from "@mui/icons-material";
import {
    Button,
    CardActions,
    FormControl,
    FormLabel,
    MenuItem,
    RadioGroup,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { questionSeletor } from "../../redux/selectors/examSeletors";
import {
    createNewAnswer,
    deleteQuestion,
    updateCorrectAnswer,
    updateQuestionTitle,
} from "../../redux/slices/examSlice";
import request from "../../Utils/request";
import IAnswer from "../Answer/interfaces/IAnswer";
import MultipleChoiceAnswer from "../Answer/MultipleChoice";
import OrderList from "../OrderList";
import PopupMenu from "../PopupMenu";
import IMultipleChoiceQuestion from "./interfaces/IMultipleChoice";
import IQuestion from "./interfaces/IQuestion";

export interface IQuestionProps {
    questionId: number;
    partId: number;
}

export const MultipleChoiceQuestion = React.memo((props: IQuestionProps) => {
    const { questionId, partId } = props;
    const dispatch = useAppDispatch();
    const question: IMultipleChoiceQuestion = useAppSelector((state) =>
        questionSeletor(state, { questionId, partId })
    );

    if (question === undefined) {
        return <></>;
    }
    return (
        <li>
            <CardActions style={{ justifyContent: "center" }}>
                <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                    <FormLabel
                        id={`${partId}/${questionId}`}
                        sx={{ width: "100%" }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField
                                key={questionId}
                                defaultValue={question.title}
                                multiline
                                maxRows={4}
                                placeholder="Nhập câu hỏi"
                                onChange={(e) => {
                                    if (e.target.value !== question.title)
                                        dispatch(
                                            updateQuestionTitle({
                                                partId,
                                                questionId,
                                                value: e.target.value,
                                            })
                                        );
                                }}
                                onBlur={(e) => {
                                    request.patch("questions/" + question.id, {
                                        title: question.title,
                                    });
                                }}
                                variant="outlined"
                                sx={{ scrollbarWidth: 0 }}
                                fullWidth
                            />
                            <PopupMenu>
                                <Stack direction="row">
                                    <MenuItem
                                        onClick={() => {
                                            console.log(question.id);
                                        }}
                                    >
                                        <Edit />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={async () => {
                                            const res = await request.delete(
                                                "questions/" + question.id
                                            );
                                            if (res)
                                                dispatch(
                                                    deleteQuestion({
                                                        partId,
                                                        questionId: question.id,
                                                    })
                                                );
                                        }}
                                    >
                                        <Delete />
                                    </MenuItem>
                                </Stack>
                            </PopupMenu>
                        </Stack>
                    </FormLabel>

                    <RadioGroup
                        name={`${partId}/${questionId}}`}
                        onChange={async (e) => {
                            const oldAnswer: IAnswer | undefined =
                                question.answers?.find(
                                    (answer) => answer.isTrue === true
                                );
                            if (oldAnswer) {
                                const updatedAnswers = await request.patch(
                                    "answers",
                                    [
                                        { id: oldAnswer.id, isTrue: false },
                                        {
                                            id: Number(e.target.value),
                                            isTrue: true,
                                        },
                                    ]
                                );
                                if (updatedAnswers) {
                                    dispatch(
                                        updateCorrectAnswer({
                                            partId,
                                            questionId,
                                            answerId: Number(e.target.value),
                                        })
                                    );
                                }
                            } else {
                                const updatedAnswer =
                                    await request.patch<IAnswer>(
                                        "answers/" + e.target.value,
                                        { isTrue: true }
                                    );
                                if (updatedAnswer) {
                                    dispatch(
                                        updateCorrectAnswer({
                                            partId,
                                            questionId,
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
                                    <MultipleChoiceAnswer
                                        partId={partId}
                                        questionId={questionId}
                                        answerId={answerId}
                                        key={`${partId}/${questionId}/${answerId}`}
                                    />
                                ))}
                        </OrderList>
                    </RadioGroup>
                </FormControl>
            </CardActions>
            <Button
                variant="outlined"
                title="Thêm câu trả lời mới"
                sx={{ marginTop: "-1rem", marginLeft: "0.5rem" }}
                onClick={async () => {
                    const answer = await request.post<IAnswer>("answers", {
                        questionId,
                    });
                    dispatch(createNewAnswer({ partId, questionId, answer }));
                }}
            >
                <Add />
            </Button>
        </li>
    );
});
