import { ArrowUpward, ArrowDownward, Edit, Delete } from "@mui/icons-material";
import { ButtonGroup, Button } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import request from "../../../Utils/request";
import { IComment } from "../../Comment/interfaces/Comment";

export interface IVoteButtonProps {
    upVote: number[];
    downVote: number[];
    postId?: number;
    commentId?: number;
    isOwner?: boolean;
    size?: "small" | "medium" | "large";
    setComments?: React.Dispatch<React.SetStateAction<IComment[]>>;
    setComment?: React.Dispatch<React.SetStateAction<IComment>>;
    setIsEditable?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface VoteHandler {
    type: "questionings" | "explainings";
    action: "upVote" | "downVote" | "removeUpVote" | "removeDownVote";
    id: number;
}

export default function VoteButton(props: IVoteButtonProps) {
    const {
        upVote: upVoteProp,
        downVote: downVoteProp,
        postId,
        commentId,
        size = "medium",
        isOwner = false,
        setComments,
        setComment,
        setIsEditable,
    } = props;
    const primaryColor = teal[500];
    const disableColor = grey[500];
    const user = useAppSelector((state) => state.app.userInfo);
    const [upVote, setUpVote] = useState(upVoteProp);
    const [downVote, setDownVote] = useState(downVoteProp);
    const [isUpvote, setIsUpVote] = useState(
        upVote.some((id) => id === user?.id)
    );
    const [isDownvote, setIsDownVote] = useState(
        downVote.some((id) => id === user?.id)
    );
    const handleVote = async ({ type, action, id }: VoteHandler) => {
        const newVote = await request.patch<{
            upVote: number[];
            downVote: number[];
        }>(`${type}/${id}/${action}`, {});
        setUpVote(newVote.upVote);
        setDownVote(newVote.downVote);
        setIsUpVote(newVote.upVote.some((id) => id === user?.id));
        setIsDownVote(newVote.downVote.some((id) => id === user?.id));
        if (setComment) {
            setComment((comment) => ({
                ...comment,
                upVote: newVote.upVote,
                downVote: newVote.downVote,
            }));
        }
    };
    return (
        <ButtonGroup size={size}>
            <Button
                onClick={() => {
                    if (postId) {
                        handleVote({
                            type: "questionings",
                            id: postId,
                            action: isUpvote ? "removeUpVote" : "upVote",
                        });
                    } else if (commentId) {
                        handleVote({
                            type: "explainings",
                            id: commentId,
                            action: isUpvote ? "removeUpVote" : "upVote",
                        });
                    }
                }}
                sx={
                    isUpvote
                        ? { color: primaryColor, borderColor: primaryColor }
                        : { color: disableColor, borderColor: disableColor }
                }
            >
                <ArrowUpward />
            </Button>
            <Button>{upVote.length - downVote.length}</Button>
            <Button
                onClick={() => {
                    if (postId) {
                        handleVote({
                            type: "questionings",
                            id: postId,
                            action: isDownvote ? "removeDownVote" : "downVote",
                        });
                    } else if (commentId) {
                        handleVote({
                            type: "explainings",
                            id: commentId,
                            action: isDownvote ? "removeDownVote" : "downVote",
                        });
                    }
                }}
                sx={
                    isDownvote
                        ? { color: primaryColor, borderColor: primaryColor }
                        : { color: disableColor, borderColor: disableColor }
                }
            >
                <ArrowDownward />
            </Button>
            {commentId && isOwner && (
                <>
                    <Button
                        onClick={() => {
                            if (setIsEditable) {
                                setIsEditable(true);
                            }
                        }}
                    >
                        <Edit />
                    </Button>
                    <Button
                        onClick={async () => {
                            request.delete("explainings/" + commentId);
                            if (setComments)
                                setComments((comments) =>
                                    comments.filter(
                                        (comment) => comment.id !== commentId
                                    )
                                );
                        }}
                    >
                        <Delete />
                    </Button>
                </>
            )}
        </ButtonGroup>
    );
}
