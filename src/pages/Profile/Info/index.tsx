import { Edit } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserInfo } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import AppModal from "../../../components/Modal";
import { sendAlert } from "../../../redux/slices/appSlice";
import ultis from "../../../Utils/ultis";
import UpdateProfileModal from "./modal/update";
import styles from "./styles.module.scss";

export interface IUserProfileInfoProps {}

export default function UserProfileInfo(props: IUserProfileInfoProps) {
    const { userInfo: userInfoProp } = useUserInfo();
    const [userInfo, setUserInfo] = useState(userInfoProp);
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.app.userInfo);

    return (
        <div className={styles.userInfo}>
            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                lineHeight="2"
                borderBottom={`2px solid ${teal[500]}`}
            >
                Thông tin cá nhân
            </Typography>
            <ul className={styles.userInfoList}>
                <li>
                    <span>Usename: </span> {userInfo?.username}
                </li>
                <li>
                    <span>Email: </span> {userInfo?.email || "Chưa cập nhật"}
                </li>
                <li>
                    <span>Số điện thoại: </span>
                    {userInfo?.phone || "Chưa cập nhật"}
                </li>
                <li>
                    <span>Ngày tham gia: </span>
                    {ultis.formatDate(userInfo?.createdAt) || "Không rõ"}
                </li>
            </ul>
            {userInfo?.id === user?.id && userInfo && (
                <UpdateProfileModal
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                />
            )}
        </div>
    );
}
