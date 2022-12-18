import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";

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
    data: string;
    color?: MuiColor;
    sx?: SxProps<Theme>;
}

export default function ReportCard(props: IReportCardProps) {
    const { icon, title, data, color = teal, sx } = props;
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            bgcolor={color[50]}
            flex={1}
            spacing={2}
            padding="4rem 0"
            borderRadius=".8rem"
            sx={sx}
        >
            <Box
                width="4rem"
                height="4rem"
                borderRadius="50%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={color[100]}
                color={color[800]}
            >
                {icon}
            </Box>
            <Stack alignItems="center" justifyContent="center">
                <Typography fontSize="2rem" fontWeight="500" color={color[900]}>
                    {data}
                </Typography>
                <Typography color={color[900]}>{title}</Typography>
            </Stack>
        </Stack>
    );
}
