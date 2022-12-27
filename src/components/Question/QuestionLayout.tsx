import { Cancel, Delete } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    updateQuestionField,
    updateQuestionFieldServer,
} from "../../redux/slices/examSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";
import AddNewAnswerButton from "../Answer/AddNewAnswerButton";
import DeleteButton from "../Button/DeleteButton";
import PopupMenu from "../PopupMenu";
import IQuestion from "./interfaces/IQuestion";
import QuestionMenu from "./QuestionMenu";

export interface IQuestionLayoutProps {
    question: IQuestion;
    partId: number;
    children: React.ReactElement;
}

export default function QuestionLayout(props: IQuestionLayoutProps) {
    const { question, partId, children } = props;
    const dispatch = useAppDispatch();
    const documentUrl = useAppSelector((state) => state.exam.documentUrl);
    const isOriginal = useAppSelector((state) => state.exam.isOriginal);
    const isPractice = useAppSelector((state) => state.exam.isOriginal);

    const handleChangeQuestionTitle = (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        if (e.target.value !== question.title)
            dispatch(
                updateQuestionField({
                    partId,
                    questionId: question.id,
                    field: "title",
                    value: e.target.value,
                })
            );

        request.patch("questions/" + question.id, {
            title: e.target.value,
        });
    };

    const handleDeleteQuestion = async () => {
        dispatch(
            updateQuestionField({
                partId,
                questionId: question.id,
                field: "questionAudio",
                value: "loading",
            })
        );
        const res = await request.delete(`questions/${question.id}/audio`);
        if (res) {
            dispatch(
                updateQuestionField({
                    partId,
                    questionId: question.id,
                    field: "questionAudio",
                    value: null,
                })
            );
        }
    };

    const handleDeleteImage = async (url: string) => {
        const res = await request.delete<{
            questionImages: string[];
        }>(`questions/${question.id}/image?url=${url}`);
        dispatch(
            updateQuestionField({
                partId,
                questionId: question.id,
                field: "questionImages",
                value: res.questionImages,
            })
        );
    };

    if (!question) {
        return <></>;
    }
    return (
        <li>
            <Stack marginY={2}>
                <Box sx={{ width: "100%" }}>
                    <Stack direction="row" alignItems="center" width="100%">
                        {!documentUrl &&
                            (isOriginal ? (
                                <TextField
                                    label="Tiêu đề"
                                    key={question.id}
                                    defaultValue={question.title}
                                    multiline
                                    maxRows={4}
                                    placeholder="Nhập câu hỏi"
                                    onBlur={handleChangeQuestionTitle}
                                    variant="outlined"
                                    sx={{ scrollbarWidth: 0 }}
                                    fullWidth
                                />
                            ) : (
                                <Typography
                                    variant="body1"
                                    fontSize="1.1rem"
                                    fontWeight="500"
                                >
                                    {question.title}
                                </Typography>
                            ))}
                        {documentUrl && <Box flex={1}>{children}</Box>}
                        {isOriginal && isPractice && (
                            <QuestionMenu
                                question={question}
                                partId={partId}
                                isDocumentExam={documentUrl ? true : false}
                            />
                        )}
                    </Stack>
                </Box>
                {question.description !== null && (
                    <Stack direction="row" alignItems="center">
                        <TextField
                            fullWidth
                            label="Mô tả"
                            margin="normal"
                            value={question.description}
                            multiline
                            maxRows={10}
                            onChange={(e) => {
                                dispatch(
                                    updateQuestionField({
                                        partId,
                                        questionId: question.id,
                                        field: "description",
                                        value: e.target.value,
                                    })
                                );
                            }}
                            onBlur={(e) => {
                                dispatch(
                                    updateQuestionFieldServer({
                                        questionId: question.id,
                                        field: "description",
                                        value: e.target.value,
                                    })
                                );
                            }}
                        />
                        {isOriginal && (
                            <PopupMenu>
                                <Button
                                    sx={{
                                        opacity: 0.2,
                                        "&:hover": {
                                            opacity: 1,
                                        },
                                        transition: "all 0.6s",
                                    }}
                                    onClick={() => {
                                        dispatch(
                                            updateQuestionFieldServer({
                                                partId,
                                                questionId: question.id,
                                                field: "description",
                                                value: null,
                                            })
                                        );
                                    }}
                                >
                                    <Delete />
                                </Button>
                            </PopupMenu>
                        )}
                    </Stack>
                )}
                {question.questionAudio !== null &&
                    (question.questionAudio === "loading" ? (
                        <Typography my={1}>Đang xử lý</Typography>
                    ) : (
                        <Stack direction="row">
                            <audio
                                src={question.questionAudio}
                                controls
                                style={{ flexGrow: 1, margin: "1rem 0" }}
                            />
                            {isOriginal && (
                                <DeleteButton onClick={handleDeleteQuestion} />
                            )}
                        </Stack>
                    ))}
                {!ultis.checkEmptyArray(question.questionImages) && (
                    <Accordion sx={{ marginY: "0.4rem" }}>
                        <AccordionSummary>Hình ảnh</AccordionSummary>
                        <AccordionDetails
                            sx={{ maxHeight: "80vh", overflowY: "auto" }}
                        >
                            <Grid container>
                                {question.questionImages?.map((url) => (
                                    <Grid
                                        item
                                        key={url}
                                        xs={6}
                                        sx={{ position: "relative" }}
                                    >
                                        {isOriginal && (
                                            <Cancel
                                                sx={{
                                                    color: "red",
                                                    position: "absolute",
                                                    right: "1rem",
                                                    top: "1rem",
                                                    cursor: "pointer",
                                                    opacity: 0.2,
                                                    transition:
                                                        "all 0.2s linear",
                                                    "&:hover": {
                                                        transform: "scale(1.8)",
                                                        opacity: 1,
                                                    },
                                                    "&:active": {
                                                        color: "black",
                                                    },
                                                }}
                                                onClick={() =>
                                                    handleDeleteImage(url)
                                                }
                                            />
                                        )}
                                        <img
                                            src={url}
                                            loading="lazy"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )}
                {!documentUrl && (
                    <Box margin="1rem" width="96%">
                        {children}
                    </Box>
                )}
                {question.explain !== null && (
                    <Stack direction="row">
                        <TextField
                            fullWidth
                            label="Giải thích"
                            margin="normal"
                            value={question.explain}
                            multiline
                            maxRows={10}
                            onChange={(e) => {
                                dispatch(
                                    updateQuestionField({
                                        partId,
                                        questionId: question.id,
                                        field: "explain",
                                        value: e.target.value,
                                    })
                                );
                            }}
                            onBlur={(e) => {
                                dispatch(
                                    updateQuestionFieldServer({
                                        questionId: question.id,
                                        field: "explain",
                                        value: e.target.value,
                                    })
                                );
                            }}
                        />
                        {isOriginal && (
                            <Button
                                sx={{
                                    opacity: 0.2,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                    transition: "all 0.6s",
                                }}
                                onClick={() => {
                                    dispatch(
                                        updateQuestionFieldServer({
                                            partId,
                                            questionId: question.id,
                                            field: "explain",
                                            value: null,
                                        })
                                    );
                                }}
                            >
                                <Delete />
                            </Button>
                        )}
                    </Stack>
                )}
            </Stack>
            {!documentUrl && isOriginal && (
                <AddNewAnswerButton
                    question={question}
                    partId={partId}
                    hasDocument={false}
                />
            )}
        </li>
    );
}
