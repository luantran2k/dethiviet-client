import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import * as React from "react";

export interface IAccountSettingProps {}

export default function AccountSetting(props: IAccountSettingProps) {
    return (
        <div style={{ margin: "2rem" }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                lineHeight="2"
                borderBottom={`2px solid ${teal[500]}`}
            >
                Cài đặt tài khoản
            </Typography>
        </div>
    );
}
