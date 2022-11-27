import { Box, MenuItem, Toolbar } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ultis from "../../Utils/ultis";
import AppBarSearch from "../Search/AppBarSearch";
import UserControl from "../UserControl";
import "./style.scss";

export interface INavbarProps {}

const tealNavBarPath = ["/exam/edit"];

export default function Navbar(props: INavbarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const isTealNav = ultis.checkPathInArray(location.pathname, tealNavBarPath);
    return (
        <Box className={`app-bar ${isTealNav ? "teal-nav" : ""}`}>
            <Toolbar>
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
