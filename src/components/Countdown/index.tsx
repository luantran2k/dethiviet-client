import { Box, Button, Stack, SxProps, Theme, Typography } from "@mui/material";

export interface ICountdownProps {
    time?: number;
    setPractice: React.Dispatch<React.SetStateAction<boolean>>;
    sx?: SxProps<Theme> | undefined;
}

//second * 60 * 60
export const convertTime = (time: number): string => {
    const hour = Math.floor(time / 3600);
    const restMinute = time % 3600;
    const minute = Math.floor(restMinute / 60);
    const second = restMinute % 60;
    return `${("0" + hour).slice(-2)}:${("0" + minute).slice(-2)}:${(
        "0" + second
    ).slice(-2)}`;
};

export default function Countdown(props: ICountdownProps) {
    const { time, setPractice, sx } = props;

    return (
        <Stack sx={sx} alignItems="center">
            <Typography fontSize="1.4rem">Thời gian còn lại</Typography>
            {time ? (
                <Typography fontSize="2rem">{convertTime(time)}</Typography>
            ) : (
                <Typography fontSize="2rem">00:00:00</Typography>
            )}
            <Button
                variant="contained"
                onClick={() => setPractice((pre) => !pre)}
            >
                Nộp bài
            </Button>
        </Stack>
    );
}
