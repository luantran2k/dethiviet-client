import { User } from "../../../redux/slices/appSlice";
import IExam from "../../Exam/interfaces/IExam";

export default interface IReport {
    id: number;
    user: User;
    userId: number;
    exam?: IExam;
    examId?: number;
    image?: string;
    content: string;
    state: string;
    createdAt: string;
    updatedAt: string;
}
