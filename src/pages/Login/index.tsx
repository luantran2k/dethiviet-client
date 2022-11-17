import { TryOutlined } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ultis from "../../Utils/ultis";
import styles from "./style.module.scss";

interface LoginInfo {
    userName: string;
    password: string;
}

interface RegisterInfo extends LoginInfo {
    confirmPassword: string;
}

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.decor}>
                    <img
                        src="/image/login/loginDecor.jpg"
                        className={styles.imageDecor}
                    />
                </div>
                <div className={styles.login}>
                    <img
                        src="/image/logo/teal_logo.png"
                        className={styles.logo}
                    />
                    {isLogin ? (
                        <LoginForm setIsLogin={setIsLogin} />
                    ) : (
                        <RegisterForm setIsLogin={setIsLogin} />
                    )}
                </div>
            </div>
        </div>
    );
}

export function LoginForm(props: {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { setIsLogin } = props;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginInfo>();

    const onSubmit: SubmitHandler<LoginInfo> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextField
                {...register("userName", {
                    required: true,
                    maxLength: 50,
                    minLength: 5,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.userName?.type,
                    minLength: 5,
                    maxLength: 50,
                })}
                error={Boolean(errors.userName?.type)}
                label="Tên tài khoản"
            />
            <TextField
                type="password"
                label="Mật khẩu"
                {...register("password", {
                    required: true,
                    maxLength: 50,
                    minLength: 6,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.password?.type,
                    minLength: 6,
                    maxLength: 50,
                })}
                error={Boolean(errors.password?.type)}
            />
            <Button type="submit" variant="contained">
                Đăng nhập
            </Button>
            <Typography textAlign="center" color={grey[600]}>
                hoặc
            </Typography>
            <Button variant="outlined" onClick={() => setIsLogin(false)}>
                Đăng ký
            </Button>
        </form>
    );
}

export function RegisterForm(props: {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { setIsLogin } = props;

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<RegisterInfo>();

    const onSubmit: SubmitHandler<RegisterInfo> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextField
                {...register("userName", {
                    required: true,
                    maxLength: 50,
                    minLength: 5,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.userName?.type,
                    minLength: 5,
                    maxLength: 50,
                })}
                error={Boolean(errors.userName?.type)}
                label="Tên tài khoản"
            />
            <TextField
                type="password"
                label="Mật khẩu"
                {...register("password", {
                    required: true,
                    maxLength: 50,
                    minLength: 6,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.password?.type,
                    minLength: 6,
                    maxLength: 50,
                })}
                error={Boolean(errors.password?.type)}
            />
            <TextField
                type="password"
                label="Nhập lại mật khẩu"
                {...register("confirmPassword", {
                    required: true,
                    maxLength: 50,
                    minLength: 6,
                    validate: (value: string) => {
                        if (watch("password") !== value)
                            return "Mật khẩu không khớp";
                    },
                })}
                helperText={errors.confirmPassword?.message}
                error={Boolean(errors.confirmPassword?.type)}
            />
            <Button type="submit" variant="contained">
                Đăng ký
            </Button>
            <Button variant="outlined" onClick={() => setIsLogin(true)}>
                Về trang đăng nhập
            </Button>
        </form>
    );
}
