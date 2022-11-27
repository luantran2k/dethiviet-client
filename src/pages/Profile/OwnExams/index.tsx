import IExam from "../../../components/Exam/interfaces/IExam";
import request from "../../../Utils/request";
import ExamProfileOutlet from "../ExamProfileOutlet";

export interface IOwnExamsProps {}

export default function OwnExams(props: IOwnExamsProps) {
    const getExams = (userId: number) => {
        return request.get<{ exams: IExam[] }>(`users/${userId}/exams/own`);
    };

    return <ExamProfileOutlet getExams={getExams} title="Bài thi sở hữu" />;
}
