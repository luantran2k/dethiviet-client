import { Box, Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    const navigate = useNavigate();
    return (
        <Box className={styles.homePage}>
            <section className={styles.hero + " container"}>
                <div className={styles.heroContent}>
                    <Typography
                        variant="h1"
                        fontSize="4rem"
                        fontWeight="500"
                        color={grey[900]}
                    >
                        Tạo đề thi nhanh chóng và dễ dàng
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        fontSize="1.4rem"
                        color={grey[800]}
                        my={3}
                    >
                        Khám phá kho tài liệu khổng lồ và đa dạng. Dễ dàng kiểm
                        tra trình độ với các bài thi thử
                    </Typography>

                    <Stack direction="row" gap={2}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/exam")}
                        >
                            Tìm kiếm bài thi
                        </Button>
                        <Button variant="outlined">Tạo bài thi mới</Button>
                    </Stack>
                </div>
                <div className={styles.imageBox}>
                    <img
                        className={styles.heroImage}
                        src="/image/homePage/hero.png"
                    />
                </div>
            </section>
        </Box>
    );
}
