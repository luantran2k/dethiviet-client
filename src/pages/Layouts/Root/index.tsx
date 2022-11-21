import { Outlet } from "react-router-dom";
import AppLoading from "../../../components/AppLoading";
import Navbar from "../../../components/Navbar";

export interface IRootProps {}

export default function Root(props: IRootProps) {
    return (
        <div>
            <Navbar />
            <AppLoading />
            <Outlet />
        </div>
    );
}
