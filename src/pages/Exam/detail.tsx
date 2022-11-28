import { Star } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import IExam from "../../components/Exam/interfaces/IExam";
import { BACKUP_AVATAR } from "../../const/const";
import { User } from "../../redux/slices/appSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface IDetailExam extends IExam {
    owner: User;
    completedCount?: number;
}

export interface IDetailExamPageProps {}

export default function DetailExamPage(props: IDetailExamPageProps) {
    const { examId } = useParams();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.app.userInfo?.id);
    const [exam, setExam] = useState<IDetailExam | undefined>(undefined);
    useEffect(() => {
        const getExam = async () => {
            const exam = await request.get<any, IDetailExam>(
                "exams/" + examId + "?includeOwner=true&userId=" + userId
            );
            setExam(exam);
        };
        getExam();
    }, []);

    if (exam) {
        return (
            <Box maxWidth="60rem" margin="0 auto">
                <Typography variant="h1" fontSize="3.4rem" my={4}>
                    {exam.title}
                </Typography>
                <Typography>
                    Năm học: {new Date(exam.date as string).getFullYear()}
                </Typography>
                <Typography>
                    Tạo ngày: {ultis.formatDate(exam.createdAt)}
                </Typography>
                <Typography>
                    Cập nhật ngày: {ultis.formatDate(exam.createdAt)}
                </Typography>
                <Stack direction="row" height="4rem">
                    <img
                        src={exam.owner.profileImg || BACKUP_AVATAR}
                        style={{ height: "100%", display: "inline-block" }}
                    />
                    <Typography>
                        {exam.owner.name || exam.owner.username}
                    </Typography>
                </Stack>
                <Typography>Thời gian làm bài{exam.duration}</Typography>
                <Typography>Tên kỳ thi: {exam.examName}</Typography>
                <Typography>Đơn vị phát hành: {exam.publishers}</Typography>
                <Typography>Môn: {exam.subjectName}</Typography>
                <Typography>Lớp/Trình độ: {exam.grade}</Typography>
                <Typography>Mô tả: {exam.description}</Typography>
                <Stack direction="row" spacing={4}>
                    {userId === exam.ownerId && (
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate("../edit/" + exam.id);
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    )}
                    <Star
                        style={{
                            color: exam.isFavorited ? yellow[700] : "black",
                            cursor: "pointer",
                        }}
                        onClick={async () => {
                            if (!userId) {
                                alert(
                                    "Bạn cần đăng nhập để thực hiện chức năng này"
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
                    <Button variant="contained">Đánh giá</Button>
                    <Button variant="contained">
                        Thêm vào danh sách quan tâm
                    </Button>
                </Stack>
            </Box>
        );
    }
    return <Typography variant="h6">Đang tải dữ liệu</Typography>;
}
