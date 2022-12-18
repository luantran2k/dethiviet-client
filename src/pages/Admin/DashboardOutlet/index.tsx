import {
    ArticleRounded,
    BugReportRounded,
    PersonRounded,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { amber, lightGreen, red, teal } from "@mui/material/colors";
import ReportCard from "../../../components/Card/ReportCard";

export interface IDashboardOutletProps {}

export default function DashboardOutlet(props: IDashboardOutletProps) {
    return (
        <Box>
            <Typography
                variant="h2"
                fontSize="2rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                Tổng quan
            </Typography>
            <Typography
                variant="h2"
                fontSize="1.6rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                Tuần này
            </Typography>
            <Stack direction={"row"} width="100%" gap={"2rem"}>
                <ReportCard
                    icon={<PersonRounded />}
                    title={"Người dùng mới"}
                    data={"12"}
                />
                <ReportCard
                    icon={<ArticleRounded />}
                    title={"Đề thi mới"}
                    data={"12"}
                    color={lightGreen}
                />
                <ReportCard
                    icon={<PersonRounded />}
                    title={"Người dùng mới"}
                    data={"12"}
                    color={amber}
                />
                <ReportCard
                    icon={<BugReportRounded />}
                    title={"Lỗi mới"}
                    data={"12"}
                    color={red}
                />
            </Stack>
        </Box>
    );
}
