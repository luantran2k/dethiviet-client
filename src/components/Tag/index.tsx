import { Add } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

export interface IAppTagProps {
    content: string;
}

export default function AppTag(props: IAppTagProps) {
    const { content } = props;
    return (
        <Stack
            direction="row"
            border={`1px solid ${teal[500]}`}
            width="fit-content"
            padding={".2rem .8rem"}
            borderRadius="99rem"
            sx={{
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                    backgroundColor: teal[600],
                    color: "white",
                },
            }}
        >
            <Typography>{content}</Typography>
        </Stack>
    );
}
