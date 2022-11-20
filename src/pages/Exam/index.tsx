import {
    Button,
    CardActions,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FormEvent, memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useFetch } from "../../app/hooks";
import IExam, { ExamFilter } from "../../components/Exam/interfaces/IExam";
import CreateExamModal from "../../components/Exam/modal/create";
import AppModal from "../../components/Modal";
import ultis from "../../Utils/ultis";

export interface IExamPageProps {}

export default function ExamPage(props: IExamPageProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [examFilter, setExamFilter] = useState<ExamFilter>({});
    const {
        register,
        watch,
        getValues,
        control,
        formState: { errors },
        setValue,
    } = useForm<ExamFilter>({
        defaultValues: {
            page: 0,
            quantity: 24,
        },
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = getValues();
        const newData = Object.keys(data).reduce((output, key) => {
            const value = data[key as keyof ExamFilter];
            if (Number.isNaN(value) || value === "") {
                return output;
            }
            return { ...output, [key]: value };
        }, {});
        setExamFilter(newData);
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
            <form onSubmit={handleSubmit}>
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
                {examFilter.title ? (
                    <FindExamResults examFilter={examFilter} />
                ) : (
                    <Typography variant="h4">
                        Nhập thông tin để tìm kiếm
                    </Typography>
                )}
            </Grid>
        </Stack>
    );
}

export const FindExamResults = memo((props: { examFilter: ExamFilter }) => {
    const { examFilter } = props;
    const {
        data: exams,
        error,
        loading,
    } = useFetch<ExamFilter, IExam[]>("exams", {
        params: examFilter,
    });
    const navigate = useNavigate();
    if (loading) {
        return <Typography variant="h4"> Đang tải dữ liệu</Typography>;
    }
    if (error) {
        return (
            <Typography variant="h4" color="red">
                {error.message}
            </Typography>
        );
    }
    if (ultis.checkEmptyArray(exams) || !exams) {
        return <Typography variant="h4">Không tìm thấy</Typography>;
    } else {
        return (
            <>
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
                            <Typography>
                                {exam.date
                                    ? new Date(exam.date).getFullYear()
                                    : "Không xác định"}
                            </Typography>
                            <Typography>{exam.grade}</Typography>
                        </CardActions>
                    </Grid>
                ))}
            </>
        );
    }
});
