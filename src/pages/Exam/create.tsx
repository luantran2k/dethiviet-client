import * as React from "react";
import { useAppSelector } from "../../app/hooks";

export interface ICreateExamPageProps {}

export default function CreateExamPage(props: ICreateExamPageProps) {
    const exams = useAppSelector((state) => state.app.examsSelected);
    return <div>{JSON.stringify(exams)}</div>;
}
