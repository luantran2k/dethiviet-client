import { Box, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import { memo } from "react";
import { questionSeletor } from "../../../redux/selectors/examSeletors";
import examUltis from "../../../Utils/examUltis";
import QuestionPreview from "../../Question/preview";
import { PartType } from "../interfaces/IPart";
import styles from "./style.module.scss";
export interface IPartPreviewProps {
    part: PartType;
}

const PartPreview = memo((props: IPartPreviewProps) => {
    const { part } = props;
    return (
        <Box className={styles.part} marginY={4}>
            <Typography
                variant="h5"
                display="inline-block"
                fontWeight="normal"
                fontSize={18}
                textTransform="uppercase"
            >
                {part.title}
            </Typography>
            {part.questions?.map((question) => (
                <QuestionPreview
                    key={`${part.clientId}/${question.clientId}`}
                    partClientId={part.clientId}
                    type={part.type}
                    question={question}
                />
            ))}
        </Box>
    );
});

export default PartPreview;
