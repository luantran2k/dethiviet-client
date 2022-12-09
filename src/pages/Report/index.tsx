import { Delete, Image } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Avatar from "../../components/Avatar";
import UserNameButton from "../../components/Button/UserNameButton";
import AppModal from "../../components/Modal";
import IReport from "../../components/ReportError/interfaces/Report";
import { sendAlert } from "../../redux/slices/appSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface IReportPageProps {}

export default function ReportPage(props: IReportPageProps) {
    const [reports, setReports] = useState<IReport[]>([]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getReports = async () => {
            const reports = await request.get<any, IReport[]>(
                "reports/findByUser"
            );
            if (!ultis.checkEmptyArray(reports)) {
                setReports(reports!);
            }
        };
        getReports();
    }, []);
    return (
        <Box
            maxWidth="64rem"
            margin="2rem auto"
            padding="2rem"
            borderRadius=".4rem"
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
            <Typography
                variant="h1"
                fontSize="2.4rem"
                fontWeight="400"
                marginBottom={4}
                textAlign="center"
            >
                Báo cáo lỗi
            </Typography>
            {reports.length > 0 ? (
                <Stack spacing={2}>
                    {reports.map((report) => (
                        <Stack key={report.id} direction="row" spacing={2}>
                            <Stack>
                                <Stack spacing={1} alignItems="center">
                                    <Avatar
                                        profileImg={report.user.profileImg!}
                                    />
                                    <UserNameButton user={report.user} />
                                </Stack>
                                <Typography>
                                    Ngày:{" "}
                                    {new Date(
                                        report.createdAt
                                    ).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                    Thời gian:{" "}
                                    {new Date(
                                        report.createdAt
                                    ).toLocaleTimeString()}
                                </Typography>
                            </Stack>
                            <Stack flex={1}>
                                <Typography
                                    variant="h3"
                                    fontSize="1.4rem"
                                    onClick={() =>
                                        navigate(
                                            "/exam/detail/" + report.examId
                                        )
                                    }
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            color: teal[500],
                                        },
                                    }}
                                >
                                    {report.exam?.title}
                                </Typography>
                                <Typography fontSize="1.1rem" fontWeight="500">
                                    Mô tả
                                </Typography>
                                <Typography>{report.content}</Typography>
                            </Stack>
                            <Stack>
                                {report.image && (
                                    <AppModal
                                        trigger={
                                            <Button>
                                                <Image />
                                            </Button>
                                        }
                                        sx={{
                                            width: "68rem",
                                            maxHeight: "90vh",
                                            maxWidth: "90vw",
                                            overflow: "auto",
                                        }}
                                    >
                                        <Box>
                                            <img
                                                src={report.image}
                                                alt=""
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </Box>
                                    </AppModal>
                                )}
                                <Button
                                    color="error"
                                    onClick={async () => {
                                        setReports((reports) =>
                                            reports.filter(
                                                (reportFilter) =>
                                                    reportFilter.id !==
                                                    report.id
                                            )
                                        );
                                        const res = await request.delete(
                                            "reports/" + report.id
                                        );
                                        if (res) {
                                            dispatch(
                                                sendAlert({
                                                    message: "Xoá thành công",
                                                    severity: "success",
                                                })
                                            );
                                        }
                                    }}
                                >
                                    <Delete />
                                </Button>
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            ) : (
                <Typography textAlign="center" fontSize="1.2rem">
                    Không có báo cáo nào
                </Typography>
            )}
        </Box>
    );
}
