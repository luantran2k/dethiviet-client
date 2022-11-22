import { Box, CardActions, Grid, Typography } from "@mui/material";
import { amber, teal } from "@mui/material/colors";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../redux/slices/appSlice";
import IExam from "../Exam/interfaces/IExam";

export interface IExamCard extends Partial<IExam> {
    owner: User;
}

export interface IExamCardProps {
    exam: IExamCard;
}

export default function ExamCard(props: IExamCardProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { exam } = props;

    return (
        <Box
            onMouseDown={(e) => {
                if (e.button === 1) {
                    window.open(location.pathname + "/detail/" + exam.id);
                } else if (e.button === 0) {
                    navigate("./detail/" + exam.id, {
                        state: {
                            from: location.pathname + "/detail/" + exam.id,
                        },
                    });
                }
            }}
            sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                borderRadius: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
        >
            <Typography
                variant="h5"
                color={teal[800]}
                width="100%"
                padding="1rem"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                title={exam.title}
                borderBottom={`1px solid ${teal[800]}`}
            >
                {exam.title}
            </Typography>
            <Box padding="1rem">
                <Typography>
                    Nguời đăng: {exam.owner.name || exam.owner.username}
                </Typography>
                <Typography>Môn: {exam.subjectName}</Typography>
                <Typography>
                    Năm học:{" "}
                    {exam.date
                        ? new Date(exam.date).getFullYear()
                        : "Không xác định"}
                </Typography>
                <Typography>Lớp/Trình độ: {exam.grade}</Typography>
            </Box>
        </Box>
    );
}
