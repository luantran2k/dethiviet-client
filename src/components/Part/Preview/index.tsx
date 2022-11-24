import { Box, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
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
                fontSize={20}
            >
                {part.title}
                <span style={{ fontSize: "1rem", textTransform: "none" }}>
                    {" "}
                    ({part.questions?.length} câu/ {part.totalPoints} điểm)
                </span>
            </Typography>
            <Typography
                color={grey[800]}
                fontStyle="italic"
                sx={{ textIndent: "2.8rem" }}
            >
                {part.description}
            </Typography>
            {part.questions?.map((question) => (
                <QuestionPreview
                    key={`${part.id}/${question.id}`}
                    partId={part.id}
                    type={part.type}
                    question={question}
                />
            ))}
        </Box>
    );
});

export default PartPreview;
