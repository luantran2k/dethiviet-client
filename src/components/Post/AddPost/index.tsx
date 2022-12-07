import { Image, AudioFile, Add } from "@mui/icons-material";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { useState } from "react";
import { User } from "../../../redux/slices/appSlice";
import AppTag from "../../Tag";
import { v4 as uuid } from "uuid";
import PracticeExamPage from "../../../pages/Exam/practice";
import request from "../../../Utils/request";

export interface IAddPostProps {
    user?: User;
}

export default function AddPost(props: IAddPostProps) {
    const { user } = props;
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>("");
    const [content, setContent] = useState<string>("");
    if (!user) {
        return (
            <Typography textAlign="center">
                Đăng nhập để đăng thác mắc
            </Typography>
        );
    }
    return (
        <Box>
            <TextField
                fullWidth
                multiline
                minRows={2}
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                sx={{ margin: "0 0 1rem" }}
            />
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ marginBottom: "1rem" }}
            >
                <Typography>Tag: </Typography>
                {tags.map((tag) => {
                    const id = uuid();
                    return (
                        <AppTag
                            content={tag}
                            key={id}
                            removeAction={() => {
                                setTags((tags) => {
                                    return tags.filter(
                                        (tagFilter) => tagFilter !== tag
                                    );
                                });
                            }}
                        />
                    );
                })}
                <TextField
                    size="small"
                    value={currentTag}
                    onChange={(e) => {
                        setCurrentTag(e.target.value);
                    }}
                    sx={{
                        width: "8rem",
                    }}
                />
                <Add
                    onClick={() => {
                        if (currentTag !== "") {
                            setTags([...tags, currentTag]);
                            setCurrentTag("");
                        }
                    }}
                    sx={{
                        color: teal[500],
                        border: `1px solid ${teal[500]}`,
                        borderRadius: "50%",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            color: "white",
                            border: `1px solid white`,
                            backgroundColor: teal[500],
                            borderRadius: "50%",
                            transform: "scale(1.4)",
                        },
                        "&:active": {
                            transform: "scale(1.2)",
                        },
                    }}
                />
            </Stack>
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
                    <img src={user?.profileImg} alt="avatar" />
                </Box>
                <Stack>
                    <Typography fontWeight={500} fontSize="1.2rem">
                        {user?.name || "@" + user?.username}
                    </Typography>
                    <Typography fontWeight={400} fontSize=".8rem">
                        {new Date().toLocaleString()}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignSelf: "center",
                        marginLeft: "auto !important",
                    }}
                >
                    <Button sx={{ backgroundColor: grey[100] }}>
                        <AudioFile />
                    </Button>
                    <Button sx={{ backgroundColor: grey[100] }}>
                        <Image />
                    </Button>
                    <Button
                        variant="contained"
                        onClick={async () => {
                            const post = {
                                content,
                                tags,
                            };
                            await request.post("questionings", post);
                            setContent("");
                            setTags([]);
                        }}
                    >
                        Đăng
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
