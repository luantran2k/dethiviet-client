import { PartType } from "../../Part/interfaces/IPart";

export default interface IExam {
    id?: number;
    title?: string;
    description?: string;
    ownerId?: number;
    isPublic?: boolean | "true" | "false";
    subjectName?: string;
    grade?: string;
    date?: Date | string | null;
    duration?: number;
    publishers?: string;
    type?: string;
    examName?: string;
    documentUrl?: string;
    documentFile?: File;
    parts?: PartType[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ExamFilter {
    page?: number;
    quantity?: number;
    title?: string;
    subjectName?: string;
    year?: number;
    grade?: string;
}

export interface ExamSummary {
    id: number;
    ownerId: number;
    title: string;
    year: number;
    subjectName: string;
    grade: string;
}

export interface ExamPayload {
    title?: string;
    description?: string;
    ownerId?: string;
    isPublic?: boolean | "true" | "false";
    year?: number;
    subjectName?: string;
    grade?: string;
    schoolName?: string;
    time?: number;
}
