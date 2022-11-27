import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    const navigate = useNavigate();
    return (
        <Box className={styles.homePage}>
            <h1 className={styles.red}>Home page</h1>
            <img className={styles.heroImage} src="/image/homePage/hero.png" />
        </Box>
    );
}
