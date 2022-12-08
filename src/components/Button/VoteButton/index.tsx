import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";
import request from "../../../Utils/request";

export interface IVoteButtonProps {
    vote: number;
    postId?: number;
    commentId?: number;
}

interface VoteHandler {
    type: "questionings" | "explainings";
    action: "upVote" | "downVote";
    id: number;
}

export default function VoteButton(props: IVoteButtonProps) {
    const { vote: voteProp, postId, commentId } = props;
    const [vote, setVote] = useState(voteProp);
    const handleVote = async ({ type, action, id }: VoteHandler) => {
        const newVote = await request.patch<{ vote: number }>(
            `${type}/${id}/${action}`,
            {}
        );
        setVote(newVote.vote);
    };
    return (
        <ButtonGroup>
            <Button
                onClick={() => {
                    if (postId) {
                        handleVote({
                            type: "questionings",
                            id: postId,
                            action: "upVote",
                        });
                    } else if (commentId) {
                        handleVote({
                            type: "explainings",
                            id: commentId,
                            action: "upVote",
                        });
                    }
                }}
            >
                <ArrowUpward />
            </Button>
            <Button>{vote}</Button>
            <Button
                onClick={() => {
                    if (postId) {
                        handleVote({
                            type: "questionings",
                            id: postId,
                            action: "downVote",
                        });
                    } else if (commentId) {
                        handleVote({
                            type: "explainings",
                            id: commentId,
                            action: "downVote",
                        });
                    }
                }}
            >
                <ArrowDownward />
            </Button>
        </ButtonGroup>
    );
}
