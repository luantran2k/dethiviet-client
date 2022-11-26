import {
    Box,
    Button,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FormEvent, memo, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, useFetch } from "../../app/hooks";
import { ExamFilter } from "../../components/Exam/interfaces/IExam";
import CreateExamModal from "../../components/Exam/modal/create";
import ExamCard, { IExamCard } from "../../components/ExamCard";
import AppModal from "../../components/Modal";
import PopupMenu from "../../components/PopupMenu";
import ultis from "../../Utils/ultis";

export interface IExamPageProps {}

export default function ExamPage(props: IExamPageProps) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const documentId = useId();
    const dispatch = useAppDispatch();
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const location = useLocation();
    const [examFilter, setExamFilter] = useState<ExamFilter>({
        page: 0,
        quantity: 24,
    });
    const {
        register,
        watch,
        getValues,
        control,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<ExamFilter>({
        defaultValues: examFilter,
    });

    useEffect(() => {
        setValue("title", searchParams.get("title") || "");
        setExamFilter((preValue) => ({
            ...preValue,
            title: getValues("title"),
        }));
    }, [searchParams.get("title")]);

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
        <Stack
            alignItems="center"
            spacing={4}
            maxWidth="56.62rem"
            margin="0 auto"
        >
            <Stack direction="row" spacing={2} marginTop={4}></Stack>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            {...register("title")}
                            label="Tiêu đề"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            {...register("subjectName")}
                            label="Tên môn học"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            type="number"
                            {...register("year", { valueAsNumber: true })}
                            label="Năm học"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            {...register("grade")}
                            label="Lớp/Trình độ"
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">
                            Tìm kiếm
                        </Button>
                    </Grid>
                    <Grid item>
                        {isSignIn ? (
                            <PopupMenu
                                trigger={<Button>Tạo đề thi mới</Button>}
                            >
                                <Box>
                                    <AppModal
                                        trigger={
                                            <MenuItem>Tạo đề thi mới</MenuItem>
                                        }
                                    >
                                        <CreateExamModal />
                                    </AppModal>
                                    <MenuItem>
                                        Tạo đề thi từ đề thi đã có
                                    </MenuItem>
                                </Box>
                            </PopupMenu>
                        ) : (
                            <Button
                                onClick={() => {
                                    navigate("/signIn", {
                                        state: {
                                            from: location.pathname,
                                        },
                                    });
                                }}
                                variant="outlined"
                            >
                                Đăng nhập để tạo đề thi
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </form>
            <Grid container rowGap={2}>
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
    } = useFetch<ExamFilter, IExamCard[]>("exams", {
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
                        xs={6}
                        sm={4}
                        marginLeft="1rem"
                        flexBasis="15rem"
                        key={exam.id}
                    >
                        <ExamCard exam={exam} />
                    </Grid>
                ))}
            </>
        );
    }
});
