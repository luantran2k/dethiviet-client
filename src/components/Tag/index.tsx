import { Add, Remove } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

export interface IAppTagProps {
    content: string;
    addAction?: () => void;
    removeAction?: () => void | undefined;
}

export default function AppTag(props: IAppTagProps) {
    const { content, addAction, removeAction } = props;
    return (
        <Stack
            direction="row"
            alignItems="center"
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
            {addAction && (
                <Add
                    onClick={addAction}
                    sx={{
                        marginLeft: ".2rem",
                        fontSize: ".8rem",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(2)",
                        },
                    }}
                />
            )}
            {removeAction && (
                <Remove
                    onClick={removeAction}
                    sx={{
                        marginLeft: ".2rem",
                        fontSize: ".8rem",
                        transall: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(2)",
                        },
                    }}
                />
            )}
        </Stack>
    );
}
