import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import QuestionTypeDatas from "../../../const/QuestionTypes";
import { createPart } from "../../../redux/slices/examSlice";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";
import { AppModalProps } from "../../Modal";
import IPart from "../interfaces/IPart";

export interface PartPayLoad {
    title: string;
    description?: string;
    totalPoints: number;
    type: string;
    numberOfQuestions: number;
    numberOfAnswers?: number;
}
export interface ICreatePartModalProps extends AppModalProps {}

export default function CreatePartModal(props: ICreatePartModalProps) {
    const { setOpen } = props;
    const examId = useAppSelector((state) => state.exam.id);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PartPayLoad>();
    const dispatch = useAppDispatch();
    const [type, setType] = React.useState(
        QuestionTypeDatas.MultitpleChoice.value
    );

    const onSubmit: SubmitHandler<PartPayLoad> = async (data) => {
        const newPart = await request.post<IPart>("/parts", {
            examId,
            ...data,
        });
        dispatch(createPart(newPart));
        if (setOpen) {
            setOpen(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" paddingBottom={4}>
                Tạo phần mới
            </Typography>

            {/* Part info */}
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 2, md: 3 }}
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
                        label="Tên phần *"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("description")}
                        variant="outlined"
                        label="Mô tả"
                        multiline
                        maxRows={3}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        {...register("totalPoints", {
                            valueAsNumber: true,
                            required: true,
                        })}
                        aria-invalid={errors.totalPoints ? "true" : "false"}
                        helperText={ultis.getFormErrorMessage({
                            error: errors.totalPoints?.type,
                        })}
                        error={Boolean(errors.totalPoints?.type)}
                        variant="outlined"
                        label="Tổng số điểm *"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        select
                        defaultValue={QuestionTypeDatas.MultitpleChoice.value}
                        {...register("type")}
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    >
                        {Object.values(QuestionTypeDatas).map((type, index) => (
                            <MenuItem key={index} value={type.value}>
                                {type.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        {...register("numberOfQuestions", {
                            valueAsNumber: true,
                            required: true,
                            min: 2,
                            max: 100,
                        })}
                        aria-invalid={errors.totalPoints ? "true" : "false"}
                        helperText={ultis.getFormErrorMessage({
                            error: errors.numberOfQuestions?.type,
                            min: 2,
                            max: 100,
                        })}
                        error={Boolean(errors.numberOfQuestions?.type)}
                        variant="outlined"
                        label="Số câu hỏi*"
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                marginY={2}
            >
                {Boolean(
                    type === QuestionTypeDatas.MultitpleChoice.value ||
                        type ===
                            QuestionTypeDatas.MultitpleChoiceParagraph.value ||
                        type === QuestionTypeDatas.MultiSelect.value
                ) && (
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            defaultValue={3}
                            {...register("numberOfAnswers", {
                                valueAsNumber: true,
                                required: true,
                                min: 2,
                                max: 5,
                            })}
                            aria-invalid={
                                errors.numberOfAnswers ? "true" : "false"
                            }
                            helperText={ultis.getFormErrorMessage({
                                error: errors.numberOfAnswers?.type,
                                min: 2,
                                max: 5,
                            })}
                            error={Boolean(errors.numberOfAnswers?.type)}
                            variant="outlined"
                            label="Số câu trả lời cho mỗi câu *"
                            fullWidth
                        />
                    </Grid>
                )}
            </Grid>
            <Button type="submit" variant="contained">
                Tạo
            </Button>
        </form>
    );
}
