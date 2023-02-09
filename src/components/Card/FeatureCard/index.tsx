import { Box, Grid, Stack, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export interface IFeatureCardProps {
    title: string;
    icon: React.ReactElement;
    bgcolor?: string;
    color?: string;
}

export default function FeatureCard(props: IFeatureCardProps) {
    const { title, bgcolor = "white", color, icon: Icon } = props;
    return (
        <Stack
            flex={1}
            alignItems="center"
            // bgcolor="rgba(255, 0,0,0.2)"
            borderRadius=".4rem"
            padding="1rem"
            position="relative"
            sx={{
                ":before": {
                    content: "''",
                    zIndex: -1,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    borderRadius: "1rem",
                    bgcolor: color,
                    opacity: "0.1",
                },
            }}
        >
            <Box
                borderRadius="50%"
                padding="1rem"
                position="relative"
                marginBottom="1rem"
                sx={{}}
            >
                <Icon.type
                    {...Icon.props}
                    sx={{
                        color: color,
                        height: "2.8rem",
                        width: "2.8rem",
                    }}
                />
            </Box>
            <Typography fontWeight="500" fontSize="1.4rem" color={color}>
                {title}
            </Typography>
        </Stack>
    );
}
