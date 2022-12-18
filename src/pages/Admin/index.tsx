import {
    ArticleRounded,
    DashboardRounded,
    ErrorRounded,
    PersonRounded,
} from "@mui/icons-material";
import {
    Box,
    Grid,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector, useAuth } from "../../app/hooks";

export interface IAdminPageProps {}

export default function AdminPage(props: IAdminPageProps) {
    useAuth({ role: "admin" });
    const user = useAppSelector((state) => state.app.userInfo);
    return (
        <Grid container height={"100vh"}>
            <Grid
                item
                minWidth={"20rem"}
                borderRight={`1px solid ${grey[300]}`}
            >
                <img
                    src="/image/logo/teal_logo.png"
                    style={{
                        width: "12rem",
                        display: "block",
                        margin: "2rem auto",
                    }}
                />

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
            </Grid>
            <Grid item flex={1} padding="2rem">
                <Outlet />
            </Grid>
        </Grid>
    );
}
