import { AccessTime, LibraryBooks, TagFaces } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { amber, grey, red, teal, yellow } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import FeatureCard from "../../components/Card/FeatureCard";
import CreateExamButton from "../../components/Exam/Button/CreateExamButton";
import { theme } from "../../themes";
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
    const navigate = useNavigate();

    return (
        <Container>
            <Stack sx={{ margin: "2rem auto" }} spacing="6rem">
                <Grid
                    container
                    alignItems="center"
                    maxWidth="86rem"
                    zIndex="-1"
                >
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            [`@media (max-width: ${theme.breakpoints.values.md}px)`]:
                                {
                                    textAlign: "center",
                                    h1: {
                                        fontSize: "3.2rem",
                                    },
                                },
                            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]:
                                {
                                    textAlign: "center",
                                    h1: {
                                        fontSize: "2.4rem",
                                    },
                                    h6: {
                                        fontSize: "1.2rem",
                                    },
                                },
                        }}
                    >
                        <Typography
                            variant="h1"
                            fontSize="4rem"
                            fontWeight="500"
                            color={grey[900]}
                        >
                            Tạo đề thi nhanh chóng và dễ dàng
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            fontSize="1.4rem"
                            color={grey[800]}
                            my={3}
                        >
                            Khám phá kho tài liệu khổng lồ và đa dạng. Dễ dàng
                            kiểm tra trình độ với các bài thi thử
                        </Typography>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            gap={2}
                            sx={{
                                [`@media (max-width: ${theme.breakpoints.values.md}px)`]:
                                    {
                                        alignItems: "center",
                                        justifyContent: "center",
                                    },
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => navigate("/exam/search")}
                            >
                                Tìm kiếm bài thi
                            </Button>
                            <CreateExamButton variant="outlined" />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <img
                            src="/image/homePage/hero.png"
                            style={{ width: "100%" }}
                        />
                    </Grid>
                </Grid>
                {/* <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                    <FeatureCard
                        color={red[600]}
                        icon={<TagFaces />}
                        title={"Dễ dàng sử dụng"}
                    />
                    <FeatureCard
                        color={teal[600]}
                        icon={<LibraryBooks />}
                        title={"Đề thi đa dạng"}
                    />
                    <FeatureCard
                        color={amber[600]}
                        icon={<AccessTime />}
                        title={"Tiết kiệm thời gian"}
                    />
                </Stack> */}
            </Stack>
        </Container>
    );
}
