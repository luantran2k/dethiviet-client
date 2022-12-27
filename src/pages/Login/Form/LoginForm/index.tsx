import { Button, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginInfo } from "../../";
import { useAppDispatch } from "../../../../app/hooks";
import { sendAlert, signIn } from "../../../../redux/slices/appSlice";
import ultis from "../../../../Utils/ultis";
import styles from "../../styles.module.scss";

export default function LoginForm(props: {
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
            <Button
                onClick={() => {
                    navigate("/findPassword");
                }}
                sx={{ alignSelf: "center" }}
            >
                Quên mật khẩu
            </Button>
        </form>
    );
}
