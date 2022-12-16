import { Edit } from "@mui/icons-material";
import { Button, Stack, Typography, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../../app/hooks";
import AppModal from "../../../../components/Modal";
import { sendAlert, User } from "../../../../redux/slices/appSlice";
import request from "../../../../Utils/request";
import ultis from "../../../../Utils/ultis";

interface UpdateInfo {
    id?: number;
    email: string;
    phone: string;
    password: string;
}
export interface IUpdateProfileModalProps {
    userInfo: User;
    setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function UpdateProfileModal(props: IUpdateProfileModalProps) {
    const { userInfo, setUserInfo } = props;

    const [email, setEmail] = useState(userInfo.email || "");
    const [phone, setPhone] = useState(userInfo.phone || "");
    const [password, setPassword] = useState("");
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            email,
            phone,
            password,
        };
        if (email != "" && !ultis.isEmail(email)) {
            dispatch(
                sendAlert({
                    message: "Email không hợp lệ, vui lòng thử lại",
                    severity: "error",
                })
            );
            return;
        }

        const res = await request.patch<UpdateInfo>(
            "users/" + userInfo.id,
            payload
        );
        const { id, ...data } = res;
        if (id) {
            setUserInfo({ ...userInfo, ...data });
            dispatch(
                sendAlert({
                    message: "Cập nhật thành công",
                    severity: "success",
                })
            );
        }
    };

    return (
        <AppModal
            open={isOpen}
            trigger={
                <Button variant="contained" sx={{ mt: "2rem" }}>
                    <Edit />
                </Button>
            }
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <Stack spacing={2}>
                    <Typography variant="h6">Cập nhật thông tin</Typography>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        label="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{ alignSelf: "center" }}
                        type="submit"
                    >
                        Cập nhật
                    </Button>
                </Stack>
            </form>
        </AppModal>
    );
}
