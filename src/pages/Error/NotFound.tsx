import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./notFound.module.scss";

export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
    const navigate = useNavigate();
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <img src="/image/404.png" className={styles.notFoundImg} />
                <Typography variant="h1" fontSize="4rem">
                    Đường dẫn không tồn tại
                </Typography>
                <Button size="large" onClick={() => navigate("/")}>
                    Về trang chủ
                </Button>
            </div>
        </div>
    );
}
