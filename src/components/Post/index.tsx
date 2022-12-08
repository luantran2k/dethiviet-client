import { ArrowDownward, ArrowUpward, MoreVert } from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import request from "../../Utils/request";
import UserNameButton from "../Button/UserNameButton";
import VoteButton from "../Button/VoteButton";
import AppComments from "../Comment";
import CommentBox from "../Comment/CommentBox";
import PopupMenu from "../PopupMenu";
import AppTag from "../Tag";
import IPost from "./interfaces/IPost";

export interface IPostProps {
    post: IPost;
    ownPost: boolean;
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export default function Post(props: IPostProps) {
    const { post, ownPost = false, setPosts } = props;
    const owner = post.owner;
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
                                <MenuItem>Chỉnh sửa</MenuItem>
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
}
