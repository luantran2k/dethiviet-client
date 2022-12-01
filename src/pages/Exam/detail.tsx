import { Star } from "@mui/icons-material";
import {
    Box,
    Button,
    Stack,
    Table,
    TableHead,
    Typography,
} from "@mui/material";
import { grey, teal, yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import UserNameButton from "../../components/Button/UserNameButton";
import IExam from "../../components/Exam/interfaces/IExam";
import ExamCarousel from "../../components/ExamCarousel";
import { BACKUP_AVATAR } from "../../const/const";
import { sendAlert, User } from "../../redux/slices/appSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface IDetailExam extends IExam {
    owner: User;
    completedCount?: number;
    relatedExams?: IDetailExam[];
}

export interface IDetailExamPageProps {}

export default function DetailExamPage(props: IDetailExamPageProps) {
    const { examId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.app.userInfo?.id);
    const [exam, setExam] = useState<IDetailExam | undefined>(undefined);
    useEffect(() => {
        const getExam = async () => {
            const exam = await request.get<any, IDetailExam>(
                "exams/" + examId,
                {
                    userId: userId,
                    includeOwner: true,
                    withRelatedExams: true,
                }
            );
            setExam(exam);
        };
        getExam();
    }, [examId]);

    if (exam) {
        return (
            <Stack maxWidth="60rem" margin="0 auto" spacing={12}>
                <Box
                    marginTop="2rem"
                    padding="2rem"
                    boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                    sx={{
                        span: {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Typography
                        variant="h1"
                        fontSize="3.2rem"
                        my={4}
                        fontWeight={400}
                        color={grey[900]}
                        marginY={0}
                    >
                        {exam.title || "Không rõ"}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        height="4rem"
                        marginBottom={4}
                    >
                        <img
                            src={exam.owner.profileImg || BACKUP_AVATAR}
                            style={{ height: "100%", display: "inline-block" }}
                        />
                        <Stack>
                            <UserNameButton user={exam.owner} />
                            <Typography>
                                <span>Đăng ngày: </span>
                                {ultis.formatDate(exam.createdAt) || "Không rõ"}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Typography>
                        <span>Năm học: </span>
                        {`${new Date(exam.date as string).getFullYear()} - ${
                            new Date(exam.date as string).getFullYear() + 1
                        }` || "Không rõ"}
                    </Typography>
                    <Typography>
                        <span>Cập nhật ngày: </span>
                        {ultis.formatDate(exam.createdAt) || "Không rõ"}
                    </Typography>
                    <Typography>
                        <span>Thời gian làm bài: </span>
                        {exam.duration}
                    </Typography>
                    <Typography>
                        <span>Tên kỳ thi: </span>
                        {exam.examName}
                    </Typography>
                    <Typography>
                        <span>Đơn vị phát hành: </span>
                        {exam.publishers}
                    </Typography>
                    <Typography>
                        <span>Môn: </span>
                        {exam.subjectName}
                    </Typography>
                    <Typography>
                        <span>Lớp/Trình độ: </span>
                        {exam.grade}
                    </Typography>
                    <Typography>
                        <span>Loại đề: </span>
                        {exam.type === "official"
                            ? "Chính thức"
                            : "Không chính thức"}
                    </Typography>
                    <Typography>
                        <span>Mô tả: </span>
                        {exam.description || "Không có"}
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={4}
                        marginTop="2rem"
                        alignItems="center"
                    >
                        <Star
                            style={{
                                color: exam.isFavorited ? yellow[700] : "black",
                                cursor: "pointer",
                                fontSize: "2rem",
                            }}
                            onClick={async () => {
                                if (!userId) {
                                    dispatch(
                                        sendAlert({
                                            message:
                                                "Bạn cần đăng nhập để thực hiện chức năng này",
                                            time: 3,
                                            severity: "warning",
                                        })
                                    );
                                    return;
                                }
                                if (exam.isFavorited) {
                                    const res = await request.delete(
                                        `exams/${exam.id}/favorite?userId=${userId}`
                                    );
                                    if (res) {
                                        setExam(
                                            (preValue) =>
                                                ({
                                                    ...preValue,
                                                    isFavorited: false,
                                                } as IDetailExam)
                                        );
                                    }
                                } else {
                                    const res = await request.post(
                                        `exams/${exam.id}/favorite?userId=${userId}`,
                                        {}
                                    );
                                    if (res) {
                                        setExam(
                                            (preValue) =>
                                                ({
                                                    ...preValue,
                                                    isFavorited: true,
                                                } as IDetailExam)
                                        );
                                    }
                                }
                            }}
                        />

                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate("../practice/" + exam.id);
                            }}
                        >
                            Thi thử
                        </Button>

                        {/* <Button variant="contained">Đánh giá</Button>
                        <Button variant="contained">
                            Thêm vào danh sách đề thi mẫu
                        </Button> */}
                    </Stack>
                </Box>
                <ExamCarousel
                    title="Các đề thi liên quan"
                    exams={exam.relatedExams}
                />
            </Stack>
        );
    }
    return <Typography variant="h6">Đang tải dữ liệu</Typography>;
}
