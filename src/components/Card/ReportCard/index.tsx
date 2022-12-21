import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

interface MuiColor {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
}

export interface IReportCardProps {
    icon: React.ReactElement;
    title: string;
    data: number;
    to?: string;
    color?: MuiColor;
    sx?: SxProps<Theme>;
}

export default function ReportCard(props: IReportCardProps) {
    const { icon, title, data = 0, color = teal, sx, to } = props;
    const navigate = useNavigate();
    return (
        <Box
            bgcolor={color[50]}
            flex={1}
            padding="4rem 0"
            borderRadius=".8rem"
            onClick={() => {
                if (to) {
                    navigate(to);
                }
            }}
            sx={{
                userSelect: "none",
                cursor: "pointer",
                "&:hover .report-card": {
                    transform: "scale(1.15)",
                },
                ...sx,
            }}
        >
            <Stack
                className="report-card"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ transition: "all .3s ease" }}
            >
                <Box
                    width="4rem"
                    height="4rem"
                    borderRadius="50%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={color[100]}
                    color={color[900]}
                >
                    {icon}
                </Box>
                <Stack alignItems="center" justifyContent="center">
                    <Typography
                        fontSize="2rem"
                        fontWeight="500"
                        color={color[900]}
                    >
                        {data}
                    </Typography>
                    <Typography color={color[900]}>{title}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
}
