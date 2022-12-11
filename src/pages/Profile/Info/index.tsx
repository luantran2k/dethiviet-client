import { Grid, TextField, Typography } from "@mui/material";
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
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        placeholder="Chưa cập nhật"
                        value={userInfo?.name}
                        label="Tên hiển thị"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        disabled
                        placeholder="Chưa cập nhật"
                        value={userInfo?.username}
                        label="Tên tài khoản"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        placeholder="Chưa cập nhật"
                        value={userInfo?.email}
                        label="Email liên hệ"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        placeholder="Chưa cập nhật"
                        value={userInfo?.phone}
                        label="Số điện thoại liên hệ"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        disabled
                        placeholder="Chưa cập nhật"
                        value={userInfo?.createAt}
                        label="Ngày tham gia"
                    />
                </Grid>
            </Grid>
        </div>
    );
}
