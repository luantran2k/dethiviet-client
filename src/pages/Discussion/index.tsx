import { Box, Grid, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import AppTag from "../../components/Tag";

export interface IDiscussionPageProps {}

export default function DiscussionPage(props: IDiscussionPageProps) {
    return (
        <Grid
            container
            sx={{
                maxWidth: "68rem",
                margin: "2rem auto",
                minHeight: "60vh",
            }}
        >
            <Grid item xs={3} padding="0 1rem 1rem">
                <TextField
                    fullWidth
                    placeholder="Vui lòng nhập để tìm kiếm"
                    label="Tìm kiếm"
                />
                <Box mt={2}>
                    <Typography>Các chủ đề phổ biến </Typography>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        columnGap={1}
                        rowGap={1}
                    >
                        <AppTag content="Toeic" />
                        <AppTag content="IELTS" />
                        <AppTag content="Toán" />
                        <AppTag content="Văn" />
                        <AppTag content="Anh" />
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box>
                    <TextField fullWidth multiline></TextField>
                </Box>
            </Grid>
        </Grid>
    );
}
