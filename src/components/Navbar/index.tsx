import { AppBar, Box, MenuItem, Toolbar } from "@mui/material";
import { Stack } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../redux/slices/appSlice";
import AppBarSearch from "../Search/AppBarSearch";
import UserControl from "../UserControl";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar sx={{ alignItems: "center" }}>
                <Stack direction="row" flexGrow={1} alignItems="center">
                    <Link to="/">
                        <img
                            src="/image/logo/white_logo.png"
                            style={{ height: "1.4rem" }}
                        />
                    </Link>
                    <MenuItem
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Trang chủ
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate("/exam");
                        }}
                    >
                        Đề thi
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            navigate("/about");
                        }}
                    >
                        Giới thiệu
                    </MenuItem>
                </Stack>
                <AppBarSearch />
                <UserControl />
            </Toolbar>
        </AppBar>
    );
}
