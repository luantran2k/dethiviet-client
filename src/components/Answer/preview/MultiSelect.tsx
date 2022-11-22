import { Grid } from "@mui/material";
import * as React from "react";
import IMultiSelectAnswer from "../interfaces/IMultiSelect";
import styles from "./style.module.scss";

export interface IMultiSelectAnswerPreviewProps {
    size: number;
    partId: number;
    questionId: number;
    answer: IMultiSelectAnswer;
}

export default function MultiSelectAnswerPreview(
    props: IMultiSelectAnswerPreviewProps
) {
    const { size, partId, questionId, answer } = props;
    return (
        <Grid
            item
            xs={size}
            key={`${partId}/${questionId}//${answer.id}`}
            className={styles.answer + " " + styles.multiSelect}
        >
            {answer.value}
        </Grid>
    );
}
