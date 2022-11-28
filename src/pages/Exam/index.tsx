import { Box, Button, MenuItem, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import request from "../../Utils/request";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { amber, grey, teal } from "@mui/material/colors";
import { Pagination, Navigation } from "swiper";
import { IDetailExam } from "./detail";
import CreateExamModal from "../../components/Exam/modal/create";
import AppModal from "../../components/Modal";
import PopupMenu from "../../components/PopupMenu";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import CarouselCard from "../../components/ExamCard/CarouselCard";
import CreateExamButton from "../../components/Exam/Button/CreateExamButton";

export interface IExamPageProps {}
interface examsState {
    lastestExams: IDetailExam[];
    popularMonthExams: IDetailExam[];
}

export default function ExamPage(props: IExamPageProps) {
    const [exams, setExams] = useState<examsState>();
    const navigate = useNavigate();
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
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
            <Typography variant="h5" fontWeight={600} color={grey[800]}>
                Đề thi mới
            </Typography>
            <Box
                sx={{
                    height: "20rem",
                    margin: "2rem auto",
                    padding: "1rem 2rem",
                    backgroundColor: teal[50],
                    borderRadius: ".4rem",
                    marginBottom: "4rem",
                }}
            >
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {exams?.lastestExams.map((exam) => (
                        <SwiperSlide key={exam.id}>
                            <CarouselCard exam={exam} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide style={{ cursor: "pointer" }}>
                        Xem thêm
                    </SwiperSlide>
                </Swiper>
            </Box>
            <Typography variant="h5" fontWeight={600} color={grey[800]}>
                Đề thi được làm nhiều của tháng
            </Typography>
            <Box
                sx={{
                    height: "20rem",
                    margin: "2rem auto",
                    padding: "1rem 2rem",
                    backgroundColor: teal[50],
                    borderRadius: ".4rem",
                }}
            >
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {exams?.popularMonthExams.map((exam) => (
                        <SwiperSlide key={exam.id}>
                            <CarouselCard exam={exam} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide style={{ cursor: "pointer" }}>
                        Xem thêm
                    </SwiperSlide>
                </Swiper>
            </Box>
        </Box>
    );
}
