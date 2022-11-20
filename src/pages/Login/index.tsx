import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setIsSignIn, signIn, signUp } from "../../redux/slices/appSlice";
import ultis from "../../Utils/ultis";
import styles from "./style.module.scss";

interface LoginInfo {
    username: string;
    password: string;
}

interface RegisterInfo extends LoginInfo {
    confirmPassword: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const location = useLocation();
    const from = location.state?.from || "/";
    const dispatch = useAppDispatch();
    useEffect(() => {
        const checkRefreshTokenExpire = () => {
            const refreshToken = localStorage.getItem("refreshToken");
            if (
                refreshToken &&
                new Date(ultis.parseJwt(refreshToken).exp * 1000) >= new Date()
            ) {
                return true;
            }
            return false;
        };
        const isRefreshTokenExpire = checkRefreshTokenExpire();
        if (isRefreshTokenExpire) {
            dispatch(setIsSignIn(isRefreshTokenExpire));
        }
        if (isSignIn) {
            navigate(from, { replace: true });
        }
    });

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
                    {isSignInForm ? (
                        <LoginForm setIsSignInForm={setIsSignInForm} />
                    ) : (
                        <RegisterForm setIsSignInForm={setIsSignInForm} />
                    )}
                </div>
            </div>
        </div>
    );
}

export function LoginForm(props: {
    setIsSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { setIsSignInForm } = props;
    const dispatch = useAppDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginInfo>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginInfo> = (data) => {
        dispatch(signIn(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextField
                {...register("username", {
                    required: true,
                    maxLength: 50,
                    minLength: 5,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.username?.type,
                    minLength: 5,
                    maxLength: 50,
                })}
                error={Boolean(errors.username?.type)}
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
            <Button variant="outlined" onClick={() => setIsSignInForm(false)}>
                Đăng ký
            </Button>
        </form>
    );
}

export function RegisterForm(props: {
    setIsSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { setIsSignInForm } = props;
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<RegisterInfo>();

    const onSubmit: SubmitHandler<RegisterInfo> = (data) => {
        dispatch(signUp(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <TextField
                {...register("username", {
                    required: true,
                    maxLength: 50,
                    minLength: 5,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.username?.type,
                    minLength: 5,
                    maxLength: 50,
                })}
                error={Boolean(errors.username?.type)}
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
            <Button variant="outlined" onClick={() => setIsSignInForm(true)}>
                Về trang đăng nhập
            </Button>
        </form>
    );
}
