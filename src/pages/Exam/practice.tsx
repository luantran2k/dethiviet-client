import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, useAuth } from "../../app/hooks";
import Countdown from "../../components/Countdown";
import { getExam, removeExamState } from "../../redux/slices/examSlice";

export interface IPracticeExamPageProps {}

export default function PracticeExamPage(props: IPracticeExamPageProps) {
    useAuth();
    const { examId } = useParams();
    const dispatch = useAppDispatch();
    const exam = useAppSelector((state) => state.exam);
    const [time, setTime] = useState<number | undefined>(
        exam?.duration ? exam.duration * 60 : undefined
    );
    const [isPractice, setPractice] = useState<boolean>(false);
    useEffect(() => {
        let intervalId: number | undefined = undefined;
        if (isPractice && time) {
            intervalId = setInterval(() => {
                setTime((pre) => pre! - 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isPractice]);

    useEffect(() => {
        if (examId) {
            dispatch(getExam({ examId: Number(examId), includePart: true }));
        }
        return () => {
            dispatch(removeExamState());
        };
    }, []);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Countdown time={time} />
            <Button
                variant="contained"
                onClick={() => setPractice((pre) => !pre)}
            >
                Practice
            </Button>
        </Box>
    );
}
