import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import styles from "./style.module.scss";

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
    return (
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <TextField label="Tên tài khoản" />
            <TextField type="password" label="Mật khẩu" />
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
    return (
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
            <TextField label="Tên tài khoản" />
            <TextField type="password" label="Mật khẩu" />
            <TextField type="password" label="Nhập lại mật khẩu" />
            <Button type="submit" variant="contained">
                Đăng ký
            </Button>
            <Button variant="outlined" onClick={() => setIsLogin(true)}>
                Về trang đăng nhập
            </Button>
        </form>
    );
}
