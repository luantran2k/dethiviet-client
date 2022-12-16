import { Delete } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import QuestionTypeDatas from "../../../../const/QuestionTypes";
import { getAnswerColorBackground } from "../../../../pages/Exam/practice";
import request from "../../../../Utils/request";
import ultis from "../../../../Utils/ultis";
import { AnswerType } from "../../../Answer/interfaces/IAnswer";
import MultipleChoiceAnswerHasDocument from "../../../Answer/MultipleChoice/HasDocument";
import MultiSelectAnswerHasDocument from "../../../Answer/MultiSelect/HasDocument";
import { PartType } from "../../../Part/interfaces/IPart";
import PdfPreview from "../../../PdfPreview";
import { QuestionType } from "../../../Question/interfaces/IQuestion";
import IExam from "../../interfaces/IExam";

const renderAnswer = ({
    part,
    question,
    answer,
    index,
}: {
    part: PartType;
    question: QuestionType;
    answer: AnswerType;
    index: number;
}) => {
    const type = part.type;

    switch (type) {
        case QuestionTypeDatas.MultipleChoice.value: {
            return (
                <MultipleChoiceAnswerHasDocument
                    key={answer.id}
                    partId={part.id}
                    question={question}
                    answerId={answer.id}
                    answer={answer}
                    value={String.fromCharCode(index + 65)}
                />
            );
        }
        case QuestionTypeDatas.MultiSelect.value: {
            return (
                <MultiSelectAnswerHasDocument
                    key={answer.id}
                    partId={part.id}
                    question={question}
                    answerId={answer.id}
                    answer={answer}
                    value={String.fromCharCode(index + 65)}
                />
            );
        }
        default: {
            return <p>Không hỗ trợ</p>;
        }
    }
};

export interface IExamResultWithDocumentProps {
    exam: IExam;
    resultId: string;
}

export default function ExamResultWithDocument(
    props: IExamResultWithDocumentProps
) {
    const { exam, resultId } = props;
    const navigate = useNavigate();
    return (
        <Stack
            width={"100vw"}
            alignItems="start"
            height="calc(100vh - 4rem)"
            flexGrow={1}
            direction="row"
        >
            <Box
                sx={{
                    height: "100%",
                    flexBasis: "60%",
                    transition: "all 0.3s linear",
                    backgroundColor: "#ccc",
                }}
            >
                <PdfPreview
                    path={exam.documentUrl!}
                    securityCode={exam.securityCode}
                />
            </Box>
            <Stack padding={2} flexBasis="40%" height="100%" overflow="auto">
                <Stack direction="row">
                    <Box>
                        <Typography
                            variant="h2"
                            fontSize="2rem"
                            fontWeight={500}
                        >
                            {exam.title}
                        </Typography>
                        <Typography>Tổng điểm: {exam.score}</Typography>
                        <Typography>
                            {exam.numberCorrectQuestions}/{exam.totalQuestions}{" "}
                            câu đúng
                        </Typography>
                    </Box>
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
                            <Stack mb={1} spacing={2} key={question.id}>
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
                                    <Typography>
                                        {question.description}
                                    </Typography>
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
                                <Stack direction="row" spacing={2} mt={1}>
                                    {question.answers?.map((answer, index) => (
                                        <Box
                                            sx={{
                                                borderRadius: ".4rem",
                                                padding: ".4rem",
                                                backgroundColor:
                                                    getAnswerColorBackground(
                                                        answer,
                                                        teal[100],
                                                        red[100]
                                                    ),
                                            }}
                                        >
                                            {renderAnswer({
                                                answer: answer,
                                                index,
                                                part,
                                                question,
                                            })}
                                        </Box>
                                    ))}
                                </Stack>
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
            </Stack>
        </Stack>
    );
}
