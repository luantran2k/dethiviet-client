import { LibraryAdd, MoreVert } from "@mui/icons-material";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { BASE_URL } from "../../../const/const";
import { IDetailExam } from "../../../pages/Exam/detail";
import { sendAlert } from "../../../redux/slices/appSlice";
import { addSelectedExam } from "../../../redux/slices/createExamSlice";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";
import UserNameButton from "../../Button/UserNameButton";
import PopupMenu from "../../PopupMenu";

export interface ICarouselCardProps {
    exam: IDetailExam;
    boxShadow?: boolean;
    menuButton?: React.ReactElement;
    setExams?: React.Dispatch<React.SetStateAction<IDetailExam[] | undefined>>;
}

export default function CarouselCard(props: ICarouselCardProps) {
    const { exam, boxShadow, menuButton, setExams } = props;
    const userId = useAppSelector((state) => state.app.userInfo?.id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                borderRadius: ".4rem",
                textAlign: "left",
                boxShadow: boxShadow
                    ? "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                    : "none",
            }}
        >
            <Stack height="100%">
                <Box flex={1} sx={{ padding: "1rem" }}>
                    <Stack direction="row">
                        <Typography
                            variant="h6"
                            onClick={() => {
                                navigate("/exam/detail/" + exam.id);
                            }}
                            title={exam.title}
                            sx={{
                                flex: 1,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                "&:hover": {
                                    color: teal[700],
                                },
                            }}
                        >
                            {exam.title}
                        </Typography>
                        <PopupMenu
                            trigger={<MoreVert sx={{ cursor: "pointer" }} />}
                            popOverProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "right",
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "right",
                                },
                            }}
                        >
                            <Box>
                                {!exam.documentUrl && (
                                    <MenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addSelectedExam(exam));
                                        }}
                                    >
                                        Thêm vào danh sách chờ
                                    </MenuItem>
                                )}
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(
                                            `${BASE_URL}exam/detail/${exam.id}`
                                        );
                                        dispatch(
                                            sendAlert({
                                                message: "Đã copy đường đẫn",
                                                time: 3,
                                            })
                                        );
                                    }}
                                >
                                    Chia sẻ
                                </MenuItem>
                                {userId === exam.owner.id && (
                                    <>
                                        <MenuItem
                                            onClick={() =>
                                                navigate(
                                                    `/exam/edit/${exam.id}`
                                                )
                                            }
                                        >
                                            Chính sửa
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                request.delete(
                                                    "/exams/" + exam.id
                                                );
                                                if (setExams) {
                                                    setExams((exams) => {
                                                        const newExams =
                                                            exams?.filter(
                                                                (examFilter) =>
                                                                    examFilter.id !==
                                                                    exam.id
                                                            );
                                                        return newExams;
                                                    });
                                                }
                                            }}
                                        >
                                            Xoá
                                        </MenuItem>
                                    </>
                                )}
                            </Box>
                        </PopupMenu>
                    </Stack>
                    <Typography>Môn học: {exam.subjectName}</Typography>
                    <Typography>
                        Lớp/Trình độ:{" "}
                        {exam.grade === "university"
                            ? "Đại học/Cao đẳng"
                            : exam.grade}
                    </Typography>
                    <Typography>
                        Năm học:{" "}
                        {exam.date
                            ? `${new Date(exam.date).getFullYear()} - ${
                                  new Date(exam.date).getFullYear() + 1
                              }`
                            : "không rõ"}
                    </Typography>
                    <Typography>
                        Dạng đề thi: {exam.documentUrl ? "File" : "Web"}
                    </Typography>
                    {exam.completedCount && (
                        <Typography>
                            Số lượt làm tháng này: {exam.completedCount}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        borderTop: "2px solid " + teal[500],
                        padding: ".6rem 1rem",
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <img
                            src={
                                exam.owner?.profileImg
                                    ? exam.owner.profileImg
                                    : "/image/user/profile.png"
                            }
                            style={{ height: "2.8rem", width: "2.8rem" }}
                        />
                        <Box>
                            <UserNameButton user={exam.owner} />
                            <Typography fontSize={".8rem"} fontWeight={400}>
                                Ngày tải lên: {ultis.formatDate(exam.createdAt)}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}
