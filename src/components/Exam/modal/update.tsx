import {
    Autocomplete,
    Button,
    CardActions,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    MenuItem,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GradeData } from "../../../const/GradeData";
import SubjectNames, { ISubject } from "../../../const/SubjectNames";
import { saveExam, updateExam } from "../../../redux/slices/examSlice";
import ultis from "../../../Utils/ultis";
import IExam from "../interfaces/IExam";

export interface IUpdateExamModalProps {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateExamModal(props: IUpdateExamModalProps) {
    const { setOpen } = props;
    const dispatch = useAppDispatch();
    const exam = useAppSelector((state) => state.exam);
    const subjectList: ISubject[] = SubjectNames.map((category) =>
        category.data
            .map((subject) => ({
                label: subject,
                category: category.label,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
    ).flat(1);
    const gradeList = Object.keys(GradeData).map((key) => ({
        label: GradeData[key as keyof typeof GradeData] as string,
        value: key,
    }));
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm<IExam>({
        defaultValues: {
            title: exam.title,
            description: exam.description,
            subjectName: exam.subjectName || "Khác",
            grade: exam.grade || "unknown",
            date: exam.date,
            duration: exam.duration,
            publishers: exam.publishers,
            examName: exam.examName,
            type: exam.type,
            isPublic: exam.isPublic === true ? true : false,
        },
    });

    const onSubmit: SubmitHandler<IExam> = async (data) => {
        const newExam: IExam = data;
        newExam.isPublic =
            data.isPublic === true || data?.isPublic === "true" ? true : false;
        dispatch(saveExam({ id: exam.id, ...newExam }));
        if (setOpen) {
            setOpen(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">
                Chỉnh sửa thông tin bài kiểm tra
            </Typography>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                marginTop={1}
                marginBottom={4}
            >
                <Grid item xs={12}>
                    <TextField
                        {...register("title", {
                            required: true,
                            maxLength: 250,
                            minLength: 5,
                        })}
                        aria-invalid={errors.title ? "true" : "false"}
                        helperText={ultis.getFormErrorMessage({
                            error: errors.title?.type,
                            minLength: 5,
                            maxLength: 250,
                        })}
                        error={Boolean(errors.title?.type)}
                        variant="outlined"
                        label="Tiêu đề *"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("description", {
                            required: false,
                        })}
                        variant="outlined"
                        label="Mô tả"
                        multiline
                        maxRows={3}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="subjectName"
                        control={control}
                        render={({
                            field: { onChange: onChangeField, value },
                        }) => {
                            return (
                                <Autocomplete
                                    freeSolo={true}
                                    options={subjectList}
                                    groupBy={(subjectList) =>
                                        subjectList.category
                                    }
                                    onChange={(e) => {
                                        onChangeField(
                                            e.currentTarget.textContent
                                        );
                                    }}
                                    value={value}
                                    renderInput={(params) => {
                                        return (
                                            <TextField
                                                {...params}
                                                label={"Tên môn học"}
                                                margin="normal"
                                                sx={{ margin: 0 }}
                                                aria-invalid={
                                                    errors.subjectName
                                                        ? "true"
                                                        : "false"
                                                }
                                                onBlur={(e) => {
                                                    onChangeField(
                                                        e.target.value
                                                    );
                                                }}
                                                helperText={ultis.getFormErrorMessage(
                                                    {
                                                        error: errors
                                                            .subjectName?.type,
                                                        minLength: 2,
                                                        maxLength: 250,
                                                    }
                                                )}
                                                error={Boolean(
                                                    errors.subjectName?.type
                                                )}
                                            />
                                        );
                                    }}
                                />
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        control={control}
                        name={"grade"}
                        render={({ field }) => {
                            return (
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    label="Lớp"
                                >
                                    {gradeList.map((grade, index) => (
                                        <MenuItem
                                            key={index}
                                            value={grade.value}
                                        >
                                            {grade.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            control={control}
                            name={"date"}
                            render={function ({
                                field: { onChange: onChangeField, value },
                            }) {
                                return (
                                    <DatePicker
                                        label="Ngày thi"
                                        value={value}
                                        onChange={(newValue) => {
                                            onChangeField(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                );
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        {...register("duration", {
                            valueAsNumber: true,
                            required: true,
                            min: 1,
                            max: 999,
                        })}
                        aria-invalid={errors.duration ? "true" : "false"}
                        helperText={ultis.getFormErrorMessage({
                            error: errors.duration?.type,
                            min: 1,
                            max: 999,
                        })}
                        error={Boolean(errors.duration?.type)}
                        variant="outlined"
                        label="Thời gian làm bài *"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        {...register("publishers", {
                            required: false,
                            maxLength: 250,
                        })}
                        aria-invalid={errors.publishers ? "true" : "false"}
                        helperText={ultis.getFormErrorMessage({
                            error: errors.publishers?.type,
                            maxLength: 250,
                        })}
                        error={Boolean(errors.publishers?.type)}
                        variant="outlined"
                        label="Đơn vị phát hành đề thi"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        control={control}
                        name={"type"}
                        render={({ field }) => {
                            return (
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    label="Loại đề thi"
                                >
                                    <MenuItem value="official">
                                        Chính thức
                                    </MenuItem>
                                    <MenuItem value="unOfficial">
                                        Không chính thức
                                    </MenuItem>
                                </TextField>
                            );
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Kỳ thi"
                        {...register("examName", {
                            required: false,
                        })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel>Công khai</FormLabel>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="isPublic"
                            render={({ field }) => (
                                <RadioGroup {...field} row>
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Có"
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="Không"
                                    />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button type="submit" variant="contained">
                    Lưu
                </Button>
            </CardActions>
        </form>
    );
}
