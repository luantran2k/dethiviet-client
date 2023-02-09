import { Image, AudioFile, Add, Delete } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";
import { useRef, useState } from "react";
import { sendAlert, setLoading, User } from "../../../redux/slices/appSlice";
import AppTag from "../../Tag";
import { v4 as uuid } from "uuid";
import PracticeExamPage from "../../../pages/Exam/practice";
import request from "../../../Utils/request";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import IPost from "../interfaces/IPost";

export interface IAddPostProps {
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export default function AddPost(props: IAddPostProps) {
    const { setPosts } = props;
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.app.userInfo);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [audioFile, setAudioFile] = useState<File>();
    const [imageFiles, setImageFiles] = useState<FileList>();
    const audioInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    if (!user) {
        return (
            <Typography textAlign="center">
                Đăng nhập để đăng thắc mắc
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
            {audioFile && (
                <Stack direction="row">
                    <audio
                        src={URL.createObjectURL(audioFile)}
                        controls
                        style={{ width: "100%" }}
                    />
                    <Button
                        onClick={() => {
                            setAudioFile(undefined);
                            audioInputRef.current!.value = "";
                        }}
                    >
                        <Delete />
                    </Button>
                </Stack>
            )}
            {imageFiles && (
                <Accordion sx={{ marginBottom: "1rem" }}>
                    <AccordionSummary>
                        <Typography flex={1}>Hình ảnh</Typography>
                        <Delete
                            onClick={(e) => {
                                e.stopPropagation();
                                setImageFiles(undefined);
                                imageInputRef.current!.value = "";
                            }}
                            sx={{
                                color: red[500],
                                cursor: "pointer",
                                transition: "all .3s ease",
                                "&:hover": {
                                    transform: "scale(1.4)",
                                },
                                "&:active": {
                                    transform: "scale(1.2)",
                                },
                            }}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="row" spacing={1} overflow="auto">
                            {Array.from(imageFiles).map((image, index) => {
                                return (
                                    <Box
                                        key={index}
                                        height="12rem"
                                        borderRadius=".4rem"
                                        overflow="hidden"
                                    >
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(image)}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>
                                );
                            })}
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            )}
            <Stack
                spacing={1}
                direction={{ xs: "column", sm: "row" }}
                sx={{
                    img: {
                        width: "100%",
                        height: "100%",
                        objectFit: "container",
                    },
                }}
            >
                <Stack direction="row" sx={{ width: "2.8rem" }}>
                    <img src={user?.profileImg} alt="avatar" />
                    <Stack>
                        <Typography fontWeight={500} fontSize="1.2rem">
                            {user?.name || "@" + user?.username}
                        </Typography>
                        <Typography fontWeight={400} fontSize=".8rem">
                            {new Date().toLocaleString()}
                        </Typography>
                    </Stack>
                </Stack>

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignSelf: "center",
                        marginLeft: "auto !important",
                    }}
                >
                    <Button
                        sx={{ backgroundColor: grey[100] }}
                        onClick={() => {
                            audioInputRef.current?.click();
                        }}
                    >
                        <AudioFile />
                        <input
                            type="file"
                            ref={audioInputRef}
                            style={{ display: "none" }}
                            accept="audio/*"
                            onChange={(e) => setAudioFile(e.target.files?.[0])}
                        />
                    </Button>
                    <Box>
                        <Button
                            sx={{ backgroundColor: grey[100] }}
                            onClick={() => {
                                imageInputRef.current?.click();
                            }}
                        >
                            <Image />
                        </Button>
                        <input
                            type="file"
                            ref={imageInputRef}
                            multiple
                            accept="image/png, image/jpg, image/jpeg"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                ) {
                                    setImageFiles(e.target.files);
                                }
                            }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={async () => {
                            if (!content) {
                                dispatch(
                                    sendAlert({
                                        message:
                                            "Vui lòng nhập nội dung bài đăng",
                                        severity: "warning",
                                    })
                                );
                                return;
                            }
                            const form = new FormData();
                            form.append("content", content);
                            tags.forEach((tag) => form.append("tags", tag));
                            if (audioFile) {
                                form.append("audioFile", audioFile);
                            }
                            if (imageFiles) {
                                Array.from(imageFiles).forEach((imageFile) =>
                                    form.append("imageFiles", imageFile)
                                );
                            }
                            dispatch(setLoading(true));
                            const newPost = await request.post<IPost>(
                                "questionings",
                                form,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );
                            dispatch(setLoading(false));
                            if (newPost) {
                                setContent("");
                                setTags([]);
                                setImageFiles(undefined);
                                setAudioFile(undefined);
                                imageInputRef.current!.value = "";
                                audioInputRef.current!.value = "";
                                setPosts((posts) => [newPost, ...posts]);
                            }
                        }}
                    >
                        Đăng
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}
