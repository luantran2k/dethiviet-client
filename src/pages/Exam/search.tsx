import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "../../app/hooks";
import { ExamFilter } from "../../components/Exam/interfaces/IExam";
import { IExamCard } from "../../components/ExamCard";
import CarouselCard from "../../components/ExamCard/CarouselCard";
import ultis from "../../Utils/ultis";

export interface ISearchExamPageProps {}

export default function SearchExamPage(props: ISearchExamPageProps) {
    const [searchParams] = useSearchParams();
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
            m="0 auto 4rem"
        >
            <Stack direction="row" spacing={2}></Stack>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            {...register("title")}
                            label="Ti??u ?????"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            {...register("subjectName")}
                            label="T??n m??n h???c"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            type="number"
                            {...register("year", { valueAsNumber: true })}
                            label="N??m h???c"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            {...register("grade")}
                            label="L???p/Tr??nh ?????"
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained">
                            T??m ki???m
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {examFilter.title ? (
                <FindExamResults examFilter={examFilter} />
            ) : (
                <Typography variant="h4">Nh???p th??ng tin ????? t??m ki???m</Typography>
            )}
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
        return <Typography variant="h4"> ??ang t???i d??? li???u</Typography>;
    }
    if (error) {
        return (
            <Typography variant="h4" color="red">
                {error.message}
            </Typography>
        );
    }
    if (ultis.checkEmptyArray(exams) || !exams) {
        return <Typography variant="h4">Kh??ng t??m th???y</Typography>;
    } else {
        return (
            <Grid container columnSpacing={2} rowSpacing={4}>
                {exams.map((exam) => (
                    <Grid item xs={6} sm={4} key={exam.id}>
                        <CarouselCard exam={exam} boxShadow={true} />
                    </Grid>
                ))}
            </Grid>
        );
    }
});
