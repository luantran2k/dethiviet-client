import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import * as React from "react";

export interface IDeleteButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function DeleteButton(props: IDeleteButtonProps) {
    const { onClick } = props;
    return (
        <Button
            sx={{
                opacity: 0.2,
                "&:hover": {
                    opacity: 1,
                },
                transition: "all 0.6s",
            }}
            onClick={onClick}
        >
            <Delete />
        </Button>
    );
}
