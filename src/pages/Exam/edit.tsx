import { MoreHoriz } from "@mui/icons-material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    MenuItem,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import React, { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch, useAppSelector, useAuth } from "../../app/hooks";
import FormularForm from "../../components/FormularForm";
import AppModal from "../../components/Modal";
import CreatePartModal from "../../components/Part/Modal/create";
import PdfPreview from "../../components/PdfPreview/";
import PdfNativePreview from "../../components/PdfPreview/NativePreview";
import PopupMenu from "../../components/PopupMenu";
import { sendAlert } from "../../redux/slices/appSlice";
import { getExam, removeExamState } from "../../redux/slices/examSlice";
import request from "../../Utils/request";
const Exam = React.lazy(() => import("../../components/Exam"));
const PaperPage = React.lazy(() => import("../../components/PaperPage"));

export interface ICreateExamPageProps {}

export default function EditExamPage(props: ICreateExamPageProps) {
    const userInfo = useAuth();
    const { examId } = useParams();
    const scale = React.useRef(1);
    const pageAreaRef = React.useRef<HTMLDivElement>(null);
    const paperGroupRef = React.useRef<HTMLDivElement>(null);
    const [isPreview, setPreview] = React.useState(true);
    const [isNativePreview, setNativePreview] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const exam = useAppSelector((state) => state.exam) || " Bài kiểm tra";
    const handlePrint = useReactToPrint({
        content: () => paperGroupRef.current,
        documentTitle: exam.title,
    });

    //get Exan fron db if has examId
    useEffect(() => {
        if (examId) {
            dispatch(getExam({ examId: Number(examId), includePart: true }));
        }
        return () => {
            dispatch(removeExamState());
        };
    }, []);

    //remove ctrl + scrolling event
    const handleWheel = (event: WheelEvent) => {
        if (event.ctrlKey) {
            event.preventDefault();
            if (pageAreaRef.current && paperGroupRef.current) {
                if (event.deltaY <= 0 && scale.current <= 1.6) {
                    scale.current += 0.05;
                } else if (event.deltaY > 0 && scale.current >= 0.6) {
                    scale.current -= 0.05;
                }
                paperGroupRef.current.style.transform = `scale(${scale.current}) `;
                console.log(paperGroupRef.current.offsetHeight);
            }
        }
    };

    const togglePreview = () => {
        setPreview((preState) => !preState);
    };
    useEffect(() => {
        if (pageAreaRef.current) {
            pageAreaRef.current.addEventListener("wheel", handleWheel);
        }
        return () => {
            pageAreaRef.current?.removeEventListener("wheel", handleWheel);
        };
    }, []);

    useEffect(() => {
        if (exam.id && userInfo?.id && userInfo.id !== exam.ownerId) {
            navigate("/");
            dispatch(
                sendAlert({
                    message: "Bạn không có quyền chỉnh sửa đề thi này",
                    severity: "error",
                })
            );
        }
    }, [exam]);

    if (!exam.id) {
        return <Typography>Đang tải dữ liệu...</Typography>;
    }
    return (
        <Grid
            container
            width={"100vw"}
            alignItems="start"
            height="calc(100vh - 4rem)"
            flexGrow={1}
        >
            {isNativePreview && exam.documentUrl ? (
                <PdfNativePreview
                    url={exam.documentUrl}
                    isPreview={isPreview}
                />
            ) : (
                <Grid
                    item
                    flexBasis={isPreview ? "60%" : "0"}
                    sx={{
                        bgcolor: grey[300],
                        transition: "all .3s ease-in-out",
                    }}
                    className="page-area"
                    ref={pageAreaRef}
                    height="100%"
                    overflow="auto"
                >
                    {exam.documentUrl ? (
                        <Box
                            ref={paperGroupRef}
                            sx={{ transformOrigin: "top center" }}
                        >
                            <PdfPreview
                                path={exam.documentUrl}
                                securityCode={exam.securityCode}
                                scale={scale.current}
                            />
                        </Box>
                    ) : (
                        <Stack
                            className="paper-group"
                            ref={paperGroupRef}
                            sx={{ transformOrigin: "top center" }}
                            spacing={4}
                            alignItems="center"
                        >
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <PaperPage />
                            </Suspense>
                        </Stack>
                    )}
                </Grid>
            )}
            <Grid
                item
                flexGrow={1}
                flexBasis={"40%"}
                sx={{
                    bgcolor: teal[50],
                    overflowX: "auto",
                    overflowY: "scroll",
                    position: "relative",
                }}
                height="100%"
                padding={4}
            >
                <PopupMenu
                    trigger={
                        <Button
                            variant="contained"
                            sx={{
                                position: "fixed",
                                bottom: "4rem",
                                right: "1rem",
                                zIndex: 2,
                            }}
                        >
                            <MoreHoriz />
                        </Button>
                    }
                >
                    <Box>
                        <MenuItem onClick={() => togglePreview()}>
                            Xem trước
                        </MenuItem>

                        <MenuItem onClick={handlePrint}>
                            In/ Lưu file pdf
                        </MenuItem>

                        {!exam.documentUrl && <FormularForm />}
                        <MenuItem
                            onClick={() => {
                                request
                                    .delete("exams/" + examId)
                                    .then((data) => navigate("/exam"));
                            }}
                        >
                            Xoá
                        </MenuItem>
                    </Box>
                </PopupMenu>
                {exam.documentUrl && (
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isNativePreview}
                                onChange={() => {
                                    setNativePreview((pre) => !pre);
                                }}
                            />
                        }
                        label="Xem đề thi chế độ mặc định của trình duyệt"
                    />
                )}
                <Suspense fallback={<h4>Đang tải trang</h4>}>
                    <Exam />
                </Suspense>
                <Stack justifyContent="center" direction="row" padding={4}>
                    <AppModal
                        buttonStartIcon={
                            <AddCircleOutlineRoundedIcon
                                fontSize="large"
                                color="primary"
                            />
                        }
                        buttonStyle={{
                            borderRadius: "50%",
                            padding: "16px",
                        }}
                        buttonVariant="text"
                        buttonTitle="Tạo phần mới"
                    >
                        <CreatePartModal />
                    </AppModal>
                </Stack>
            </Grid>
        </Grid>
    );
}
