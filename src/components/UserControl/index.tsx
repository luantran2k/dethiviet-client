import { Box, Button, Menu, MenuItem, Popover } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { signOut } from "../../redux/slices/appSlice";
import PopupMenu from "../PopupMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack } from "@mui/system";

export interface IUserControlProps {}

export default function UserControl(props: IUserControlProps) {
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const userInfo = useAppSelector((state) => state.app.userInfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <Box>
            {isSignIn ? (
                <PopupMenu
                    popOverProps={{
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                    }}
                    trigger={
                        <Box
                            margin="1rem 2rem"
                            height="2.4rem"
                            width="2.4rem"
                            borderRadius="50%"
                            overflow="hidden"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ cursor: "pointer" }}
                        >
                            {userInfo?.profileImg ? (
                                <img
                                    src={userInfo.profileImg}
                                    style={{ height: "100%" }}
                                />
                            ) : (
                                <AccountCircleIcon fontSize="large" />
                            )}
                        </Box>
                    }
                >
                    <Stack>
                        <MenuItem
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            Trang cá nhân
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                dispatch(signOut());
                                navigate("/");
                            }}
                        >
                            Đăng xuất
                        </MenuItem>
                    </Stack>
                </PopupMenu>
            ) : (
                <MenuItem
                    onClick={() => {
                        navigate("/signIn");
                    }}
                >
                    Đăng nhập
                </MenuItem>
            )}
        </Box>
    );
}
