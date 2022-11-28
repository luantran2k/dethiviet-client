import { Box, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { Outlet, useLocation } from "react-router-dom";
import AppALert from "../../../components/AppAlert";
import Navbar from "../../../components/Navbar";
import ultis from "../../../Utils/ultis";

export interface IRootProps {}

const withoutFooter = ["/exam/edit"];

export default function Root(props: IRootProps, fitPageList: string[]) {
    const location = useLocation();
    const isContainFooter = ultis.checkPathInArray(
        location.pathname,
        withoutFooter
    );
    return (
        <Box>
            <Navbar />
            <Box
                height="calc(100vh - 4rem)"
                sx={{ overflowY: "auto", overflowX: "hidden" }}
            >
                <Box minHeight="calc(100vh - 8rem)">
                    <Outlet />
                </Box>
                {!isContainFooter && (
                    <Box
                        width="100%"
                        height="4rem"
                        sx={{ borderTop: `1px solid ${teal[500]}` }}
                    >
                        <Typography textAlign="center" my="1rem">
                            {`© ${new Date().getFullYear()} Đề thi Việt.`}
                        </Typography>
                    </Box>
                )}
            </Box>
            <AppALert />
        </Box>
    );
}
