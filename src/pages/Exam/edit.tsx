import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button, Grid, Stack } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Exam from "../../components/Exam";
import AppModal from "../../components/Modal";
import PaperPage from "../../components/PaperPage";
import CreatePartModal from "../../components/Part/Modal/create";
import { getExam, saveExam } from "../../redux/slices/examSlice";
import request from "../../Utils/request";
export interface ICreateExamPageProps {}

export default function EditExamPage(props: ICreateExamPageProps) {
    const { examId } = useParams();
    const scale = React.useRef(1);
    const pageAreaRef = React.useRef<HTMLDivElement>(null);
    const paperGroupRef = React.useRef<HTMLDivElement>(null);
    const [isPreview, setPreview] = React.useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handlePrint = useReactToPrint({
        content: () => paperGroupRef.current,
        documentTitle: "Bai kiem tra",
        // onAfterPrint: () => alert("Print success"),
    });

    //get Exan fron db if has examId
    useEffect(() => {
        if (examId) {
            dispatch(getExam(examId));
        }
    }, [examId]);

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                console.log("CTRL + S");
                dispatch(saveExam(examId));
            }
        });
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
            height="100px"
            flexGrow={1}
        >
            {isPreview && (
                <Grid
                    item
                    flexBasis={"60%"}
                    sx={{ bgcolor: grey[300] }}
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
                        <PaperPage />
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
                        Preview
                    </Button>
                    <Button
                        onClick={() => {
                            navigate("../");
                        }}
                    >
                        Redirect
                    </Button>
                    <Button variant="contained" onClick={handlePrint}>
                        Export
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            request
                                .delete("exams/" + examId)
                                .then((data) => navigate("/exam"));
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        onClick={async () => {
                            const res = await dispatch(saveExam(examId));
                            const id =
                                res.payload?.["id" as keyof typeof res.payload];
                            if (id != examId) {
                                console.log("navigate");
                                return navigate("./" + id);
                            }
                        }}
                    >
                        Save
                    </Button>
                </Stack>
                <Exam />
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
