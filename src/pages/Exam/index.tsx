import { useEffect, useState } from "react";
import IExam from "../../components/Exam/interfaces/IExam";
import request from "../../Utils/request";

export interface IExamPageProps {}
interface examsState {
    lastestExams: IExam[];
    popularMonthExams: IExam[];
}

export default function ExamPage(props: IExamPageProps) {
    const [exams, setExams] = useState<examsState>();
    useEffect(() => {
        const getExams = async () => {
            const res = await request.get<any, examsState>("exams/index");
            if (res) setExams(res);
            console.log(res);
        };
        getExams();
    }, []);
    return <div>Exam Page</div>;
}
