import { Grid } from "@mui/material";
import * as React from "react";
import IMultiSelectAnswer from "../interfaces/IMultiSelect";
import styles from "./style.module.scss";

export interface IMultiSelectAnswerPreviewProps {
    size: number;
    partClientId: number;
    questionClientId: number;
    answer: IMultiSelectAnswer;
}

export default function MultiSelectAnswerPreview(
    props: IMultiSelectAnswerPreviewProps
) {
    const { size, partClientId, questionClientId, answer } = props;
    return (
        <Grid
            item
            xs={size}
            key={`${partClientId}/${questionClientId}//${answer.clientId}`}
            className={styles.answer + " " + styles.multiSelect}
        >
            {answer.value}
        </Grid>
    );
}
