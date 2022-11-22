import { Typography, Grid, Box } from "@mui/material";
import * as React from "react";
import { memo } from "react";
import QuestionTypeDatas from "../../../const/QuestionTypes";
import examUltis from "../../../Utils/examUltis";
import MultipleChoiceAnswerPreview from "../../Answer/preview/MultipleChoice";
import MultiSelectAnswerPreview from "../../Answer/preview/MultiSelect";
import { QuestionType } from "../interfaces/IQuestion";
import styles from "./style.module.scss";

export interface IQuestionPreviewProps {
    partId: number;
    type: string;
    question: QuestionType;
}

const QuestionPreview = memo((props: IQuestionPreviewProps) => {
    const { partId, type, question } = props;
    return (
        <Box className={styles.question} marginY={2}>
            <Typography
                variant="h6"
                fontWeight="normal"
                fontSize={16}
                display="inline"
                sx={{ wordBreak: "break-word" }}
            >
                {question.title}
            </Typography>
            <Grid container columnSpacing={4} rowSpacing={1}>
                {question.answers?.map((answer) => {
                    const size = examUltis.getSizeOfColumnAnswer(
                        question.answers
                    );
                    switch (type) {
                        case QuestionTypeDatas.MultitpleChoice.value: {
                            return (
                                <MultipleChoiceAnswerPreview
                                    key={`${partId}/${question.id}/${answer.id}`}
                                    size={size}
                                    partId={partId}
                                    questionId={question.id}
                                    answer={answer}
                                />
                            );
                        }
                        case QuestionTypeDatas.MultiSelect.value: {
                            return (
                                <MultiSelectAnswerPreview
                                    key={`${partId}/${question.id}/${answer.id}`}
                                    size={size}
                                    partId={partId}
                                    questionId={question.id}
                                    answer={answer}
                                />
                            );
                        }
                        default: {
                            return <></>;
                        }
                    }
                })}
            </Grid>
        </Box>
    );
});

export default QuestionPreview;
