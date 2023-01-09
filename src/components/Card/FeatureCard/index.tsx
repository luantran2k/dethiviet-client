import { Box, Grid, Typography } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

export interface IFeatureCardProps {}

export default function FeatureCard(props: IFeatureCardProps) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Box bgcolor="rgba(255,0,0,0.3)" borderRadius="0.4rem">
                <AccessTime />
                <Typography>Card Title</Typography>
            </Box>
        </Grid>
    );
}
