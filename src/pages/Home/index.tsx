import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./homePage.scss";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    const navigate = useNavigate();
    return (
        <div className="home-page">
            <h1>This is home page</h1>
            <Button
                onClick={() => {
                    navigate("exam");
                }}
                variant="contained"
            >
                Exam
            </Button>
            <Outlet />
        </div>
    );
}
