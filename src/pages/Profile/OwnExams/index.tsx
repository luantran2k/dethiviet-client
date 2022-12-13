import IExam from "../../../components/Exam/interfaces/IExam";
import request from "../../../Utils/request";
import ExamProfileOutlet from "../ExamProfileOutlet";

export interface IOwnExamsProps {}

export default function OwnExams(props: IOwnExamsProps) {
    const getExams = (userId: number, userRequestId?: number) => {
        return request.get<{ userRequestId?: number }, { exams: IExam[] }>(
            `users/${userId}/exams/own`,
            { userRequestId: userRequestId || -1 }
        );
    };

    return <ExamProfileOutlet getExams={getExams} title="Bài thi sở hữu" />;
}
