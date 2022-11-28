import { MoreVert } from "@mui/icons-material";
import { Button, Popover, PopoverProps, SxProps, Theme } from "@mui/material";
import * as React from "react";

export interface IPopupMenuProps {
    children: React.ReactElement;
    trigger?: React.ReactElement;
    popOverProps?: Partial<PopoverProps>;
    sx?: SxProps<Theme> | undefined;
}

export default function PopupMenu(props: IPopupMenuProps) {
    const { children, trigger, popOverProps, sx } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
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
                sx={sx}
                {...popOverProps}
            >
                {children}
            </Popover>
        </div>
    );
}
