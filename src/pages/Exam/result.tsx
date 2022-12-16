import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAuth } from "../../app/hooks";
import IExam from "../../components/Exam/interfaces/IExam";
import ExamResultNoDocument from "../../components/Exam/result/NoDocument";
import ExamResultWithDocument from "../../components/Exam/result/WithDocument";
import { removeExamState, updateExam } from "../../redux/slices/examSlice";
import request from "../../Utils/request";
export interface IExamResultPageProps {}

export default function ExamResultPage(props: IExamResultPageProps) {
    useAuth();
    const dispatch = useAppDispatch();
    const { resultId } = useParams();
    const [exam, setExam] = useState<IExam>();
    useEffect(() => {
        const getExams = async () => {
            const result = await request.get<any, { examCompleted: string }>(
                `exams/result/${resultId}`
            );
            if (result?.examCompleted) {
                setExam(JSON.parse(result?.examCompleted));
            }
        };
        getExams();
        dispatch(updateExam({ isPractice: true }));
        return () => {
            dispatch(removeExamState());
        };
    }, []);

    if (!exam) {
        return <></>;
    }
    return exam.documentUrl ? (
        <ExamResultWithDocument exam={exam} resultId={resultId!} />
    ) : (
        <ExamResultNoDocument exam={exam} resultId={resultId!} />
    );
}
