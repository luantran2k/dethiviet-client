import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./homePage.scss";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    const navigate = useNavigate();
    return (
        <Box className="home-page">
            <h1>Home page</h1>
        </Box>
    );
}
