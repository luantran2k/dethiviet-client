import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ultis from "../../../../Utils/ultis";
import IQuestion from "../../interfaces/IQuestion";

export interface IQuestionImagesPreivewProps {
    question: IQuestion;
}

export default function QuestionImagesPreivew(
    props: IQuestionImagesPreivewProps
) {
    const { question } = props;
    const [column, setColumn] = useState(() => {
        return question.questionImages?.length! >= 2 ? 2 : 1;
    });

    useEffect(() => {
        setColumn(() => {
            return question.questionImages?.length! >= 2 ? 2 : 1;
        });
    }, [question.questionImages?.length]);

    if (ultis.checkEmptyArray(question.questionImages)) {
        return <></>;
    }
    return (
        <Grid container spacing={2}>
            {question.questionImages?.map((url, index) => (
                <Grid item xs={12 / column} key={url} mb={2}>
                    <Box maxHeight={600} margin="0 auto">
                        <img
                            src={url}
                            style={{
                                height: "100%",
                                maxWidth: "100%",
                                objectFit: "cover",
                                filter: "grayscale(1)",
                            }}
                        />
                    </Box>
                    {question.questionImages?.length! >= 2 && (
                        <Typography textAlign="center" mt={1}>
                            Hình: {index + 1}
                        </Typography>
                    )}
                </Grid>
            ))}
        </Grid>
    );
}
