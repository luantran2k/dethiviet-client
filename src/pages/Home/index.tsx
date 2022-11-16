import { Link, Outlet } from "react-router-dom";
import "./homePage.scss";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    return (
        <div className="home-page">
            <h1>This is home page</h1>
            <Outlet />
        </div>
    );
}
