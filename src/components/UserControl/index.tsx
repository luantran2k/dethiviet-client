import { Box, Button, Menu, MenuItem, Popover } from "@mui/material";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import PopupMenu from "../PopupMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack } from "@mui/system";
import { signOut } from "../../redux/slices/appSlice";
import request from "../../Utils/request";

export interface IUserControlProps {}

export default function UserControl(props: IUserControlProps) {
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const userInfo = useAppSelector((state) => state.app.userInfo);
    const location = useLocation();
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
                            margin="1rem 0 1rem 1rem"
                            height="2rem"
                            width="2rem"
                            borderRadius="50%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ cursor: "pointer" }}
                        >
                            <img
                                src={
                                    userInfo?.profileImg
                                        ? userInfo.profileImg
                                        : "/image/user/profile.png"
                                }
                                style={{ height: "100%" }}
                            />
                        </Box>
                    }
                >
                    <Stack>
                        <MenuItem
                            onClick={() => {
                                navigate(`/user/${userInfo?.id}/info`);
                            }}
                        >
                            Trang cá nhân
                        </MenuItem>
                        <MenuItem
                            onClick={async () => {
                                try {
                                    await request.get("auth/signOut");
                                } catch (err) {
                                    console.log(err);
                                } finally {
                                    dispatch(signOut());
                                    navigate(location.pathname || "/");
                                }
                            }}
                        >
                            Đăng xuất
                        </MenuItem>
                    </Stack>
                </PopupMenu>
            ) : (
                <MenuItem
                    onClick={() => {
                        navigate("/signIn", {
                            state: {
                                from: location.pathname,
                            },
                        });
                    }}
                    sx={{ height: "100%" }}
                >
                    Đăng nhập
                </MenuItem>
            )}
        </Box>
    );
}
