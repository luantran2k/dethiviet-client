import { AppBar, Button, MenuItem, Toolbar } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../redux/slices/appSlice";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                {isSignIn && (
                    <MenuItem
                        onClick={() => {
                            dispatch(signOut());
                            navigate("/signIn");
                        }}
                    >
                        Đăng xuất
                    </MenuItem>
                )}
            </Toolbar>
        </AppBar>
    );
}
