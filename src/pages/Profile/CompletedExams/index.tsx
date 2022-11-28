import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import * as React from "react";
import { useUserInfo } from "..";
import IExam from "../../../components/Exam/interfaces/IExam";
import { SmallExamCardList } from "../../../components/ExamCard/SmallExamCard";
import request from "../../../Utils/request";
import ExamProfileOutlet from "../ExamProfileOutlet";

export interface ICompletedExamsProps {}

export default function CompletedExams(props: ICompletedExamsProps) {
    const getExams = (userId: number) => {
        return request.get<any, { exams: IExam[] }>(
            `users/${userId}/exams/completed`
        );
    };
    return (
        <ExamProfileOutlet
            getExams={getExams}
            title={"Bài thi đã hoàn thành"}
        />
    );
}
