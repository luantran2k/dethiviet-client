import { Image } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import AppModal from "../Modal";

export interface IImageFullViewProps {
    imageUrl: string;
    trigger?: React.ReactElement;
}

export default function ImageFullView(props: IImageFullViewProps) {
    const { imageUrl, trigger } = props;
    return (
        <AppModal
            trigger={
                trigger || (
                    <Button>
                        <Image />
                    </Button>
                )
            }
            sx={{
                width: "68rem",
                maxHeight: "90vh",
                maxWidth: "90vw",
                overflow: "auto",
            }}
        >
            <Box>
                <img
                    src={imageUrl}
                    alt=""
                    style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>
        </AppModal>
    );
}
