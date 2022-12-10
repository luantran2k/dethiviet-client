import { MoreVert } from "@mui/icons-material";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import request from "../../Utils/request";
import Avatar from "../Avatar";
import UserNameButton from "../Button/UserNameButton";
import VoteButton from "../Button/VoteButton";
import PopupMenu from "../PopupMenu";
import CommentBox from "./CommentBox";
import { IComment } from "./interfaces/Comment";

export interface ICommentProps {
    comment: IComment;
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export function AppComment(props: ICommentProps) {
    const { comment: commentProp, setComments } = props;
    const user = useAppSelector((state) => state.app.userInfo);
    const [comment, setComment] = useState(commentProp);
    const [isEditable, setIsEditable] = useState(false);
    const [content, setContent] = useState(comment.content);
    const owner = comment.owner;
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Stack>
                <Avatar profileImg={owner.profileImg!} />
            </Stack>
            <Stack flex={1} spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <UserNameButton user={owner} />
                    <Typography
                        fontSize="0.8rem"
                        fontStyle="normal"
                        flex={1}
                        sx={{ transform: "translate(0,10%)" }}
                    >
                        {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                </Stack>
                <TextField
                    value={content}
                    multiline
                    size="small"
                    variant="standard"
                    sx={{ pointerEvents: isEditable ? "all" : "none" }}
                    InputProps={{
                        disableUnderline: !isEditable,
                    }}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                {isEditable && (
                    <Stack direction="row" spacing={1} paddingTop={1}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={async () => {
                                request.patch("explainings/" + comment.id, {
                                    content,
                                });
                                setIsEditable(false);
                            }}
                        >
                            Lưu
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                setIsEditable(false);
                            }}
                        >
                            Huỷ
                        </Button>
                    </Stack>
                )}
            </Stack>
            <Typography
                textAlign={"right"}
                fontSize="1.2rem"
                color="primary"
                sx={{
                    backgroundColor: teal[50],
                    padding: ".1rem .6rem",
                    borderRadius: ".4rem",
                }}
            >
                {comment.upVote.length - comment.downVote.length}
            </Typography>
            <PopupMenu
                trigger={
                    <MoreVert sx={{ color: teal[500], cursor: "pointer" }} />
                }
            >
                <VoteButton
                    upVote={comment.upVote}
                    downVote={comment.downVote}
                    commentId={comment.id}
                    size="small"
                    isOwner={comment.ownerId === user?.id}
                    setComments={setComments}
                    setComment={setComment}
                    setIsEditable={setIsEditable}
                />
            </PopupMenu>
        </Stack>
    );
}

export default function AppComments(props: {
    comments: IComment[];
    postId: number;
}) {
    const { comments: commentsProp, postId } = props;
    const [comments, setComments] = useState(commentsProp || []);
    return (
        <Stack spacing={2}>
            <CommentBox postId={postId} setComments={setComments} />
            {comments?.map((comment) => (
                <AppComment
                    comment={comment}
                    key={comment.id}
                    setComments={setComments}
                />
            ))}
        </Stack>
    );
}
