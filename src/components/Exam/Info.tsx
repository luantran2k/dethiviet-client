import { Edit } from "@mui/icons-material";
import { AccordionDetails, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";
import { GradeData } from "../../const/GradeData";
import AppModal from "../Modal";
import UpdateExamModal from "./modal/update";
import styles from "./style.module.scss";

export interface IExamInfoProps {}

export default function ExamInfo(props: IExamInfoProps) {
    const exam = useAppSelector((state) => state.exam);
    return (
        <>
            <Typography variant="h5" marginBottom={4}>
                {exam.title}
            </Typography>
            <details className={styles.part}>
                <summary className={styles.part_summary}>
                    <Stack direction={"row"}>
                        <Typography variant="h6" flexGrow={1}>
                            Thông tin bài kiểm tra
                        </Typography>
                        <AppModal
                            buttonVariant="text"
                            buttonStartIcon={<Edit />}
                        >
                            <UpdateExamModal />
                        </AppModal>
                    </Stack>
                </summary>
                <AccordionDetails>
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
                            {new Date(exam.date).toLocaleDateString("vi-VN")}
                        </Typography>
                    )}
                    {exam.examName && (
                        <Typography>Tên kỳ thi: {exam.examName}</Typography>
                    )}
                    {exam.grade !== "unknown" && exam.grade !== undefined && (
                        <Typography>
                            Lớp/ Trình độ:
                            {GradeData[exam.grade as keyof typeof GradeData]}
                        </Typography>
                    )}
                    <Typography>
                        Trạng thái:{" "}
                        {exam.isPublic === true
                            ? "Công khai"
                            : "Không công khai"}
                    </Typography>
                    {exam.description && (
                        <Typography>Mô tả: {exam.description}</Typography>
                    )}
                </AccordionDetails>
            </details>
        </>
    );
}
