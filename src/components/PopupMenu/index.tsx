import { MoreVert, Delete, Edit } from "@mui/icons-material";
import { Button, MenuItem, Popover, Stack, Typography } from "@mui/material";
import * as React from "react";

export interface IPopupMenuProps {
    children: React.ReactElement;
}

export default function PopupMenu(props: IPopupMenuProps) {
    const { children } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div>
            <Button
                aria-describedby={id}
                sx={{ minHeight: 0, minWidth: 0, padding: 1 }}
                onClick={handleClick}
            >
                <MoreVert />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                {children}
            </Popover>
        </div>
    );
}
