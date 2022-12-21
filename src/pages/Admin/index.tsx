import {
    ArticleRounded,
    DashboardRounded,
    ErrorRounded,
    LogoutRounded,
    PersonRounded,
} from "@mui/icons-material";
import {
    Grid,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../../app/hooks";
import AppALert from "../../components/AppAlert";
import AppLoading from "../../components/AppLoading";
import { signOut } from "../../redux/slices/appSlice";
import request from "../../Utils/request";

export interface IAdminPageProps {}

export default function AdminPage(props: IAdminPageProps) {
    useAuth({ role: "admin" });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.userInfo);
    return (
        <Grid container height={"100vh"}>
            <AppALert />
            <AppLoading />
            <Grid
                item
                flexBasis={"20rem"}
                borderRight={`1px solid ${grey[300]}`}
            >
                <Link to="/">
                    {" "}
                    <img
                        src="/image/logo/teal_logo.png"
                        style={{
                            width: "10rem",
                            display: "block",
                            margin: "2rem auto",
                        }}
                    />
                </Link>

                <Stack
                    direction="row"
                    bgcolor={teal[50]}
                    margin={"0 1rem"}
                    padding={"1rem"}
                    borderRadius=".4rem"
                    spacing={2}
                    alignItems="center"
                >
                    <img
                        src={user?.profileImg}
                        alt="Avatar"
                        style={{ width: "2.8rem" }}
                    />
                    <Typography>
                        {user?.name || "@" + user?.username}
                    </Typography>
                </Stack>

                <Stack
                    marginTop={6}
                    margin={2}
                    sx={{
                        ".MuiListItemIcon-root": {
                            color: teal[500],
                        },
                        ".MuiMenuItem-root": {
                            borderRadius: " .4rem",
                            padding: "1rem",
                        },
                        a: {
                            color: "black",
                            textDecoration: "none",
                        },
                        ".active": {
                            backgroundColor: teal[50],
                        },
                    }}
                >
                    <NavLink to={"home"}>
                        <MenuItem>
                            <ListItemIcon>
                                <DashboardRounded />
                            </ListItemIcon>
                            <ListItemText>Tổng quan</ListItemText>
                        </MenuItem>
                    </NavLink>

                    <NavLink to={"users"}>
                        <MenuItem>
                            <ListItemIcon>
                                <PersonRounded />
                            </ListItemIcon>
                            <ListItemText>Người dùng</ListItemText>
                        </MenuItem>
                    </NavLink>
                    <NavLink to={"exams"}>
                        <MenuItem>
                            <ListItemIcon>
                                <ArticleRounded />
                            </ListItemIcon>
                            <ListItemText>Đề thi</ListItemText>
                        </MenuItem>
                    </NavLink>
                    <NavLink to={"errors"}>
                        <MenuItem>
                            <ListItemIcon>
                                <ErrorRounded />
                            </ListItemIcon>
                            <ListItemText>Lỗi</ListItemText>
                        </MenuItem>
                    </NavLink>
                </Stack>
                <MenuItem
                    sx={{ padding: "1rem", margin: "1rem" }}
                    onClick={async () => {
                        try {
                            await request.get("auth/signOut");
                        } catch (err) {
                            console.log(err);
                        } finally {
                            navigate("/");
                            dispatch(signOut());
                        }
                    }}
                >
                    <ListItemIcon>
                        <LogoutRounded sx={{ color: teal[600] }} />
                    </ListItemIcon>
                    <ListItemText>Đăng xuất</ListItemText>
                </MenuItem>
            </Grid>
            <Grid item flex={1} padding="2rem">
                <Outlet />
            </Grid>
        </Grid>
    );
}
