import { Delete } from "@mui/icons-material";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../app/hooks";
import IExam from "../../components/Exam/interfaces/IExam";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";
import { renderAnswer } from "./practice";
declare let renderMathInElement: (
    element: HTMLElement,
    options?: object
) => void;
export interface IExamResultPageProps {}

export default function ExamResultPage(props: IExamResultPageProps) {
    useAuth();
    const navigate = useNavigate();
    const { resultId } = useParams();
    const [exam, setExam] = useState<IExam>();
    const examRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const getExams = async () => {
            const result = await request.get<any, { examCompleted: string }>(
                `exams/result/${resultId}`
            );
            if (result?.examCompleted) {
                setExam(JSON.parse(result?.examCompleted));
            }
        };
        getExams();
    }, []);

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

    if (!exam) {
        return <></>;
    }
    return (
        <Box
            ref={examRef}
            sx={{
                maxWidth: "64rem",
                margin: "2rem auto",
                padding: "2rem",
                borderRaidus: ".4rem",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
        >
            <Typography variant="h2" fontSize="2.4rem" fontWeight="400">
                {exam.title}
            </Typography>
            <Stack direction="row" spacing={4}>
                <Typography>Tổng điểm: {exam.score}</Typography>
                <Typography>
                    {exam.numberCorrectQuestions}/{exam.totalQuestions} câu đúng
                </Typography>
                <Button
                    color="error"
                    sx={{ marginLeft: "auto !important" }}
                    onClick={() => {
                        request.delete("exams/result/" + resultId);
                        navigate(-1);
                    }}
                >
                    <Delete />
                </Button>
            </Stack>
            {exam.parts?.map((part, index) => (
                <Box key={part.id} my={2}>
                    <Typography variant="h6" fontSize={"1.4rem"}>{`Phần ${
                        index + 1
                    }. ${part.title}`}</Typography>
                    <Stack direction="row" spacing={4}>
                        <Typography>Tổng điểm: {part.partScore}</Typography>
                        <Typography>
                            {part.numberCorrectQuestionsOfPart}/
                            {part.questions?.length} câu đúng
                        </Typography>
                    </Stack>

                    {part.description && (
                        <Typography>{part.description}</Typography>
                    )}
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
                                    ">span": {
                                        fontWeight: "bold",
                                    },
                                }}
                            >
                                <span>{`Câu ${index + 1}. `}</span>
                                {question.title}
                            </Typography>
                            {question.description && (
                                <Typography>{question.description}</Typography>
                            )}
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
                                                        borderRadius: ".4rem",
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
                            {renderAnswer({
                                part,
                                question,
                                dispatch: () => {},
                                changeInput: false,
                            })}
                            {question.explain && (
                                <Typography
                                    sx={{
                                        backgroundColor: grey[100],
                                        borderRadius: ".4rem",
                                        padding: "1rem",
                                    }}
                                >
                                    {question.explain}
                                </Typography>
                            )}
                        </Stack>
                    ))}
                </Box>
            ))}
        </Box>
    );
}
