import { Add, Delete, Edit } from "@mui/icons-material";
import {
    AccordionDetails,
    Button,
    CardActions,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import QuestionTypeDatas from "../../const/QuestionTypes";
import { partSeletor } from "../../redux/selectors/examSeletors";
import { createNewQuestion, deletePart } from "../../redux/slices/examSlice";
import PopupMenu from "../PopupMenu";
import { MultipleChoiceQuestion } from "../Question/MultipleChoiceQs";
import { MultiSelectQuestion } from "../Question/MultiSelect";
import styles from "./style.module.scss";
export interface IPartProps {
    partClientId: number;
}

const renderQuestion = (
    questionType: string,
    questionClientId: number,
    partClientId: number
) => {
    switch (questionType) {
        case QuestionTypeDatas.MultitpleChoice.value: {
            return (
                <MultipleChoiceQuestion
                    key={questionClientId}
                    questionClientId={questionClientId}
                    partClientId={partClientId}
                />
            );
        }
        case QuestionTypeDatas.MultiSelect.value: {
            return (
                <MultiSelectQuestion
                    key={questionClientId}
                    questionClientId={questionClientId}
                    partClientId={partClientId}
                />
            );
        }
        default: {
            return undefined;
        }
    }
};

export const Part = React.memo((props: IPartProps) => {
    const { partClientId } = props;
    const dispatch = useAppDispatch();
    const part = useAppSelector((state) => partSeletor(state, partClientId));
    if (part === undefined) {
        return <></>;
    }
    return (
        <details className={styles.part}>
            <summary className={styles.part_summary}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ width: "100%" }}
                >
                    <Typography variant="h6">{part.title}</Typography>
                    <PopupMenu>
                        <Stack direction="row">
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    alert("edit");
                                }}
                            >
                                <Edit />
                            </MenuItem>
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deletePart(partClientId));
                                }}
                            >
                                <Delete />
                            </MenuItem>
                        </Stack>
                    </PopupMenu>
                </Stack>
            </summary>
            <AccordionDetails>
                <ol style={{ paddingLeft: "3rem" }}>
                    {part.questions?.map((question) =>
                        renderQuestion(
                            part.type,
                            question.clientId,
                            partClientId
                        )
                    )}
                </ol>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        title="Thêm câu hỏi mới"
                        variant="contained"
                        onClick={() => {
                            dispatch(
                                createNewQuestion({
                                    partClientId: part.clientId,
                                })
                            );
                        }}
                    >
                        <Add />
                    </Button>
                </CardActions>
            </AccordionDetails>
        </details>
    );
});
