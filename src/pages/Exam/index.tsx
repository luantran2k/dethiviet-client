import {
    Button,
    CardActions,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import IExam, {
    ExamFilter,
    ExamSummary,
} from "../../components/Exam/interfaces/IExam";
import CreateExamModal from "../../components/Exam/modal/create";
import AppModal from "../../components/Modal";
import request from "../../Utils/request";

export interface IExamPageProps {}

export default function ExamPage(props: IExamPageProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [exams, setExams] = useState<ExamSummary[]>([]);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm<ExamFilter>({
        defaultValues: {
            page: 0,
            quantity: 24,
        },
    });
    useEffect(() => {
        const getExams = async () => {
            setExams(
                await request.get<ExamFilter>("exams", {
                    page: 0,
                    quantity: 24,
                })
            );
        };
        getExams();
    }, []);

    const onSubmit: SubmitHandler<ExamFilter> = async (examFilter) => {
        examFilter = Object.keys(examFilter).reduce((output, key) => {
            const value = examFilter[key as keyof ExamFilter];
            if (Number.isNaN(value) || value === "") {
                return output;
            }
            return { ...output, [key]: value };
        }, {});

        console.log(examFilter);
        const exam = await request.get<ExamFilter>("exams", examFilter);
        console.log(exam);
        setExams(exam);
    };

    return (
        <Stack alignItems="center" spacing={4}>
            <Stack direction="row" spacing={2} marginTop={4}>
                <AppModal buttonText="create">
                    <CreateExamModal />
                </AppModal>
                <Button
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Redirect
                </Button>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("title")} label="Tiêu đề" />
                <TextField {...register("subjectName")} label="Tên môn học" />
                <TextField
                    type="number"
                    {...register("year", { valueAsNumber: true })}
                    label="Năm học"
                />
                <TextField {...register("grade")} label="Lớp/Trình độ" />
                <Button type="submit" variant="contained">
                    Tìm kiếm
                </Button>
            </form>
            <Grid container rowGap={2} maxWidth="56.62rem">
                {exams.map((exam) => (
                    <Grid
                        item
                        marginLeft="1rem"
                        flexBasis="15rem"
                        key={exam.id}
                        sx={{ backgroundColor: "#ccc" }}
                    >
                        <CardActions
                            onClick={() => {
                                navigate("./edit/" + exam.id);
                            }}
                            sx={{
                                flexDirection: "column",
                                alignItems: "start",
                            }}
                        >
                            <Typography variant="h6">
                                Tiêu đề{exam.title}
                            </Typography>
                            <Typography>{exam.subjectName}</Typography>
                            <Typography>{exam.ownerId}</Typography>
                            <Typography>{exam.year}</Typography>
                            <Typography>{exam.grade}</Typography>
                        </CardActions>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
