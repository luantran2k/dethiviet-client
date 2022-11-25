import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useFetch } from "../../app/hooks";
import IExam from "../../components/Exam/interfaces/IExam";
import { BACKUP_AVATAR } from "../../const/const";
import { User } from "../../redux/slices/appSlice";
import ultis from "../../Utils/ultis";

export interface IDetailExam extends IExam {
    owner: User;
}

export interface IDetailExamPageProps {}

export default function DetailExamPage(props: IDetailExamPageProps) {
    const { examId } = useParams();
    const navigate = useNavigate();
    const userId = useAppSelector((state) => state.app.userInfo?.id);
    const {
        data: exam,
        error,
        loading,
    } = useFetch<any, IDetailExam>(
        "exams/" + examId + "?includeOwner=true",
        {}
    );

    if (loading) {
        return <Typography variant="h1">Đang tải dữ liệu</Typography>;
    }
    if (error) {
        return (
            <Typography variant="h1" color="red">
                {error.message}
            </Typography>
        );
    }
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
                    <Button variant="contained">Đánh giá</Button>
                    <Button variant="contained">
                        Thêm vào danh sách quan tâm
                    </Button>
                </Stack>
            </Box>
        );
    }
    return (
        <Typography variant="h4" color="red">
            Có lối xảy ra, vui lòng thử lại
        </Typography>
    );
}
