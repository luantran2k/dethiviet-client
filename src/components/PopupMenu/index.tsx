import { MoreVert, Delete, Edit } from "@mui/icons-material";
import {
    Button,
    MenuItem,
    Popover,
    PopoverProps,
    Stack,
    Typography,
} from "@mui/material";
import * as React from "react";

export interface IPopupMenuProps {
    children: React.ReactElement;
    trigger?: React.ReactElement;
    popOverProps?: Partial<PopoverProps>;
}

export default function PopupMenu(props: IPopupMenuProps) {
    const { children, trigger, popOverProps } = props;
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
            {trigger ? (
                React.cloneElement(trigger, { onClick: handleClick })
            ) : (
                <Button onClick={handleClick}>
                    <MoreVert />
                </Button>
            )}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                {...popOverProps}
            >
                {children}
            </Popover>
        </div>
    );
}
