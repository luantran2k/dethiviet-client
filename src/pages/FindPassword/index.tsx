import { Button, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/hooks";
import { sendAlert } from "../../redux/slices/appSlice";
import ultis from "../../Utils/ultis";

export interface IFindPasswordPageProps {}

interface FindPass {
    email: string;
    code: string;
    password: string;
    rePassword: string;
}

export default function FindPasswordPage(props: IFindPasswordPageProps) {
    const [email, setEmail] = useState("");
    const { handleSubmit, register, getValues, watch } = useForm<FindPass>();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<FindPass> = (data) => {
        if (data.password !== data.rePassword) {
            dispatch(
                sendAlert({
                    message: "Mật khẩu không khớp, vui lòng thử lại",
                    severity: "error",
                })
            );
            return;
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                maxWidth="40rem"
                margin="2rem auto"
                padding="2rem"
                boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                spacing={2}
            >
                <Typography variant="h3" fontSize="2rem" textAlign="center">
                    Tìm mật khẩu
                </Typography>
                <Stack direction="row" spacing={2}>
                    <TextField
                        {...register("email", {
                            required: true,
                        })}
                        type="email"
                        label="Email"
                        placeholder="Nhập email để nhận mã xác minh"
                        sx={{ flex: 1 }}
                    />
                    <Button
                        variant="outlined"
                        disabled={!Boolean(watch("email"))}
                        onClick={() => {
                            const email = getValues("email");
                            if (ultis.isEmail(email)) {
                                dispatch(
                                    sendAlert({
                                        message:
                                            "Gửi thành công, vui lòng kiểm tra email",
                                        severity: "success",
                                    })
                                );
                            } else {
                                dispatch(
                                    sendAlert({
                                        message:
                                            "Email không hợp lệ, vui lòng nhập lại",
                                        severity: "error",
                                    })
                                );
                            }
                        }}
                    >
                        {" "}
                        Gửi mã
                    </Button>
                </Stack>
                <TextField
                    {...register("code", {
                        required: true,
                    })}
                    label="Mã xác minh"
                    placeholder="Nhập email để nhận mã xác minh"
                    sx={{ flex: 1 }}
                />
                <TextField
                    {...register("password", {
                        required: true,
                    })}
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Nhập email để nhận mã xác minh"
                    sx={{ flex: 1 }}
                />
                <TextField
                    {...register("rePassword", {
                        required: true,
                    })}
                    label="Nhập lại mật khẩu"
                    type="password"
                    placeholder="Nhập email để nhận mã xác minh"
                    sx={{ flex: 1 }}
                />
                <Button variant="contained" type="submit">
                    Lưu
                </Button>
            </Stack>
        </form>
    );
}
