import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useUserInfo } from "..";
import styles from "./style.module.scss";

export interface IUserProfileInfoProps {}

export default function UserProfileInfo(props: IUserProfileInfoProps) {
    const { userInfo } = useUserInfo();
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
                <li>Usename: {userInfo?.username}</li>
                <li>Email: {userInfo?.email || "Chưa cập nhật"}</li>
                <li>Số điện thoại {userInfo?.phone || "Chưa cập nhật"} </li>
                <li>Ngày tham gia: {userInfo?.createAt || "Không rõ"}</li>
            </ul>
        </div>
    );
}
