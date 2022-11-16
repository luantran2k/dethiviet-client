import { Stack } from "@mui/system";
import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

export interface IFitHeightLayoutProps {}

export default function FitHeightLayout(props: IFitHeightLayoutProps) {
    return (
        <Stack height={"100vh"}>
            <Navbar />
            <Outlet />
        </Stack>
    );
}
