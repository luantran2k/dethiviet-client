import { Box, MenuItem, Toolbar } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AppBarSearch from "../Search/AppBarSearch";
import UserControl from "../UserControl";
import "./style.scss";

export interface INavbarProps {}

const tealNavBarPath = ["/exam/edit"];
const checkTealNav = (locaitonPath: string) => {
    const index = tealNavBarPath.findIndex((path) =>
        locaitonPath.includes(path)
    );
    if (index !== -1) {
        return true;
    }
    return false;
};

export default function Navbar(props: INavbarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const isTealNav = checkTealNav(location.pathname);
    return (
        <Box className={`app-bar ${isTealNav ? "teal-nav" : ""}`}>
            <Toolbar sx={{ alignItems: "center", bacgroundColor: "white" }}>
                <Stack
                    direction="row"
                    flexGrow={1}
                    columnGap={2}
                    alignItems="center"
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
                        <NavLink to="/about">Giới thiệu</NavLink>
                    </Stack>
                </Stack>
                <AppBarSearch />
                <UserControl />
            </Toolbar>
        </Box>
    );
}
