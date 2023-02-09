import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PopupMenu from "../../components/PopupMenu";
import Post from "../../components/Post";
import AddPost from "../../components/Post/AddPost";
import IPost from "../../components/Post/interfaces/IPost";
import SearchPost from "../../components/Post/SearchPost";
import request from "../../Utils/request";

export interface IDiscussionPageProps {}

export default function DiscussionPage(props: IDiscussionPageProps) {
    const user = useAppSelector((state) => state.app.userInfo);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [page, setPage] = useState<number>(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const theme = useTheme();
    const matchSm = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const getPosts = async () => {
            const res = await request.get<
                { page: number },
                { total: number | null; posts: IPost[] }
            >("questionings", { page });
            if (res?.posts && res?.posts?.length > 0) {
                if (page === 0) {
                    setPosts(res.posts);
                } else {
                    setPosts((posts) => [...posts, ...res.posts]);
                }
            } else {
                setIsLastPage(true);
            }
        };
        getPosts();
    }, [page]);

    return (
        <Container>
            <Grid
                container
                sx={{
                    maxWidth: "64rem",
                    margin: "2rem auto",
                    minHeight: "60vh",
                }}
            >
                <Grid item xs={12} sm={3} padding="0 1rem 1rem 0">
                    {matchSm ? (
                        <PopupMenu
                            trigger={
                                <Button
                                    variant="outlined"
                                    sx={{
                                        position: "fixed",
                                        top: "4rem",
                                        right: "1rem",
                                    }}
                                >
                                    Search
                                </Button>
                            }
                        >
                            <Box padding="1rem">
                                <SearchPost
                                    setPosts={setPosts}
                                    setPage={setPage}
                                />
                            </Box>
                        </PopupMenu>
                    ) : (
                        <SearchPost setPosts={setPosts} setPage={setPage} />
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={9}
                    sx={{
                        padding: "2rem",
                        borderRadius: ".4rem",
                        boxShadow:
                            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                    }}
                >
                    <AddPost setPosts={setPosts} />
                    <Stack spacing={4} sx={{ margin: "4rem 0" }}>
                        {posts.map((post) => (
                            <Post
                                key={post.id}
                                post={post}
                                ownPost={user?.id === post.ownerId}
                                setPosts={setPosts}
                            />
                        ))}
                        {!isLastPage ? (
                            <Button
                                variant="contained"
                                sx={{
                                    width: "fit-content",
                                    margin: "2rem auto 0",
                                }}
                                onClick={async () => {
                                    setPage((page) => page + 1);
                                }}
                            >
                                Tải thêm
                            </Button>
                        ) : (
                            <Typography textAlign="center" fontSize="1.2rem">
                                Đã hết
                            </Typography>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
