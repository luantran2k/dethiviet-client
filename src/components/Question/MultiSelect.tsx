import { Add, Delete, Edit } from "@mui/icons-material";
import {
    Button,
    CardActions,
    FormControl,
    FormLabel,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { questionSeletor } from "../../redux/selectors/examSeletors";
import {
    createNewAnswer,
    deleteQuestion,
    updateQuestionTitle,
} from "../../redux/slices/examSlice";
import MultiSelectAnswer from "../Answer/MultiSelect";
import OrderList from "../OrderList";
import PopupMenu from "../PopupMenu";
import IMultiSelectQuestion from "./interfaces/IMultiSelect";

export interface IMultiSelectQuestionProps {
    questionClientId: number;
    partClientId: number;
}

export const MultiSelectQuestion = React.memo(
    (props: IMultiSelectQuestionProps) => {
        const { questionClientId, partClientId } = props;
        const dispatch = useAppDispatch();
        const question: IMultiSelectQuestion | undefined = useAppSelector(
            (state) =>
                questionSeletor(state, { questionClientId, partClientId })
        );

        if (question === undefined) {
            return <></>;
        }

        return (
            <li style={{ marginBottom: "1.6rem" }}>
                <CardActions style={{ justifyContent: "center" }}>
                    <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
                        <FormLabel
                            id={`${partClientId}/${questionClientId}`}
                            sx={{ width: "100%" }}
                        >
                            <Stack
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
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

                        <OrderList variant="upper-alpha">
                            {question?.answers
                                ?.map((answer) => answer.clientId)
                                ?.map((answerClientId, index) => (
                                    <MultiSelectAnswer
                                        partClientId={partClientId}
                                        questionClientId={questionClientId}
                                        answerClientId={answerClientId}
                                        key={answerClientId}
                                    />
                                ))}
                        </OrderList>
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
    }
);
