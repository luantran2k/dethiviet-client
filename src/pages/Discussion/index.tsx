import {
    Image,
    AudioFile,
    MoreVert,
    ArrowUpward,
    ArrowDownward,
} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "../../app/hooks";
import Post from "../../components/Post";
import AddPost from "../../components/Post/AddPost";
import AppTag from "../../components/Tag";
import ultis from "../../Utils/ultis";

export interface IDiscussionPageProps {}

export default function DiscussionPage(props: IDiscussionPageProps) {
    const user = useAppSelector((state) => state.app.userInfo);
    return (
        <Grid
            container
            sx={{
                maxWidth: "64rem",
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
            <Grid
                item
                xs={9}
                sx={{
                    padding: "2rem",
                    borderRadius: ".4rem",
                    boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
            >
                <AddPost user={user} />
                <Stack spacing={4} sx={{ margin: "4rem 0" }}>
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                    <Post user={user} />
                </Stack>
            </Grid>
        </Grid>
    );
}
