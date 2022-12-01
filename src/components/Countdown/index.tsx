import { Box } from "@mui/system";

export interface ICountdownProps {
    time?: number;
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
    const { time } = props;

    return (
        <Box height="4rem">
            {time ? (
                <p>{convertTime(time)}</p>
            ) : (
                <p>Thời gian làm bài không xác định</p>
            )}
        </Box>
    );
}
