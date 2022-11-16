import { Grid } from "@mui/material";
import * as React from "react";
import IMultipleChoiceAnswer from "../interfaces/IMultipleChoice";
import styles from "./style.module.scss";

export interface IMultipleChoiceAnswerPreviewProps {
    size: number;
    partClientId: number;
    questionClientId: number;
    answer: IMultipleChoiceAnswer;
}

export default function MultipleChoiceAnswerPreview(
    props: IMultipleChoiceAnswerPreviewProps
) {
    const { size, partClientId, questionClientId, answer } = props;
    return (
        <Grid
            item
            xs={size}
            key={`${partClientId}/${questionClientId}//${answer.clientId}`}
            className={styles.answer}
        >
            {answer.value}
        </Grid>
    );
}
