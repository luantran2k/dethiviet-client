import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CenterMessage from "../../components/CenterMessage";
import IExam from "../../components/Exam/interfaces/IExam";
import PartsTemp from "../../components/Part/Modal/createAuto";
import QuestionTypeDatas from "../../const/QuestionTypes";
import {
    addPartTemp,
    removeAllPartsTemp,
} from "../../redux/slices/createExamSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface ICreateExamPageProps {}

export interface QuestionInfo {
    questions: { id: number }[];
    type: string;
}

interface ExamDataInfo {
    subjectName: string;
    numberOfExams: number;
    examIds: number[];
    questionInfos?: QuestionInfo[];
}

const getExamDataInfos = (exams: IExam[]) => {
    const examDataInfos = exams.reduce((preValue, curValue) => {
        const indexOfSubjectName = preValue.findIndex(
            (examDataInfo) => examDataInfo.subjectName === curValue.subjectName
        );
        if (indexOfSubjectName === -1) {
            return [
                ...preValue,
                {
                    subjectName: curValue.subjectName as string,
                    numberOfExams: 1,
                    examIds: [curValue.id],
                },
            ];
        }
        preValue[indexOfSubjectName].examIds.push(curValue.id);
        preValue[indexOfSubjectName].numberOfExams += 1;
        return preValue;
    }, [] as ExamDataInfo[]);
    examDataInfos.push(
        examDataInfos.reduce(
            (preValue, curValue) => {
                preValue.examIds.push(...curValue.examIds);
                preValue.numberOfExams += curValue.examIds.length;
                return preValue;
            },
            {
                subjectName: "Tất cả",
                examIds: [],
                numberOfExams: 0,
            } as ExamDataInfo
        )
    );
    return examDataInfos;
};

export default function CreateExamPage(props: ICreateExamPageProps) {
    const dispatch = useAppDispatch();
    const exams = useAppSelector((state) => state.createExam.examsSelected);
    const parts = useAppSelector((state) => state.createExam.parts);
    const [examDataInfos, setExamDataInfos] = useState<ExamDataInfo[]>();
    const [examDataInfo, setExamDataInfo] = useState<ExamDataInfo>();
    const questionTypes =
        examDataInfo?.questionInfos?.map((questionInfo) => questionInfo.type) ||
        [];

    useEffect(() => {
        const getExamInfoFromServer = async (examDataInfo: ExamDataInfo) => {
            const res = await request.post<{
                questionInfos: QuestionInfo[];
            }>("exams/exam-to-create-info", {
                examIds: examDataInfo.examIds,
            });
            return res.questionInfos;
        };

        const getExamInfosFromServer = async () => {
            const newExamDataInfosPromise = getExamDataInfos(exams).map(
                async (examDataInfo) => {
                    return {
                        ...examDataInfo,
                        questionInfos: await getExamInfoFromServer(
                            examDataInfo
                        ),
                    };
                }
            );
            const newExamDataInfos = await Promise.all(newExamDataInfosPromise);
            setExamDataInfos(newExamDataInfos);
            setExamDataInfo(newExamDataInfos[0]);
        };

        getExamInfosFromServer();
    }, [exams]);

    useEffect(() => {
        const subjectNameSelectedFind = examDataInfos?.find(
            (examInfo) => examInfo.subjectName === examDataInfo?.subjectName
        );
        if (subjectNameSelectedFind !== undefined) {
            setExamDataInfo(subjectNameSelectedFind);
        }
    }, [examDataInfo]);

    if (
        ultis.checkEmptyArray(examDataInfos) ||
        examDataInfos === undefined ||
        examDataInfo === undefined
    ) {
        return <CenterMessage message="Vui lòng chọn đề thi mẫu trước" />;
    }

    return (
        <Stack
            flexDirection="row"
            maxWidth={"68rem"}
            minHeight="calc(100vh - 10rem)"
            margin="2rem auto"
            borderRadius=".4rem"
            boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
            <Stack
                spacing={1}
                padding="2rem"
                bgcolor={teal[50]}
                flex="0  0 30%"
                sx={{
                    span: {
                        fontWeight: "bold",
                        color: teal[900],
                    },
                    ".MuiTypography-root": {
                        fontSize: "1.1rem",
                    },
                }}
            >
                <TextField
                    select
                    fullWidth
                    label="Môn học"
                    value={
                        examDataInfos.some(
                            (exam) =>
                                exam.subjectName === examDataInfo.subjectName
                        )
                            ? examDataInfo.subjectName
                            : examDataInfos[0].subjectName
                    }
                    onChange={(e) => {
                        const examDataInfo = examDataInfos.find(
                            (examInfo) =>
                                examInfo.subjectName === e.target.value
                        );
                        if (!ultis.checkEmptyArray(parts)) {
                            const isAllow = confirm(
                                "Thay đổi sẽ bỏ hết tất cả các phần đã được tạo, bạn có muốn tiếp tục ?"
                            );
                            if (isAllow) {
                                setExamDataInfo(examDataInfo);
                                dispatch(removeAllPartsTemp());
                            }
                            return;
                        } else {
                            setExamDataInfo(examDataInfo);
                        }
                    }}
                >
                    {examDataInfos.map((examDataInfo, index) => (
                        <MenuItem
                            key={index}
                            defaultChecked={index === 0 ? true : false}
                            value={examDataInfo.subjectName}
                        >
                            {examDataInfo.subjectName}
                        </MenuItem>
                    ))}
                </TextField>
                <Typography>
                    <span>Số bài thi: </span>
                    {examDataInfo.numberOfExams}
                </Typography>
                {ultis.checkEmptyArray(examDataInfo.questionInfos) ? (
                    <Typography>Đề không có câu hỏi nào</Typography>
                ) : (
                    examDataInfo.questionInfos?.map((questionInfo, index) => (
                        <Stack key={index}>
                            <Typography>
                                <span>Loại câu hỏi: </span>
                                {
                                    QuestionTypeDatas[
                                        questionInfo.type as keyof typeof QuestionTypeDatas
                                    ]?.label
                                }
                            </Typography>
                            <Typography>
                                <span>Số lượng câu hỏi: </span>
                                {questionInfo.questions.length}
                            </Typography>
                        </Stack>
                    ))
                )}
            </Stack>
            <Stack
                flex="1"
                sx={{
                    padding: "2rem",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h5" marginBottom={2}>
                    Tạo phần thi
                </Typography>
                <PartsTemp questionTypes={questionTypes} />
                <Stack
                    spacing={2}
                    direction="row"
                    marginTop="1rem"
                    justifyContent="flex-end"
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            dispatch(addPartTemp());
                        }}
                    >
                        Thêm phần
                    </Button>
                    <Button variant="outlined" onClick={() => {}}>
                        Tạo bài thi
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
