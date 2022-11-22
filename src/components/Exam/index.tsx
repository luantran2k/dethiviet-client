import { Box } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { partsSelector } from "../../redux/selectors/examSeletors";
import { Part } from "../Part";
import ExamInfo from "./Info";

export interface IExamProps {}

const Exam = (props: IExamProps) => {
    const partIds = useAppSelector(partsSelector)?.map((part) => part.id);

    return (
        <Box sx={{ maxWidth: "60rem", margin: "0 auto" }}>
            <form className="exam">
                <ExamInfo />
                {partIds?.map((partId) => (
                    <Part partId={partId} key={partId} />
                ))}
            </form>
        </Box>
    );
};

export default React.memo(Exam);
