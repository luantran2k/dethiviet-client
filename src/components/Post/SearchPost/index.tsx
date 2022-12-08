import { TextField, Box, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { sendAlert } from "../../../redux/slices/appSlice";
import request from "../../../Utils/request";
import AppAlert from "../../Alert";
import AppTag from "../../Tag";
import IPost from "../interfaces/IPost";

export interface ISearchPostProps {
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function SearchPost(props: ISearchPostProps) {
    const { setPosts, setPage } = props;
    const [search, setSearch] = useState("");
    const [tag, setTag] = useState("");
    const dispatch = useAppDispatch();
    const popularTags = [
        "Toeic",
        "IELTS",
        "Toán 12",
        "Văn 12",
        "Anh 12",
        "Toán 9",
        "Văn 9",
        "Anh 9",
    ];
    const getPosts = () => {
        return request.get<
            {
                page?: number;
                tag?: string;
                search?: string;
            },
            { total: number | null; posts: IPost[] }
        >("questionings", { search, tag });
    };

    const handleSearch = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            const res = await getPosts();
            if (res?.posts && res?.posts?.length > 0) {
                setPosts(res?.posts);
            } else {
                dispatch(
                    sendAlert({
                        message: "Không tìm thấy",
                        severity: "warning",
                    })
                );
            }
        }
    };
    return (
        <Stack spacing={2}>
            <TextField
                fullWidth
                placeholder="Vui lòng nhập để tìm kiếm"
                label="Tìm kiếm"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value === "" && tag === "") {
                        setPage(0);
                    }
                }}
                onKeyUp={handleSearch}
            />
            <TextField
                fullWidth
                placeholder="Vui lòng nhập để tìm kiếm"
                label="Tag"
                value={tag}
                onChange={(e) => {
                    setTag(e.target.value);
                    if (e.target.value === "" && search === "") {
                        setPage(0);
                    }
                }}
                onKeyUp={handleSearch}
            />
            <Box mt={2}>
                <Typography>Các chủ đề phổ biến </Typography>
                <Box display="flex" flexWrap="wrap" columnGap={1} rowGap={1}>
                    {popularTags.map((content, index) => (
                        <AppTag
                            key="index"
                            content={content}
                            clickAction={() => {
                                setTag(content);
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Stack>
    );
}
