import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CenterMessage from "../../components/CenterMessage";
import IExam from "../../components/Exam/interfaces/IExam";
import QuestionTypeDatas from "../../const/QuestionTypes";
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
    const [examDataInfos, setExamDataInfos] = useState<ExamDataInfo[]>();
    const [examDataInfo, setExamDataInfo] = useState<ExamDataInfo>();

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
        <Box maxWidth={"60rem"} margin="2rem auto">
            <TextField
                select
                label="Môn học"
                value={
                    examDataInfos.some(
                        (exam) => exam.subjectName === examDataInfo.subjectName
                    )
                        ? examDataInfo.subjectName
                        : examDataInfos[0].subjectName
                }
                onChange={(e) => {
                    const examDataInfo = examDataInfos.find(
                        (examInfo) => examInfo.subjectName === e.target.value
                    );
                    if (examDataInfo) {
                        setExamDataInfo(examDataInfo);
                    }
                }}
                sx={{ width: "12rem" }}
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

            <Stack>
                <Typography>
                    Số bài thi: {examDataInfo.numberOfExams}
                </Typography>
                {ultis.checkEmptyArray(examDataInfo.questionInfos) ? (
                    <Typography>Đề không có câu hỏi nào</Typography>
                ) : (
                    examDataInfo.questionInfos?.map((questionInfo, index) => (
                        <Stack key={index}>
                            <Typography>
                                Loại câu hỏi:{" "}
                                {
                                    QuestionTypeDatas[
                                        questionInfo.type as keyof typeof QuestionTypeDatas
                                    ]?.label
                                }
                            </Typography>
                            <Typography>
                                Số lượng câu hỏi:{" "}
                                {questionInfo.questions.length}
                            </Typography>
                        </Stack>
                    ))
                )}
            </Stack>
        </Box>
    );
}
