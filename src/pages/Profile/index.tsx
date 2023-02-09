import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useOutletContext, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { User } from "../../redux/slices/appSlice";
import request from "../../Utils/request";
import "./styles.scss";

export interface IProfilePageProps {}
type ContextType = { userInfo: User | null };

export default function ProfilePage(props: IProfilePageProps) {
    const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
    const { userId } = useParams();
    const user = useAppSelector((state) => state.app.userInfo);
    useEffect(() => {
        const getUserInfo = async () => {
            const userInfo = await request.get<any, User>("users/" + userId);
            setUserInfo(userInfo);
        };
        getUserInfo();
    }, [userId]);
    return (
        <Container>
            <Box width="100vw" overflow="auto">
                {userInfo ? (
                    <div className="profilePage">
                        <div className="menuColumn">
                            <div className="menuPanel">
                                <Box display="flex" justifyContent="center">
                                    <img src={userInfo.profileImg} />
                                </Box>
                                <Typography variant="h5" textAlign="center">
                                    {"@" + userInfo.username}
                                </Typography>
                                <Stack className="menu">
                                    <NavLink to="./info">
                                        Thông tin cá nhân
                                    </NavLink>
                                    <NavLink to="./exams/own">
                                        Bài thi sở hữu
                                    </NavLink>
                                    {user?.id === Number(userId) && (
                                        <>
                                            <NavLink to="./exams/completed">
                                                Bài thi đã làm
                                            </NavLink>
                                            <NavLink to="./exams/favorite">
                                                Bài thi quan tâm
                                            </NavLink>
                                            {/* <NavLink to="./account-setting">
                                            Cài đặt tài khoản
                                        </NavLink> */}
                                        </>
                                    )}
                                </Stack>
                            </div>
                        </div>
                        <div className="profileOutlet">
                            <Outlet context={{ userInfo }} />
                        </div>
                    </div>
                ) : (
                    <Typography>Đang tải dữ liệu</Typography>
                )}
            </Box>
        </Container>
    );
}

export const useUserInfo = () => {
    return useOutletContext<ContextType>();
};
