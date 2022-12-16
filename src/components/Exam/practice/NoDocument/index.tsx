import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { renderAnswer } from "../../../../pages/Exam/practice";
import ultis from "../../../../Utils/ultis";
declare let renderMathInElement: (
    element: HTMLElement,
    options?: object
) => void;

export interface IExamPracticeNoDocumentProps {}

export default function ExamPracticeNoDocument(
    props: IExamPracticeNoDocumentProps
) {
    const exam = useAppSelector((state) => state.exam);
    const examRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            if (renderMathInElement && examRef.current) {
                renderMathInElement(examRef.current, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                        // { left: "\\(", right: "\\)", display: false },
                        // { left: "\\[", right: "\\]", display: true },
                    ],
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [exam]);
    return (
        <Box
            ref={examRef}
            maxWidth="64rem"
            margin="2rem auto"
            padding="2rem"
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
            <Box>
                <Typography variant="h2" fontSize="2.4rem" fontWeight="400">
                    {exam.title}
                </Typography>
                {exam.parts?.map((part, index) => (
                    <Box key={part.id} my={2}>
                        <Typography variant="h6" fontSize={"1.4rem"}>{`Phần ${
                            index + 1
                        }. ${part.title}`}</Typography>
                        <Typography>{part.description}</Typography>
                        {part.partAudio && (
                            <audio
                                src={part.partAudio}
                                style={{ width: "100%" }}
                                controls
                            />
                        )}
                        {part.questions?.map((question, index) => (
                            <Stack mb={4} spacing={2} key={question.id}>
                                <Typography
                                    sx={{
                                        fontSize: "1.2rem",
                                        "> span": {
                                            fontWeight: "bold",
                                        },
                                    }}
                                >
                                    <span>{`Câu ${index + 1}. `}</span>
                                    {question.title}
                                </Typography>
                                <Typography>{question.description}</Typography>
                                {question.questionAudio && (
                                    <audio
                                        src={question.questionAudio}
                                        style={{ width: "100%" }}
                                        controls
                                    />
                                )}
                                {!ultis.checkEmptyArray(
                                    question.questionImages
                                ) && (
                                    <Grid container sx={{ gap: "1rem" }}>
                                        {question.questionImages?.map(
                                            (url, index) => (
                                                <Grid
                                                    key={url}
                                                    item
                                                    sx={{
                                                        flex: "0 1 calc((100% - 1rem)/2)",
                                                        img: {
                                                            borderRadius:
                                                                ".4rem",
                                                            height: "100%",
                                                            width: "100%",
                                                            objectFit: "cover",
                                                        },
                                                    }}
                                                >
                                                    <Box height="16rem">
                                                        <img src={url} />
                                                    </Box>
                                                    <Typography textAlign="center">
                                                        Hình {index + 1}
                                                    </Typography>
                                                </Grid>
                                            )
                                        )}
                                    </Grid>
                                )}
                                {renderAnswer({ part, question, dispatch })}
                            </Stack>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
