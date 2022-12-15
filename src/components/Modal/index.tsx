import {
    Backdrop,
    Box,
    Button,
    Fade,
    Modal,
    SxProps,
    Theme,
} from "@mui/material";
import * as React from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 600,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export interface AppModalProps {
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAppModalComponentProps {
    children: React.ReactElement;
    trigger?: React.ReactElement;
    buttonStartIcon?: React.ReactElement;
    buttonEndIcon?: React.ReactElement;
    buttonText?: string;
    buttonVariant?: "contained" | "outlined" | "text";
    buttonStyle?: SxProps<Theme>;
    buttonTitle?: string;
    sx?: SxProps<Theme> | undefined;
    open?: boolean;
}

export default function AppModal(props: IAppModalComponentProps) {
    const {
        children,
        trigger,
        buttonStartIcon,
        buttonEndIcon,
        buttonText,
        buttonVariant = "contained",
        buttonStyle,
        buttonTitle,
        sx,
        open: openProp = false,
    } = props;
    const [open, setOpen] = React.useState(openProp);
    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
    };
    return (
        <>
            {trigger ? (
                React.cloneElement(trigger, { onClick: handleOpen })
            ) : (
                <Button
                    onClick={handleOpen}
                    variant={buttonVariant}
                    sx={buttonStyle}
                    title={buttonTitle}
                >
                    {buttonStartIcon}
                    {buttonText}
                    {buttonEndIcon}
                </Button>
            )}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={sx ? { ...style, ...sx } : style}>{children}</Box>
                </Fade>
            </Modal>
        </>
    );
}
