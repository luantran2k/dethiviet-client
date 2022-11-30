import { Edit } from "@mui/icons-material";
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { display } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stringify } from "uuid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CenterMessage from "../../components/CenterMessage";
import ExamInfo from "../../components/Exam/Info";
import IExam from "../../components/Exam/interfaces/IExam";
import CreateExamModal from "../../components/Exam/modal/create";
import UpdateExamModal from "../../components/Exam/modal/update";
import AppModal from "../../components/Modal";
import IPart from "../../components/Part/interfaces/IPart";
import PartsTemp from "../../components/Part/Modal/createAuto";
import QuestionTypeDatas from "../../const/QuestionTypes";
import { sendAlert } from "../../redux/slices/appSlice";
import {
    addPartTemp,
    PartTemp,
    removeAllPartsTemp,
    updateExamToCreateInfo,
    updateNumberOfExams,
} from "../../redux/slices/createExamSlice";
import request from "../../Utils/request";
import ultis from "../../Utils/ultis";

export interface ICreateExamPageProps {}

export interface QuestionInfo {
    questions: number[];
    type: string;
}

interface ExamDataInfo {
    subjectName: string;
    numberOfExams: number;
    examIds: number[];
    questionInfos?: QuestionInfo[];
}

const getExamDataInfos = (exams: IExam[]): ExamDataInfo[] => {
    const examDataInfos = exams.reduce((preValue, curValue: IExam) => {
        const indexOfSubjectName = preValue.findIndex(
            (examDataInfo) => examDataInfo.subjectName === curValue.subjectName
        );
        if (indexOfSubjectName === -1) {
            const res = [
                ...preValue,
                {
                    subjectName: curValue.subjectName!,
                    numberOfExams: 1,
                    examIds: [curValue.id!],
                },
            ];
            return res;
        }
        preValue[indexOfSubjectName].examIds.push(curValue.id!);
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
    const navigate = useNavigate();
    const {
        examsSelected: exams,
        parts,
        numberOfExams,
        examToCreateInfo,
    } = useAppSelector((state) => state.createExam);
    const userId = useAppSelector((state) => state.app.userInfo?.id);
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

    const handleSubmitAciton = (exam: IExam) => {
        if (exam.date) {
            exam.date = (exam.date as Date).toISOString();
        }
        dispatch(updateExamToCreateInfo(exam));
    };

    if (
        ultis.checkEmptyArray(examDataInfos) ||
        examDataInfos === undefined ||
        examDataInfo === undefined
    ) {
        return <CenterMessage message="Vui lòng chọn đề thi mẫu trước" />;
    }

    const handleCreateExam = async (value: {
        examToCreateInfo: IExam;
        parts: PartTemp[];
        questionInfos: QuestionInfo[] | undefined;
    }) => {
        const { examToCreateInfo, parts, questionInfos } = ultis.deepCopy(
            value
        ) as typeof value;
        if (!questionInfos) {
            dispatch(
                sendAlert({
                    message: "Chưa có thông tin câu hỏi, vui lòng thử lại",
                    severity: "error",
                })
            );
            return;
        }
        for (const part of parts) {
            if (!part.title || !part.totalPoints || !part.numberOfQuestions) {
                dispatch(
                    sendAlert({
                        message: "Vui lòng nhập đủ các trường còn thiếu",
                        severity: "error",
                    })
                );
                return;
            }
        }
        if (!examToCreateInfo.title || !examToCreateInfo.duration) {
            dispatch(
                sendAlert({
                    message:
                        "Vui lòng cập nhật thông tin bài thi trước khi tạo",
                    severity: "error",
                })
            );
            return;
        }
        const partGroupByTypesOriginal = questionInfos.map((questionInfo) => {
            return {
                ...questionInfo,
                parts: parts.filter((part) => part.type === questionInfo.type),
            };
        });
        for (const partGroupByType of partGroupByTypesOriginal) {
            const totalQuestions = questionInfos.find(
                (questionInfo) => questionInfo.type === partGroupByType.type
            )?.questions.length;
            const totalQuestionsInPart = partGroupByType.parts.reduce(
                (sum, part) => {
                    return sum + part.numberOfQuestions!;
                },
                0
            );

            if (
                totalQuestions === undefined ||
                totalQuestions < totalQuestionsInPart
            ) {
                dispatch(
                    sendAlert({
                        message: `Số câu hỏi thuộc dạng "${
                            QuestionTypeDatas[
                                partGroupByType.type as keyof typeof QuestionTypeDatas
                            ].label
                        }" vượt quá số câu hỏi hiện có (${totalQuestionsInPart}/${totalQuestions})`,
                        severity: "error",
                    })
                );
                return;
            }
        }

        const exams: IExam[] = [];
        for (let i = 0; i < numberOfExams; i++) {
            const partGroupByTypes = ultis.deepCopy(
                partGroupByTypesOriginal
            ) as typeof partGroupByTypesOriginal;
            const partsWitQuesiton = partGroupByTypes
                .map((partGroupByType) => {
                    // Shuffle array
                    const shuffled = partGroupByType.questions.sort(
                        () => 0.5 - Math.random()
                    );

                    partGroupByType.parts = partGroupByType.parts.map(
                        (part) => {
                            return {
                                ...part,
                                questionIds: partGroupByType.questions.splice(
                                    0,
                                    part?.numberOfQuestions!
                                ),
                            };
                        }
                    );

                    return partGroupByType;
                })
                .reduce((output, partGroupByType) => {
                    if (!ultis.checkEmptyArray(partGroupByType.parts)) {
                        return [...output, ...partGroupByType.parts];
                    }
                    return output;
                }, [] as PartTemp[]);

            const partWitQuesitonSorted = parts.map((part) => {
                const { clientId, numberOfQuestions, ...newPart } =
                    partsWitQuesiton.find(
                        (partWitQuesiton) =>
                            partWitQuesiton.clientId === part.clientId
                    )!;
                return newPart as IPart;
            });
            const newExam: IExam = {
                ...examToCreateInfo,
                parts: [...partWitQuesitonSorted],
            };
            exams.push(newExam);
        }
        if (exams.length > 1) {
        }

        const payload = {
            exams:
                exams.length > 1
                    ? exams.map((exam, index) => ({
                          ...exam,
                          title: exam.title + " " + (index + 1),
                      }))
                    : exams,
        };
        const result = await request.post<{ exams: IExam[] }>(
            "exams/create-auto",
            payload
        );
        if (result.exams) {
            dispatch(sendAlert({ message: "Tạo thành công" }));
            dispatch(removeAllPartsTemp());
            navigate(`/user/${userId}/exams/own`);
        }
    };

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
                <ExamInfo
                    exam={examToCreateInfo}
                    editModal={
                        <AppModal
                            trigger={
                                <Button
                                    sx={{
                                        alignSelf: "center",
                                        marginTop: "1rem",
                                    }}
                                    variant="contained"
                                >
                                    <Edit />
                                </Button>
                            }
                        >
                            <UpdateExamModal
                                submitAction={handleSubmitAciton}
                                defaultValueProp={
                                    ultis.isEmptyObject(examToCreateInfo)
                                        ? {
                                              isPublic: true,
                                              subjectName: "Khác",
                                              duration: 45,
                                              date: null,
                                              grade: "unknown",
                                              type: "unOfficial",
                                          }
                                        : examToCreateInfo
                                }
                            />
                        </AppModal>
                    }
                />
                <Typography variant="h5" marginBottom={2}>
                    Tạo phần thi
                </Typography>
                <PartsTemp questionTypes={questionTypes} />
                <Stack
                    spacing={2}
                    direction="row"
                    marginTop="4rem"
                    justifyContent="flex-end"
                >
                    <TextField
                        type="number"
                        label="Số lượng bài thi"
                        size="small"
                        defaultValue={numberOfExams}
                        onChange={(e) =>
                            dispatch(
                                updateNumberOfExams(Number(e.target.value))
                            )
                        }
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (
                                ultis.checkEmptyArray(
                                    examDataInfo.questionInfos
                                )
                            ) {
                                dispatch(
                                    sendAlert({
                                        message:
                                            "Bài thi không có câu hỏi hoặc không rõ thông tin câu hỏi, vui lòng thử lại",
                                        severity: "error",
                                    })
                                );
                                return;
                            }
                            dispatch(
                                addPartTemp({
                                    type: examDataInfo.questionInfos?.[0].type!,
                                })
                            );
                        }}
                    >
                        Thêm phần
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleCreateExam({
                                examToCreateInfo: examToCreateInfo,
                                parts,
                                questionInfos: examDataInfo.questionInfos,
                            });
                        }}
                    >
                        Tạo bài thi
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
