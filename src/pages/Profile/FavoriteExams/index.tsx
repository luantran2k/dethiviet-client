import * as React from "react";
import IExam from "../../../components/Exam/interfaces/IExam";
import request from "../../../Utils/request";
import ExamProfileOutlet from "../ExamProfileOutlet";

export interface IFavoriteExamProps {}

export default function FavoriteExam(props: IFavoriteExamProps) {
    const getExams = (userId: number) => {
        return request.get<{ exams: IExam[] }>(
            `users/${userId}/exams/favorite`
        );
    };

    return <ExamProfileOutlet getExams={getExams} title="Bài thi quan tâm" />;
}
