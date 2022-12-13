import { Edit } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Hidden,
    Stack,
    Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import { GradeData } from "../../const/GradeData";
import AppModal from "../Modal";
import IExam from "./interfaces/IExam";
import UpdateExamModal from "./modal/update";
import styles from "./style.module.scss";

export interface IExamInfoProps {
    exam?: IExam;
    editModal?: React.ReactElement;
}

export default function ExamInfo(props: IExamInfoProps) {
    const { exam = useAppSelector((state) => state.exam), editModal } = props;

    return (
        <Box mb={2}>
            <Accordion>
                <AccordionSummary className={styles.part_summary}>
                    <Stack direction={"row"} width="100%">
                        <Typography variant="h6" flexGrow={1}>
                            Thông tin bài kiểm tra
                        </Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack>
                        {exam.title && (
                            <Typography>Tiêu đề: {exam.title}</Typography>
                        )}
                        {exam.subjectName !== "Khác" &&
                            exam.grade !== undefined && (
                                <Typography>
                                    Tên môn học: {exam.subjectName}
                                </Typography>
                            )}
                        {exam.publishers && (
                            <Typography>
                                Đơn vị phát hành: {exam.publishers}
                            </Typography>
                        )}
                        {exam.type && (
                            <Typography>
                                Loại bài thi:{" "}
                                {exam.type === "official"
                                    ? "Chính thức"
                                    : "Không chính thức"}
                            </Typography>
                        )}
                        {exam.duration && (
                            <Typography>
                                Thời gian làm bài: {exam.duration}
                            </Typography>
                        )}
                        {exam.date && (
                            <Typography>
                                Ngày thi:{" "}
                                {new Date(exam.date).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </Typography>
                        )}
                        {exam.examName && (
                            <Typography>Tên kỳ thi: {exam.examName}</Typography>
                        )}
                        {exam.grade !== "unknown" &&
                            exam.grade !== undefined && (
                                <Typography>
                                    Lớp/ Trình độ:
                                    {
                                        GradeData[
                                            exam.grade as keyof typeof GradeData
                                        ]
                                    }
                                </Typography>
                            )}
                        <Typography>
                            Trạng thái:{" "}
                            {exam.isPublic === true
                                ? "Công khai"
                                : "Không công khai"}
                        </Typography>

                        <Typography>
                            Mã xác minh: {exam.securityCode}
                        </Typography>

                        {exam.description && (
                            <Typography>Mô tả: {exam.description}</Typography>
                        )}
                        {editModal ? (
                            editModal
                        ) : (
                            <AppModal
                                trigger={
                                    <Button
                                        variant="contained"
                                        sx={{
                                            alignSelf: "center",
                                            marginTop: "1rem",
                                        }}
                                    >
                                        <Edit />
                                    </Button>
                                }
                            >
                                <UpdateExamModal />
                            </AppModal>
                        )}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
