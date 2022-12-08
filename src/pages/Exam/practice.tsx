import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { red, teal } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../../app/hooks";
import { AnswerType } from "../../components/Answer/interfaces/IAnswer";
import Countdown from "../../components/Countdown";
import { PartType } from "../../components/Part/interfaces/IPart";
import { QuestionType } from "../../components/Question/interfaces/IQuestion";
import QuestionTypeDatas from "../../const/QuestionTypes";
import {
    getExam,
    removeExamState,
    updateCorrectAnswer,
} from "../../redux/slices/examSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface IPracticeExamPageProps {}

export const getAnswerColorBackground = (answer: AnswerType) => {
    if (
        answer.isTrue &&
        answer.isTrue == true &&
        answer.isAnswerFail == false
    ) {
        return teal[50];
    }
    if (answer.isAnswerFail == true && Boolean(answer.isTrue) == false) {
        return teal[50];
    }
    if (answer.isAnswerFail == true) {
        return red[50];
    }
    return "white";
};

export const renderAnswer = ({
    part,
    question,
    dispatch,
    changeInput = true,
}: {
    part: PartType;
    question: QuestionType;
    dispatch: (param: any) => any;
    changeInput?: boolean;
}) => {
    const type = part.type;

    switch (type) {
        case QuestionTypeDatas.MultipleChoice.value: {
            return (
                <FormControl>
                    <RadioGroup
                        onChange={(e) => {
                            dispatch(
                                updateCorrectAnswer({
                                    partId: part.id,
                                    questionId: question.id,
                                    answerId: Number(e.target.value),
                                    isTrue: e.target.checked,
                                    value: e.target.value,
                                })
                            );
                        }}
                    >
                        {question.answers?.map((answer, index) => {
                            return (
                                <FormControlLabel
                                    key={answer.id}
                                    value={answer.id}
                                    checked={answer.isTrue || false}
                                    control={<Radio />}
                                    label={`${String.fromCharCode(
                                        65 + index
                                    )}. ${answer.value || "Chưa có đáp án"}`}
                                    sx={{
                                        backgroundColor:
                                            getAnswerColorBackground(answer),
                                    }}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            );
        }
        case QuestionTypeDatas.MultiSelect.value: {
            return (
                <FormControl>
                    {question.answers?.map((answer, index) => (
                        <FormControlLabel
                            key={answer.id}
                            value={answer.id}
                            checked={answer.isTrue || false}
                            control={
                                <Checkbox
                                    onChange={async () => {
                                        dispatch(
                                            updateCorrectAnswer({
                                                partId: part.id,
                                                questionId: question.id,
                                                answerId: answer.id,
                                            })
                                        );
                                    }}
                                />
                            }
                            label={answer.value}
                            sx={{
                                backgroundColor:
                                    getAnswerColorBackground(answer),
                            }}
                        />
                    ))}
                </FormControl>
            );
        }
        default: {
            return <p>Không hỗ trợ</p>;
        }
    }
};

export default function PracticeExamPage(props: IPracticeExamPageProps) {
    useAuth();
    const { examId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const exam = useAppSelector((state) => state.exam);
    const [time, setTime] = useState<number>(
        exam?.duration ? exam.duration * 60 : 0
    );
    const submitRef = useRef<HTMLButtonElement>(null);

    const [isStart, setStart] = useState<boolean>(false);
    const [isPractice, setPractice] = useState<boolean>(false);
    const [hasCounter, setHasCounter] = useState<boolean>(true);
    useEffect(() => {
        let intervalId: number | undefined = undefined;
        if (isPractice && time) {
            intervalId = setInterval(() => {
                setTime((time) => {
                    if (time - 1 === 0 && isStart === true) {
                        setPractice(false);
                        submitRef.current?.click();
                    }
                    return time - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isPractice]);

    useEffect(() => {
        if (time === 0) {
            setTime(exam?.duration ? exam.duration * 60 : 0);
        }
    }, [exam]);

    useEffect(() => {
        if (examId) {
            dispatch(
                getExam({
                    examId: Number(examId),
                    includePart: true,
                    withAnswer: false,
                })
            );
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

    const handleSubmitExam = async () => {
        const res = await request.post<{ id: number }>("exams/completed", exam);
        if (res?.id) {
            navigate(`/exam/result/${res.id}`);
        }
    };

    return (
        <Box
            maxWidth="64rem"
            margin="2rem auto"
            padding="2rem"
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
            <Box
                display={!isStart ? "flex" : "none"}
                position="fixed"
                height="100vh"
                width="100vw"
                top="0"
                left="0"
                zIndex="3"
                justifyContent="center"
                alignItems="center"
                bgcolor={"rgba(0,0,0,0.4)"}
            >
                <Stack
                    spacing={2}
                    width="fit-content"
                    bgcolor="white"
                    padding={6}
                    borderRadius=".4rem"
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            setStart(true);
                            setPractice(true);
                        }}
                    >
                        Tính giờ
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setStart(true);
                            setPractice(false);
                            setHasCounter(false);
                        }}
                    >
                        Không Tính giờ
                    </Button>
                </Stack>
            </Box>

            <Stack
                spacing={1}
                sx={{
                    position: "fixed",
                    top: "4rem",
                    right: "4rem",
                    zIndex: 2,
                }}
            >
                {hasCounter && (
                    <>
                        {" "}
                        <Countdown time={time} />
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setPractice(!isPractice);
                            }}
                        >
                            {isPractice ? "Tạm dừng" : "Tiếp tục"}
                        </Button>
                    </>
                )}

                <Button
                    variant="contained"
                    onClick={(e) => {
                        e.stopPropagation();
                        setPractice(false);
                        handleSubmitExam();
                    }}
                    ref={submitRef}
                    sx={{
                        marginTop: "1rem",
                    }}
                >
                    Nộp bài
                </Button>
            </Stack>
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
                                {renderAnswer({ part, question, dispatch })}
                            </Stack>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
