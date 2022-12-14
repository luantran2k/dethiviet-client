import {
    ArticleRounded,
    BugReportRounded,
    PersonRounded,
} from "@mui/icons-material";
import { Box, Grid, MenuItem, Stack, Typography } from "@mui/material";
import { amber, lightGreen, red, teal } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import Avatar from "../../../components/Avatar";
import UserNameButton from "../../../components/Button/UserNameButton";
import ReportCard from "../../../components/Card/ReportCard";
import { ChartData, LineChart } from "../../../components/Chart/Line";
import ExamTitle from "../../../components/Exam/Title";
import { sendAlert } from "../../../redux/slices/appSlice";
import request from "../../../Utils/request";
import { IDetailExam } from "../../Exam/detail";

export interface IDashboardOutletProps {}
const monthLabels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
];
interface DashBoardDataset {
    label: string;
    data: { month: number; count: number }[];
}

interface DashboardData {
    newUser: number;
    newExam: number;
    newCompletedExams: number;
    newReport: number;
    aggregateUser: DashBoardDataset;
    aggregateExams: DashBoardDataset;
    aggregateCompletedExams: DashBoardDataset;
    mostCompletedExams: IDetailExam[];
}

const convertToChartData = (monthsData: DashBoardDataset) => {
    return {
        title: monthsData.label,
        labels: monthLabels,
        datasets: [
            {
                label: monthsData.label,
                data: monthLabels.map((label) => {
                    const month = monthsData.data.find(
                        (curMonth) => curMonth.month == +label
                    );
                    if (month) {
                        return month.count;
                    }
                    return 0;
                }),
            },
        ],
    };
};

export default function DashboardOutlet(props: IDashboardOutletProps) {
    const [dashBoardData, setDashBoardData] = useState<DashboardData>();
    const dispatch = useAppDispatch();
    const [chartData, setChartData] = useState<ChartData>({
        title: "",
        labels: monthLabels,
        datasets: [],
    });

    useEffect(() => {
        const getDashboardData = async () => {
            const dashBoardData = await request.get<any, DashboardData>(
                "admin/dashboard"
            );
            if (dashBoardData) {
                setDashBoardData(dashBoardData);
                const chartData = convertToChartData(
                    dashBoardData.aggregateUser
                );
                setChartData(chartData);
            } else {
                dispatch(
                    sendAlert({
                        message: "C?? l???i x???y ra, vui l??ng th??? l???i",
                        severity: "error",
                    })
                );
            }
        };
        getDashboardData();
    }, []);

    if (!dashBoardData) {
        return <Typography>??ang t???i d??? li???u</Typography>;
    }
    return (
        <Box>
            <Typography
                variant="h2"
                fontSize="2rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                T???ng quan
            </Typography>
            <Typography
                variant="h2"
                fontSize="1.6rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                Tu???n n??y
            </Typography>
            <Grid container spacing={{ xs: 2 }}>
                <Grid item xs={6} sm={3}>
                    <ReportCard
                        icon={<PersonRounded />}
                        title={"Ng?????i d??ng m???i"}
                        data={dashBoardData.newUser}
                        to="../users"
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <ReportCard
                        icon={<ArticleRounded />}
                        title={"????? thi m???i"}
                        data={dashBoardData.newExam}
                        to="../exams"
                        color={lightGreen}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <ReportCard
                        icon={<PersonRounded />}
                        title={"L?????t thi m???i"}
                        data={dashBoardData.newCompletedExams}
                        to="../exams"
                        color={amber}
                    />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <ReportCard
                        icon={<BugReportRounded />}
                        title={"L???i m???i"}
                        data={dashBoardData.newReport}
                        to="../errors"
                        color={red}
                    />
                </Grid>
            </Grid>
            <Typography
                variant="h2"
                fontSize="1.6rem"
                fontWeight={500}
                color={teal[800]}
                mt="4rem"
            >
                Chi ti???t n??m
            </Typography>
            <Stack
                marginTop="1rem"
                direction="row"
                spacing={2}
                sx={{
                    canvas: {
                        flex: 1,
                        maxWidth: "56rem",
                    },
                }}
            >
                <LineChart data={chartData} />
                <Stack
                    flex="1"
                    marginTop="2rem !important"
                    sx={{
                        ".MuiMenuItem-root.active": {
                            backgroundColor: teal[50],
                            borderRadius: ".4rem",
                        },
                    }}
                >
                    <MenuItem
                        className={
                            chartData.title === "Ng?????i d??ng m???i" ? "active" : ""
                        }
                        onClick={() => {
                            const chartData = convertToChartData(
                                dashBoardData.aggregateUser
                            );
                            setChartData(chartData);
                        }}
                    >
                        Ng?????i d??ng m???i
                    </MenuItem>
                    <MenuItem
                        className={
                            chartData.title === "????? thi m???i" ? "active" : ""
                        }
                        onClick={() => {
                            const chartData = convertToChartData(
                                dashBoardData.aggregateExams
                            );
                            setChartData(chartData);
                        }}
                    >
                        ????? thi m???i
                    </MenuItem>
                    <MenuItem
                        className={
                            chartData.title === "L?????t thi m???i" ? "active" : ""
                        }
                        onClick={() => {
                            const chartData = convertToChartData(
                                dashBoardData.aggregateCompletedExams
                            );
                            setChartData(chartData);
                        }}
                    >
                        L?????t thi m???i
                    </MenuItem>
                </Stack>
            </Stack>
            <Stack marginTop="2rem" spacing={3}>
                <Typography
                    variant="h2"
                    fontSize="1.6rem"
                    fontWeight={500}
                    color={teal[800]}
                >
                    ????? thi ???????c l??m nhi???u th??ng n??y
                </Typography>
                {dashBoardData.mostCompletedExams?.map((exam) => {
                    return (
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                padding: "1rem 2rem",
                                bgcolor: teal[50],
                                borderRadius: ".4rem",
                            }}
                        >
                            <Stack>
                                <Avatar profileImg={exam.owner.profileImg} />
                                <UserNameButton user={exam.owner} />
                            </Stack>
                            <Box key={exam.id}>
                                <ExamTitle title={exam.title!} id={exam.id!} />
                                <Typography>
                                    Lu???t thi: {exam.completedCount}
                                </Typography>
                            </Box>
                        </Stack>
                    );
                })}
            </Stack>
        </Box>
    );
}
