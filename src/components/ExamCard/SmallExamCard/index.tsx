import { Box, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ultis from "../../../Utils/ultis";
import IExam from "../../Exam/interfaces/IExam";

export interface ISmallExamCardProps {
    exam: IExam;
}

export default function SmallExamCard(props: ISmallExamCardProps) {
    const navigate = useNavigate();
    const { exam } = props;
    return (
        <Box
            onClick={() => navigate("/exam/detail/" + exam.id)}
            sx={{
                flex: "0 0 30%",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                padding: "0.6rem",
                borderRadius: ".6rem",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
        >
            <Typography variant="h6">{exam.title}</Typography>
            <Typography>
                Ngày đăng: {ultis.formatDate(exam.createdAt)}
            </Typography>
            <Typography>Môn: {exam.subjectName}</Typography>
        </Box>
    );
}

export function SmallExamCardList({ exams }: { exams: IExam[] }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "3.3333%",
                marginTop: "1rem",
            }}
        >
            {exams.map((exam) => (
                <SmallExamCard key={exam.id} exam={exam} />
            ))}
        </Box>
    );
}
