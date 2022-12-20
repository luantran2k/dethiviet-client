import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface IExamTitleProps {
    id: number;
    title: string;
}

export default function ExamTitle(props: IExamTitleProps) {
    const navigate = useNavigate();
    const { id, title } = props;
    return (
        <Typography
            variant="h6"
            onClick={() => {
                navigate("/exam/detail/" + id);
            }}
            title={title}
            sx={{
                flex: 1,
                cursor: "pointer",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                "&:hover": {
                    color: teal[700],
                },
            }}
        >
            {title}
        </Typography>
    );
}
