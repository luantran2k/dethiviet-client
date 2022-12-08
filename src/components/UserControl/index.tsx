import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Image } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../redux/slices/appSlice";
import request from "../../Utils/request";
import AppModal from "../Modal";
import PopupMenu from "../PopupMenu";
import { useRef, useState } from "react";
import RepportError from "../ReportError";

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
                        <AppModal trigger={<MenuItem>Báo cáo lỗi</MenuItem>}>
                            <RepportError />
                        </AppModal>
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
