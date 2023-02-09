import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../themes";
import ultis from "../../Utils/ultis";
import ExamSelected from "../ExamSelected";
import AppBarSearch from "../Search/AppBarSearch";
import UserControl from "../UserControl";
import "./styles.scss";
import { Adb as AdbIcon, Menu as MenuIcon } from "@mui/icons-material";
import { teal } from "@mui/material/colors";

export interface INavbarProps {}

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const tealNavBarPath = ["/exam/edit", "/exam/practice", "/exam/result"];

export default function Navbar(props: INavbarProps) {
    const location = useLocation();
    const naviagte = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const isTealNav = ultis.checkPathInArray(location.pathname, tealNavBarPath);
    return (
        <AppBar
            position="static"
            className={`app-bar ${isTealNav ? "teal-nav" : ""}`}
            sx={{ backgroundColor: "white" }}
        >
            <Container>
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{
                                color: isTealNav ? "white" : teal[600],
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    naviagte("/");
                                }}
                            >
                                Trang chủ
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    naviagte("/exam");
                                }}
                            >
                                Đề thi
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    naviagte("/discussion");
                                }}
                            >
                                Thảo luận
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box
                        className="main-nav"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Stack direction="row" className="main-nav">
                            <Link to="/">
                                <img
                                    src={`/image/logo/${
                                        isTealNav ? "white" : "teal"
                                    }_logo.png`}
                                    style={{ height: "1.4rem" }}
                                />
                            </Link>
                            <NavLink to="/">Trang chủ</NavLink>
                            <NavLink to="/exam">Đề thi</NavLink>
                            <NavLink to="/discussion">Thảo luận</NavLink>
                        </Stack>
                    </Box>
                    <Box sx={{}}>
                        <AppBarSearch />
                    </Box>
                    <ExamSelected />
                    <UserControl />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
