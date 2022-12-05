import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { Link, NavLink, useLocation } from "react-router-dom";
import ultis from "../../Utils/ultis";
import ExamSelected from "../ExamSelected";
import AppBarSearch from "../Search/AppBarSearch";
import UserControl from "../UserControl";
import "./style.scss";

export interface INavbarProps {}

export const tealNavBarPath = ["/exam/edit", "/exam/practice"];

export default function Navbar(props: INavbarProps) {
    const location = useLocation();
    const isTealNav = ultis.checkPathInArray(location.pathname, tealNavBarPath);
    return (
        <Box className={`app-bar ${isTealNav ? "teal-nav" : ""}`}>
            <Stack direction="row" sx={{ padding: "0 4rem" }}>
                <Stack
                    direction="row"
                    flexGrow={1}
                    columnGap={2}
                    alignItems="center"
                    height="4rem"
                >
                    <Link to="/">
                        <img
                            src={`/image/logo/${
                                isTealNav ? "white" : "teal"
                            }_logo.png`}
                            style={{ height: "1.4rem" }}
                        />
                    </Link>
                    <Stack direction="row" className="main-nav">
                        <NavLink to="/">Trang chủ</NavLink>
                        <NavLink to="/exam">Đề thi</NavLink>
                        <NavLink to="/discussion">Thảo luận</NavLink>
                    </Stack>
                </Stack>
                <AppBarSearch />
                <ExamSelected />
                <UserControl />
            </Stack>
        </Box>
    );
}
