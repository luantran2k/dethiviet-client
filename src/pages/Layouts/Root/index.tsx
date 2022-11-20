import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

export interface IRootProps {}

export default function Root(props: IRootProps) {
    return (
        <div>
            <Outlet />
        </div>
    );
}
