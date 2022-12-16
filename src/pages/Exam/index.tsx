import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import request from "../../Utils/request";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { grey, teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import CreateExamButton from "../../components/Exam/Button/CreateExamButton";
import CarouselCard from "../../components/ExamCard/CarouselCard";
import { IDetailExam } from "./detail";
import ExamCarousel from "../../components/ExamCarousel";

export interface IExamPageProps {}
interface examsState {
    lastestExams: IDetailExam[];
    popularMonthExams: IDetailExam[];
    suggestedExam: IDetailExam[];
}

export default function ExamPage(props: IExamPageProps) {
    const [exams, setExams] = useState<examsState>();
    const navigate = useNavigate();
    useEffect(() => {
        const getExams = async () => {
            const res = await request.get<any, examsState>("exams/index");
            if (res) setExams(res);
        };
        getExams();
    }, []);
    return (
        <Box
            sx={{
                maxWidth: "60rem",
                margin: "2rem auto",
                padding: "2rem",
                borderRadius: ".4rem",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
        >
            <Stack direction="row" marginBottom={6} spacing={2}>
                <CreateExamButton />
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigate("/exam/search");
                    }}
                >
                    Tìm kiếm đề thi
                </Button>
            </Stack>
            <ExamCarousel title={"Đề thi mới"} exams={exams?.lastestExams} />
            <ExamCarousel
                title={"Đề thi được làm nhiều của tháng"}
                exams={exams?.popularMonthExams}
            />
            <ExamCarousel
                title={"Đề thi được đề xuất bởi quản trị viên"}
                exams={exams?.suggestedExam}
            />
        </Box>
    );
}
