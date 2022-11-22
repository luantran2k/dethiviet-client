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
import request from "../../Utils/request";
import UpdateExamModal from "../Exam/modal/update";
import AppModal from "../Modal";
import PopupMenu from "../PopupMenu";
import IQuestion from "../Question/interfaces/IQuestion";
import { MultipleChoiceQuestion } from "../Question/MultipleChoiceQs";
import { MultiSelectQuestion } from "../Question/MultiSelect";
import UpdatePartModal from "./Modal/update";
import styles from "./style.module.scss";
export interface IPartProps {
    partId: number;
}

const renderQuestion = (
    questionType: string,
    questionId: number,
    partId: number
) => {
    switch (questionType) {
        case QuestionTypeDatas.MultitpleChoice.value: {
            return (
                <MultipleChoiceQuestion
                    key={questionId}
                    questionId={questionId}
                    partId={partId}
                />
            );
        }
        case QuestionTypeDatas.MultiSelect.value: {
            return (
                <MultiSelectQuestion
                    key={questionId}
                    questionId={questionId}
                    partId={partId}
                />
            );
        }
        default: {
            return undefined;
        }
    }
};

export const Part = React.memo((props: IPartProps) => {
    const { partId } = props;
    const dispatch = useAppDispatch();
    const part = useAppSelector((state) => partSeletor(state, partId));
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
                            <AppModal
                                trigger={
                                    <MenuItem>
                                        <Edit />
                                    </MenuItem>
                                }
                            >
                                <UpdatePartModal partId={partId} />
                            </AppModal>
                            <MenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                        confirm(
                                            "Bạn có chắc chắn muốn xoá phần này không"
                                        )
                                    )
                                        request
                                            .delete("parts/" + partId)
                                            .then((res) => {
                                                if (res) {
                                                    dispatch(
                                                        deletePart(partId)
                                                    );
                                                } else {
                                                    alert(
                                                        "Xoá phần không thành công"
                                                    );
                                                }
                                            });
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
                        renderQuestion(part.type, question.id, partId)
                    )}
                </ol>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        title="Thêm câu hỏi mới"
                        variant="contained"
                        onClick={async () => {
                            const question = await request.post<IQuestion>(
                                "questions",
                                {
                                    partId,
                                    numberOfAnswers: part.numberOfAnswers,
                                }
                            );
                            dispatch(createNewQuestion(question));
                        }}
                    >
                        <Add />
                    </Button>
                </CardActions>
            </AccordionDetails>
        </details>
    );
});
