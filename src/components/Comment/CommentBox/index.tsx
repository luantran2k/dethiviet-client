import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import request from "../../../Utils/request";
import { IComment } from "../interfaces/Comment";

export interface ICommentBoxProps {
    postId: number;
    setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

export default function CommentBox(props: ICommentBoxProps) {
    const { postId, setComments } = props;
    const [content, setContent] = useState("");
    return (
        <Stack direction="row" spacing={2}>
            <TextField
                size="small"
                sx={{ flex: 1 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                multiline
                maxRows={3}
            />
            <Button
                variant="contained"
                onClick={async () => {
                    const newComment = await request.post<IComment>(
                        "explainings",
                        {
                            content,
                            questioningId: postId,
                        }
                    );
                    setComments((comments) => [newComment, ...comments]);
                    setContent("");
                }}
                sx={{ alignSelf: "center" }}
            >
                Bình luận
            </Button>
        </Stack>
    );
}
