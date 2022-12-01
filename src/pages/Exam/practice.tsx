import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../../app/hooks";
import Countdown from "../../components/Countdown";
import { getExam, removeExamState } from "../../redux/slices/examSlice";
import ultis from "../../Utils/ultis";

export interface IPracticeExamPageProps {}

export default function PracticeExamPage(props: IPracticeExamPageProps) {
    useAuth();
    const { examId } = useParams();
    const dispatch = useAppDispatch();
    const exam = useAppSelector((state) => state.exam);
    const [time, setTime] = useState<number | undefined>(
        exam?.duration ? exam.duration * 60 : undefined
    );
    const [isPractice, setPractice] = useState<boolean>(false);
    useEffect(() => {
        let intervalId: number | undefined = undefined;
        if (isPractice && time) {
            intervalId = setInterval(() => {
                setTime((pre) => pre! - 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isPractice]);

    useEffect(() => {
        setTime(exam?.duration ? exam.duration * 60 : undefined);
    }, [exam]);

    useEffect(() => {
        if (examId) {
            dispatch(getExam({ examId: Number(examId), includePart: true }));
        }
        return () => {
            dispatch(removeExamState());
        };
    }, []);

    useEffect(() => {
        const preventLeave = function (e: BeforeUnloadEvent) {
            e.preventDefault();
            e.returnValue = "";
        };
        if (isPractice) {
            window.addEventListener("beforeunload", preventLeave);
        } else {
            window.removeEventListener("beforeunload", preventLeave);
        }

        return () => {
            window.removeEventListener("beforeunload", preventLeave);
        };
    }, [isPractice]);

    return (
        <Box
            maxWidth="64rem"
            margin="2rem auto"
            padding="2rem"
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
            <Countdown
                time={time}
                setPractice={setPractice}
                sx={{
                    position: "fixed",
                    top: "4rem",
                    right: "4rem",
                }}
            />
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
                                        span: {
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
                                <FormControl>
                                    <RadioGroup
                                        onChange={(e) =>
                                            console.log(e.target.value)
                                        }
                                    >
                                        {question.answers?.map(
                                            (answer, index) => (
                                                <FormControlLabel
                                                    key={answer.id}
                                                    value={answer.id}
                                                    control={<Radio />}
                                                    label={`${String.fromCharCode(
                                                        65 + index
                                                    )}. ${
                                                        answer.value ||
                                                        "Chưa có đáp án"
                                                    }`}
                                                />
                                            )
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </Stack>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
