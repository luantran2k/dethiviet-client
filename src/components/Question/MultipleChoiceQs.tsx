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
import MultipleChoiceAnswer from "../Answer/MultipleChoice";
import OrderList from "../OrderList";
import PopupMenu from "../PopupMenu";

export interface IQuestionProps {
    questionId: number;
    partId: number;
}

export const MultipleChoiceQuestion = React.memo((props: IQuestionProps) => {
    const { questionId, partId } = props;
    const dispatch = useAppDispatch();
    const question = useAppSelector((state) =>
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
                                        onClick={() => {
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
                        onChange={(e) => {
                            dispatch(
                                updateCorrectAnswer({
                                    partId,
                                    questionId,
                                    answerId: Number(e.target.value),
                                })
                            );
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
                onClick={() => {
                    dispatch(createNewAnswer({ partId, questionId }));
                }}
            >
                <Add />
            </Button>
        </li>
    );
});
