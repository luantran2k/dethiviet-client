import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updatePart } from "../../../redux/slices/examSlice";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";
import { AppModalProps } from "../../Modal";
import IPart from "../interfaces/IPart";
import { PartPayLoad } from "./create";

export interface IUpdatePartModalProps extends AppModalProps {
    partId: number;
}

export default function UpdatePartModal(props: IUpdatePartModalProps) {
    const { setOpen, partId } = props;
    const part = useAppSelector((state) =>
        state.exam.parts?.find((part) => part.id === partId)
    );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PartPayLoad>({
        defaultValues: {
            title: part?.title,
            description: part?.description,
            totalPoints: part?.totalPoints,
        },
    });
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<PartPayLoad> = async (data) => {
        const part = await request.patch<IPart>("/parts/" + partId, {
            ...data,
        });
        dispatch(updatePart({ ...part, id: partId }));
        if (setOpen) {
            setOpen(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" paddingBottom={4}>
                Chỉnh sửa phần
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
                <Grid item xs={12}>
                    <TextField
                        type="number"
                        {...register("totalPoints", {
                            valueAsNumber: true,
                            required: false,
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
            </Grid>
            <Box marginTop={2}>
                <Button type="submit" variant="contained">
                    Cập nhật
                </Button>
            </Box>
        </form>
    );
}
