import { Add, AudioFile, Delete, Edit } from "@mui/icons-material";
import {
    AccordionDetails,
    Button,
    CardActions,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import React, { useId } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import QuestionTypeDatas from "../../const/QuestionTypes";
import { partSeletor } from "../../redux/selectors/examSeletors";
import {
    createNewQuestion,
    deletePart,
    updatePartField,
    updateQuestionField,
} from "../../redux/slices/examSlice";
import request from "../../Utils/request";
import DeleteButton from "../Button/DeleteButton";
import UpdateExamModal from "../Exam/modal/update";
import AppModal from "../Modal";
import PopupMenu from "../PopupMenu";
import IQuestion from "../Question/interfaces/IQuestion";
import { MultipleChoiceQuestion } from "../Question/MultipleChoiceQs";
import MultiSelectQuestion from "../Question/MultiSelect";
import UpdatePartModal from "./Modal/update";
import styles from "./style.module.scss";
export interface IPartProps {
    partId: number;
}

const renderQuestion = (
    questionType: string,
    questionId: number,
    partId: number,
    hasDocument: boolean = false
) => {
    switch (questionType) {
        case QuestionTypeDatas.MultitpleChoice.value: {
            return (
                <MultipleChoiceQuestion
                    key={questionId}
                    questionId={questionId}
                    partId={partId}
                    hasDocument={hasDocument}
                />
            );
        }
        case QuestionTypeDatas.MultiSelect.value: {
            return (
                <MultiSelectQuestion
                    key={questionId}
                    questionId={questionId}
                    partId={partId}
                    hasDocument={hasDocument}
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
    const audioId = useId();
    const dispatch = useAppDispatch();
    const part = useAppSelector((state) => partSeletor(state, partId));
    const documentUrl = useAppSelector((state) => state.exam.documentUrl);
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
                            <label
                                htmlFor={audioId}
                                style={{ display: "flex", cursor: "pointer" }}
                            >
                                <MenuItem title="Thêm âm thanh">
                                    <AudioFile />
                                </MenuItem>
                            </label>
                            <input
                                type="file"
                                id={audioId}
                                accept="audio/*"
                                style={{
                                    visibility: "hidden",
                                    position: "absolute",
                                    width: 0,
                                    height: 0,
                                }}
                                onChange={async (e) => {
                                    if (e.target.files?.[0]) {
                                        const audioFile = e.target.files[0];
                                        dispatch(
                                            updatePartField({
                                                partId,
                                                field: "partAudio",
                                                value: "loading",
                                            })
                                        );
                                        const data = new FormData();
                                        data.append(
                                            "partAudio",
                                            audioFile,
                                            audioFile.name
                                        );
                                        const res = await request.patch<{
                                            url: string;
                                        }>(`parts/${part.id}/audio`, data, {
                                            headers: {
                                                "Content-Type":
                                                    "multipart/form-data",
                                            },
                                        });
                                        dispatch(
                                            updatePartField({
                                                partId,
                                                field: "partAudio",
                                                value: res.url,
                                            })
                                        );
                                    }
                                }}
                            />
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

            {part.partAudio !== null &&
                (part.partAudio === "loading" ? (
                    <Typography my={1}>Đang xử lý</Typography>
                ) : (
                    <Stack direction="row">
                        <audio
                            src={part.partAudio}
                            controls
                            style={{ flexGrow: 1, margin: "1rem 0" }}
                        />
                        <DeleteButton
                            onClick={async () => {
                                dispatch(
                                    updatePartField({
                                        partId,
                                        field: "partAudio",
                                        value: "loading",
                                    })
                                );
                                const res = await request.delete(
                                    `parts/${part.id}/audio`
                                );
                                if (res) {
                                    dispatch(
                                        updatePartField({
                                            partId,
                                            field: "partAudio",
                                            value: null,
                                        })
                                    );
                                }
                            }}
                        />
                    </Stack>
                ))}
            <ol style={{ paddingLeft: "3rem" }}>
                {part.questions?.map((question) =>
                    renderQuestion(
                        part.type,
                        question.id,
                        partId,
                        Boolean(documentUrl)
                    )
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
        </details>
    );
});
