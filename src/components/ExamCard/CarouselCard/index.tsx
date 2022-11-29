import { LibraryAdd, MoreVert } from "@mui/icons-material";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { BASE_URL } from "../../../const/const";
import { IDetailExam } from "../../../pages/Exam/detail";
import { addSelectedExam } from "../../../redux/slices/createExamSlice";
import ultis from "../../../Utils/ultis";
import PopupMenu from "../../PopupMenu";

export interface ICarouselCardProps {
    exam: IDetailExam;
    boxShadow?: boolean;
    isClickCard?: boolean;
    menuButton?: React.ReactElement;
}

export default function CarouselCard(props: ICarouselCardProps) {
    const { exam, boxShadow, isClickCard, menuButton } = props;
    const naviage = useNavigate();
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
                cursor: isClickCard ? "pointer" : "default",
            }}
            onClick={() => {
                if (isClickCard) naviage("/exam/detail/" + exam.id);
            }}
        >
            <Stack height="100%">
                <Box flex={1} sx={{ padding: "1rem" }}>
                    <Stack direction="row">
                        <Typography
                            variant="h6"
                            onClick={() => {
                                naviage("/exam/detail/" + exam.id);
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
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(addSelectedExam(exam));
                                    }}
                                >
                                    Thêm vào danh sách chờ
                                </MenuItem>
                                <MenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(
                                            `${BASE_URL}exam/detail/${exam.id}`
                                        );
                                    }}
                                >
                                    Chia sẻ
                                </MenuItem>
                            </Box>
                        </PopupMenu>
                    </Stack>
                    <Typography>Môn học: {exam.subjectName}</Typography>
                    <Typography>Lớp/Trình độ: {exam.grade}</Typography>
                    <Typography>
                        Năm học:{" "}
                        {exam.date
                            ? `${new Date(exam.date).getFullYear()} - ${
                                  new Date(exam.date).getFullYear() + 1
                              }`
                            : "không rõ"}
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
                            <Typography fontWeight={500}>
                                {exam.owner?.name || "@" + exam.owner.username}
                            </Typography>
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
