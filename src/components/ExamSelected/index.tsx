import { Cancel, ViewList } from "@mui/icons-material";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import { grey, red, teal } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    removeSelectedExam,
    removeAllSelectedExam,
} from "../../redux/slices/createExamSlice";
import ultis from "../../Utils/ultis";
import CreateExamButton from "../Exam/Button/CreateExamButton";
import { tealNavBarPath } from "../Navbar";
import PopupMenu from "../PopupMenu";

export interface IExamSelectedProps {}

export default function ExamSelected(props: IExamSelectedProps) {
    const exams = useAppSelector((state) => state.createExam.examsSelected);
    const location = useLocation();
    const isTealNav = ultis.checkPathInArray(location.pathname, tealNavBarPath);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <PopupMenu
            trigger={
                <MenuItem sx={{ height: "100%", position: "relative" }}>
                    <ViewList
                        sx={{
                            color: isTealNav ? "white" : teal[600],
                            transform: " scale(1.4)",
                        }}
                    />
                    {!ultis.checkEmptyArray(exams) && (
                        <Typography
                            color={isTealNav ? teal[600] : "white"}
                            sx={{
                                backgroundColor: isTealNav
                                    ? "white"
                                    : teal[600],
                                width: "1.4rem",
                                height: "1.4rem",
                                borderRadius: "50%",
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 2,
                                transform: "translate(-10%, -50%)",
                            }}
                        >
                            {exams.length}
                        </Typography>
                    )}
                </MenuItem>
            }
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
            <Stack
                sx={{
                    padding: "1rem",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    width: "26rem",
                }}
            >
                <Typography
                    variant="h5"
                    fontSize="1.4rem"
                    fontWeight={600}
                    borderBottom={`1px solid ${teal[600]}`}
                    color={teal[800]}
                >
                    Các đề thi đã chọn
                </Typography>
                <Stack
                    sx={{
                        maxHeight: "60vh",
                        overflowY: "auto",
                        margin: "1rem 0",
                    }}
                >
                    {!ultis.checkEmptyArray(exams) ? (
                        exams.map((exam) => (
                            <Stack
                                key={exam.id}
                                direction="row"
                                alignItems="center"
                                width="100%"
                                sx={{
                                    padding: ".2rem .6rem",
                                    borderRadius: ".4rem",
                                    "&:hover": {
                                        backgroundColor: teal[50],
                                    },
                                }}
                            >
                                <Box
                                    flex={1}
                                    onClick={() =>
                                        navigate("/exam/detail/" + exam.id)
                                    }
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        title={exam.title}
                                        sx={{
                                            color: grey[800],
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {exam.title}
                                    </Typography>
                                    <Typography
                                        title={exam.subjectName}
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        Môn: {exam.subjectName}
                                    </Typography>
                                </Box>
                                <Cancel
                                    sx={{
                                        color: red[500],
                                        cursor: "pointer",
                                        fontSize: "1.6rem",
                                    }}
                                    onClick={() =>
                                        dispatch(removeSelectedExam(exam.id!))
                                    }
                                />
                            </Stack>
                        ))
                    ) : (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            margin="2rem 0"
                        >
                            <Typography variant="h5">Trống</Typography>
                        </Box>
                    )}
                </Stack>
                <Stack direction="row" spacing={1} justifyContent="flex-end ">
                    <CreateExamButton
                        size="small"
                        text={"Tạo đề thi từ đề đã chọn"}
                        action={() => {
                            navigate("/exam/create");
                        }}
                    />
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{ alignSelf: "flex-end" }}
                        onClick={() => {
                            dispatch(removeAllSelectedExam());
                        }}
                    >
                        Bỏ chọn hết
                    </Button>
                </Stack>
            </Stack>
        </PopupMenu>
    );
}
