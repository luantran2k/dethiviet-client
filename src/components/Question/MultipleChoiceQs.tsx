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
    questionClientId: number;
    partClientId: number;
}

export const MultipleChoiceQuestion = React.memo((props: IQuestionProps) => {
    const { questionClientId, partClientId } = props;
    const dispatch = useAppDispatch();
    const question = useAppSelector((state) =>
        questionSeletor(state, { questionClientId, partClientId })
    );

    if (question === undefined) {
        return <></>;
    }
    return (
        <li>
            <CardActions style={{ justifyContent: "center" }}>
                <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                    <FormLabel
                        id={`${partClientId}/${questionClientId}`}
                        sx={{ width: "100%" }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center">
                            <TextField
                                key={questionClientId}
                                defaultValue={question.title}
                                multiline
                                maxRows={4}
                                placeholder="Nhập câu hỏi"
                                onChange={(e) => {
                                    if (e.target.value !== question.title)
                                        dispatch(
                                            updateQuestionTitle({
                                                partClientId,
                                                questionClientId,
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
                                            console.log(question.clientId);
                                        }}
                                    >
                                        <Edit />
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            dispatch(
                                                deleteQuestion({
                                                    partClientId,
                                                    questionClientId:
                                                        question.clientId,
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
                        name={`${partClientId}/${questionClientId}}`}
                        onChange={(e) => {
                            dispatch(
                                updateCorrectAnswer({
                                    partClientId,
                                    questionClientId,
                                    answerClientId: Number(e.target.value),
                                })
                            );
                        }}
                    >
                        <OrderList variant="upper-alpha">
                            {question?.answers
                                ?.map((answer) => answer.clientId)
                                ?.map((answerClientId, index) => (
                                    <MultipleChoiceAnswer
                                        partClientId={partClientId}
                                        questionClientId={questionClientId}
                                        answerClientId={answerClientId}
                                        key={`${partClientId}/${questionClientId}/${answerClientId}`}
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
                    dispatch(
                        createNewAnswer({ partClientId, questionClientId })
                    );
                }}
            >
                <Add />
            </Button>
        </li>
    );
});
