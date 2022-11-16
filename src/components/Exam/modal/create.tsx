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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { GradeData } from "../../../const/GradeData";
import SubjectNames from "../../../const/SubjectNames";
import { createExam } from "../../../redux/slices/examSlice";
import ultis from "../../../Utils/ultis";
import IExam from "../interfaces/IExam";

export interface ICreateExamModalProps {}

export default function CreateExamModal(props: ICreateExamModalProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        setValue,
    } = useForm<IExam>({
        defaultValues: {
            isPublic: true,
            subjectName: "Khác",
            duration: 45,
            date: null,
        },
    });
    const subjectList = SubjectNames.map((category) =>
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

    const onSubmit: SubmitHandler<IExam> = (data) => {
        (document.activeElement as HTMLElement).blur();
        const newExam: IExam = data;
        newExam.isPublic =
            data.isPublic === true || data?.isPublic === "true" ? true : false;
        dispatch(createExam(newExam));
        navigate("/exam/edit");
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Tạo bài kiểm tra mới</Typography>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                marginTop={1}
                marginBottom={4}
                maxHeight="40vh"
                overflow="auto"
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
                                                onChange={(e) => {
                                                    onChangeField(
                                                        e.target.value
                                                    );
                                                }}
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
                    <TextField
                        fullWidth
                        select
                        label="Lớp"
                        defaultValue="unknown"
                        {...register("grade")}
                    >
                        {gradeList.map((grade, index) => (
                            <MenuItem key={index} value={grade.value}>
                                {grade.label}
                            </MenuItem>
                        ))}
                    </TextField>
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
                    <TextField
                        fullWidth
                        select
                        label="Loại đề thi"
                        defaultValue="unOfficial"
                        {...register("type")}
                    >
                        <MenuItem value="official">Chính thức</MenuItem>
                        <MenuItem value="unOfficial">Không chính thức</MenuItem>
                    </TextField>
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
                    Tạo
                </Button>
            </CardActions>
        </form>
    );
}
