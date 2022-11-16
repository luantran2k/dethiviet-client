import * as React from "react";
import { Link } from "react-router-dom";

export interface IContactProps {}

export default function ContactPage(props: IContactProps) {
    return (
        <div>
            <h1>Contact page</h1>
            <p>
                <Link to="/">Back to home</Link>
            </p>
        </div>
    );
}
