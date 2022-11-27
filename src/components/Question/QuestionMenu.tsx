import {
    Delete,
    Image,
    AudioFile,
    Description,
    HistoryEdu,
} from "@mui/icons-material";
import { MenuItem, Stack } from "@mui/material";
import { red, teal } from "@mui/material/colors";
import { useId } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
    updateQuestionField,
    deleteQuestion,
} from "../../redux/slices/examSlice";
import request from "../../Utils/request";
import PopupMenu from "../PopupMenu";
import IQuestion from "./interfaces/IQuestion";

export interface IQuestionMenuProps {
    question: IQuestion;
    partId: number;
    isDocumentExam: boolean;
}

export default function QuestionMenu(props: IQuestionMenuProps) {
    const { question, partId, isDocumentExam } = props;
    const dispatch = useAppDispatch();
    const audioId = useId();
    const imageId = useId();

    return (
        <PopupMenu
            popOverProps={{
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "right",
                },
            }}
        >
            <Stack direction="row">
                {!isDocumentExam && (
                    <MenuItem
                        title="Thêm mô tả"
                        onClick={() => {
                            dispatch(
                                updateQuestionField({
                                    partId,
                                    questionId: question.id,
                                    field: "description",
                                    value: "",
                                })
                            );
                        }}
                    >
                        <Description />
                    </MenuItem>
                )}
                {!isDocumentExam && (
                    <MenuItem
                        title="Thêm giải thích"
                        onClick={() => {
                            dispatch(
                                updateQuestionField({
                                    partId,
                                    questionId: question.id,
                                    field: "explain",
                                    value: "",
                                })
                            );
                        }}
                    >
                        <HistoryEdu />
                    </MenuItem>
                )}

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
                                updateQuestionField({
                                    partId,
                                    questionId: question.id,
                                    field: "questionAudio",
                                    value: "loading",
                                })
                            );
                            const data = new FormData();
                            data.append(
                                "questionAudio",
                                audioFile,
                                audioFile.name
                            );
                            const res = await request.patch<{
                                url: string;
                            }>(`questions/${question.id}/audio`, data, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            });
                            dispatch(
                                updateQuestionField({
                                    partId,
                                    questionId: question.id,
                                    field: "questionAudio",
                                    value: res.url,
                                })
                            );
                        }
                    }}
                />

                {!isDocumentExam && (
                    <>
                        <label
                            htmlFor={imageId}
                            style={{ display: "flex", cursor: "pointer" }}
                        >
                            <MenuItem title="Thêm ảnh">
                                <Image />
                            </MenuItem>
                        </label>
                        <input
                            type="file"
                            id={imageId}
                            accept="image/*"
                            style={{
                                visibility: "hidden",
                                position: "absolute",
                                width: 0,
                                height: 0,
                            }}
                            onChange={async (e) => {
                                const images: FileList | null = e.target.files;
                                if (images) {
                                    const formData = new FormData();
                                    [...images].forEach((file) => {
                                        formData.append("questionImages", file);
                                    });
                                    const res = await request.post<{
                                        questionImages: string[];
                                    }>(
                                        `questions/${question.id}/image`,
                                        formData,
                                        {
                                            headers: {
                                                "Content-Type":
                                                    "multipart/form-data",
                                            },
                                        }
                                    );
                                    dispatch(
                                        updateQuestionField({
                                            partId,
                                            questionId: question.id,
                                            field: "questionImages",
                                            value: res.questionImages,
                                        })
                                    );
                                }
                            }}
                            multiple
                        />
                    </>
                )}

                <MenuItem
                    title="Xoá câu hỏi"
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
                        else {
                            alert("Xoá không thành công, vui lòng thử lại");
                        }
                    }}
                >
                    <Delete />
                </MenuItem>
            </Stack>
        </PopupMenu>
    );
}
