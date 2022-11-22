import { Grid } from "@mui/material";
import * as React from "react";
import IMultipleChoiceAnswer from "../interfaces/IMultipleChoice";
import styles from "./style.module.scss";

export interface IMultipleChoiceAnswerPreviewProps {
    size: number;
    partId: number;
    questionId: number;
    answer: IMultipleChoiceAnswer;
}

export default function MultipleChoiceAnswerPreview(
    props: IMultipleChoiceAnswerPreviewProps
) {
    const { size, partId, questionId, answer } = props;
    return (
        <Grid
            item
            xs={size}
            key={`${partId}/${questionId}//${answer.id}`}
            className={styles.answer}
        >
            {answer.value}
        </Grid>
    );
}
