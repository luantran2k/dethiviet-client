import { Box, Typography } from "@mui/material";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { grey, teal } from "@mui/material/colors";
import { Pagination, Navigation } from "swiper";
import CarouselCard from "../../components/ExamCard/CarouselCard";
import { IDetailExam } from "../../pages/Exam/detail";
import ultis from "../../Utils/ultis";

export interface IExamCarouselProps {
    exams?: IDetailExam[];
    title: string;
}

export default function ExamCarousel(props: IExamCarouselProps) {
    const { exams, title } = props;

    return (
        <Box>
            <Typography variant="h5" fontWeight={600} color={grey[800]}>
                {title}
            </Typography>
            <Box
                sx={{
                    height: "20rem",
                    margin: "2rem auto",
                    padding: "1rem 2rem",
                    backgroundColor: teal[50],
                    borderRadius: ".4rem",
                    marginBottom: "4rem",
                    boxShadow:
                        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                }}
            >
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {exams?.map((exam) => (
                        <SwiperSlide key={exam.id}>
                            <CarouselCard exam={exam} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide style={{ cursor: "pointer" }}>
                        {ultis.checkEmptyArray(exams)
                            ? "Danh sách trống"
                            : "Xem thêm"}
                    </SwiperSlide>
                </Swiper>
            </Box>
        </Box>
    );
}
