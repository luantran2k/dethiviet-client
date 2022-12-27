import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AppALert from "../../components/AppAlert";
import AppLoading from "../../components/AppLoading";
import { setIsSignIn, signIn, signUp } from "../../redux/slices/appSlice";
import ultis from "../../Utils/ultis";
import LoginForm from "./Form/LoginForm";
import { RegisterForm } from "./Form/RegisterForm";
import styles from "./styles.module.scss";

export interface LoginInfo {
    username: string;
    password: string;
}

export interface RegisterInfo extends LoginInfo {
    confirmPassword: string;
    email: string;
}

export default function LoginPage() {
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const location = useLocation();
    const from = location.state?.from || "/";
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isSignIn) {
            navigate(from, { replace: true });
        } else {
            const isRefreshTokenExpire = ultis.checkRefreshTokenExpire();
            if (isRefreshTokenExpire) {
                dispatch(setIsSignIn());
            }
        }
    }, [isSignIn]);

    return (
        <div className={styles.container}>
            <AppLoading />
            <AppALert />
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
