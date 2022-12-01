import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Countdown from "../../components/Countdown";

export interface IPracticeExamPageProps {}

export default function PracticeExamPage(props: IPracticeExamPageProps) {
    const [time, setTime] = useState<number>(() => {
        const hour = 5 * 60 * 60;
        const minute = 50 * 60;
        const second = 2;
        return hour + minute + second;
    });
    const [isPractice, setPractice] = useState<boolean>(false);
    useEffect(() => {
        let intervalId: number | undefined = undefined;
        if (isPractice) {
            intervalId = setInterval(() => {
                setTime((pre) => pre - 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isPractice]);
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
