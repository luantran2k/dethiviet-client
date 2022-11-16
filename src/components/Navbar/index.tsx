import { AppBar, Toolbar } from "@mui/material";
import * as React from "react";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
    return (
        <AppBar position="static">
            <Toolbar></Toolbar>
        </AppBar>
    );
}
