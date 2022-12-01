import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button, Grid, Stack } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import React, { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch, useAppSelector, useAuth } from "../../app/hooks";
import AppModal from "../../components/Modal";
import CreatePartModal from "../../components/Part/Modal/create";
import { getExam, removeExamState } from "../../redux/slices/examSlice";
import request from "../../Utils/request";
const Exam = React.lazy(() => import("../../components/Exam"));
const PaperPage = React.lazy(() => import("../../components/PaperPage"));

export interface ICreateExamPageProps {}

export default function EditExamPage(props: ICreateExamPageProps) {
    useAuth();
    const { examId } = useParams();
    const scale = React.useRef(1);
    const pageAreaRef = React.useRef<HTMLDivElement>(null);
    const paperGroupRef = React.useRef<HTMLDivElement>(null);
    const [isPreview, setPreview] = React.useState(true);
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

    return (
        <Grid
            container
            width={"100vw"}
            alignItems="start"
            height="calc(100vh - 4rem)"
            flexGrow={1}
        >
            {exam.documentUrl ? (
                <object
                    type="application/pdf"
                    data="https://res.cloudinary.com/dm3xuympe/image/upload/v1669455597/dethiviet/exam/documents/m3e2us54jthlbfspeox4.pdf"
                    style={{
                        height: "100%",
                        width: isPreview ? "60%" : "0",
                        transition: "all 0.3s linear",
                    }}
                ></object>
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
                }}
                height="100%"
                padding={4}
            >
                <Stack
                    direction="row"
                    spacing={4}
                    marginY={4}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={() => togglePreview()}>
                        Xem trước
                    </Button>
                    {!exam.documentUrl && (
                        <Button variant="contained" onClick={handlePrint}>
                            In/ Lưu file pdf
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => {
                            request
                                .delete("exams/" + examId)
                                .then((data) => navigate("/exam"));
                        }}
                    >
                        Xoá
                    </Button>
                </Stack>
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
