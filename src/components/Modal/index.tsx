import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
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
    width: 600,
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
    } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const childerWithSetOpenEvent = React.cloneElement(children, { setOpen });
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
                    <Box sx={style}>{childerWithSetOpenEvent}</Box>
                </Fade>
            </Modal>
        </>
    );
}
