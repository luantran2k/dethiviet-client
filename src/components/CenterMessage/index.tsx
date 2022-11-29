import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export interface ICenterMessageProps {
    message: string;
}

export default function CenterMessage(props: ICenterMessageProps) {
    const { message } = props;
    return (
        <Box
            width="100vw"
            height="calc(100vh - 8rem)"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Typography
                variant="h2"
                fontSize="3rem"
                fontWeight="500"
                color={grey[800]}
            >
                {message}
            </Typography>
        </Box>
    );
}
