import { Box, MenuItem } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "../../redux/slices/appSlice";
import request from "../../Utils/request";
import AppModal from "../Modal";
import PopupMenu from "../PopupMenu";
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
                            margin="0 1rem 0 0 "
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
                        {userInfo?.role.some(
                            (currentRole) => currentRole === "admin"
                        ) && (
                            <MenuItem
                                onClick={() => {
                                    navigate(`/admin`);
                                }}
                            >
                                Quản trị
                            </MenuItem>
                        )}
                        <MenuItem
                            onClick={() => {
                                navigate(`/user/report`);
                            }}
                        >
                            Xem báo cáo lỗi
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
                        sx={{ height: "100%", fontWeight: "bold",color: teal[800] }}
                >
                    Đăng nhập
                </MenuItem>
            )}
        </Box>
    );
}
