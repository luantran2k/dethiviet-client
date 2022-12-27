import { TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterInfo } from "../..";
import { useAppDispatch } from "../../../../app/hooks";
import { signUp } from "../../../../redux/slices/appSlice";
import ultis from "../../../../Utils/ultis";
import styles from "../../styles.module.scss";

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form + " " + styles.signUp}
        >
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
                {...register("email", {
                    required: true,
                })}
                helperText={ultis.getFormErrorMessage({
                    error: errors.email?.type,
                })}
                error={Boolean(errors.email?.type)}
                label="Email"
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
