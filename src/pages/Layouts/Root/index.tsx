import { Outlet } from "react-router-dom";

export interface IRootProps {}

export default function Root(props: IRootProps) {
    return (
        <div>
            <h1 className="text-3xl font-b">Nav</h1>
            <Outlet />
        </div>
    );
}
