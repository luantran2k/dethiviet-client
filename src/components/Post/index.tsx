import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    ImageList,
    ImageListItem,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { memo, useRef, useState } from "react";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";
import UserNameButton from "../Button/UserNameButton";
import VoteButton from "../Button/VoteButton";
import AppComments from "../Comment";
import CommentBox from "../Comment/CommentBox";
import ImageFullView from "../ImageFullView";
import AppModal from "../Modal";
import PopupMenu from "../PopupMenu";
import AppTag from "../Tag";
import IPost from "./interfaces/IPost";

export interface IPostProps {
    post: IPost;
    ownPost: boolean;
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

const Post = (props: IPostProps) => {
    const { post: postProp, ownPost = false, setPosts } = props;
    const [post, setPost] = useState(postProp);
    const owner = post.owner;
    const [editPostContent, setEditPostContent] = useState(post.content);
    return (
        <Stack
            spacing={2}
            sx={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: ".4rem",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
        >
            <Stack
                spacing={1}
                direction="row"
                sx={{
                    img: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    },
                }}
            >
                <Box sx={{ height: "2.8rem", width: "2.8rem" }}>
                    <img src={owner?.profileImg} alt="avatar" />
                </Box>
                <Stack>
                    <UserNameButton user={owner} fontSize="1.2rem" />
                    <Typography fontWeight={400} fontSize=".8rem">
                        {new Date(post.createdAt).toLocaleString()}
                    </Typography>
                </Stack>
                {ownPost && (
                    <Box sx={{ marginLeft: "auto !important" }}>
                        <PopupMenu
                            trigger={
                                <Button>
                                    <MoreVert />
                                </Button>
                            }
                        >
                            <Stack>
                                <AppModal
                                    trigger={<MenuItem>Chỉnh sửa</MenuItem>}
                                >
                                    <>
                                        <TextField
                                            fullWidth
                                            multiline
                                            maxRows={6}
                                            value={editPostContent}
                                            onChange={(e) =>
                                                setEditPostContent(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Stack
                                            direction="row"
                                            justifyContent="center"
                                            marginTop="2rem"
                                            spacing="1rem"
                                        >
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    request.patch(
                                                        "questionings/" +
                                                            post.id,
                                                        {
                                                            content:
                                                                editPostContent,
                                                        }
                                                    );
                                                    setPost((post) => ({
                                                        ...post,
                                                        content:
                                                            editPostContent,
                                                    }));
                                                }}
                                            >
                                                Lưu
                                            </Button>
                                        </Stack>
                                    </>
                                </AppModal>
                                <MenuItem
                                    onClick={() => {
                                        request.delete(
                                            `questionings/${post.id}`
                                        );
                                        setPosts((posts) => {
                                            return posts.filter(
                                                (postFilter) =>
                                                    postFilter.id !== post.id
                                            );
                                        });
                                    }}
                                >
                                    Xoá
                                </MenuItem>
                            </Stack>
                        </PopupMenu>
                    </Box>
                )}
            </Stack>
            <Typography sx={{ margin: ".4rem 0" }}>{post.content}</Typography>
            {!ultis.checkEmptyArray(post.questioningImage) && (
                <Grid container spacing={1}>
                    {post.questioningImage?.map((url, index) => (
                        <Grid
                            item
                            xs={
                                post.questioningImage &&
                                post.questioningImage?.length > 1
                                    ? 6
                                    : 12
                            }
                            key={index}
                        >
                            <ImageFullView
                                trigger={
                                    <Box maxWidth={"100%"}>
                                        <img
                                            src={url}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </Box>
                                }
                                imageUrl={url}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            {post.questioningAudio && (
                <audio
                    src={post.questioningAudio}
                    controls
                    style={{ width: "100%" }}
                />
            )}
            {post.tags?.length > 0 && (
                <Stack direction="row" spacing={1}>
                    {post.tags.map((tag) => (
                        <AppTag content={tag} key={tag + ""} />
                    ))}
                </Stack>
            )}
            <VoteButton
                upVote={post.upVote}
                downVote={post.downVote}
                postId={post.id}
            />
            <AppComments postId={post.id} comments={post.explainings} />
        </Stack>
    );
};

export default memo(Post);
