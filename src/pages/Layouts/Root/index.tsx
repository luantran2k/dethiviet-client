import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

export interface IRootProps {}

export default function Root(props: IRootProps, fitPageList: string[]) {
    return (
        <Box>
            <Navbar />
            <Box height="calc(100vh - 4rem)" sx={{ overflowY: "auto" }}>
                <Outlet />
            </Box>
        </Box>
    );
}
