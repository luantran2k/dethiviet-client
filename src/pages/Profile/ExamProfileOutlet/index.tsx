import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import * as React from "react";
import { useUserInfo } from "..";
import { useAppSelector } from "../../../app/hooks";
import IExam from "../../../components/Exam/interfaces/IExam";
import { SmallExamCardList } from "../../../components/ExamCard/SmallExamCard";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";
import styles from "./styles.module.scss";

export interface IExamProfileOutletProps {
    getExams: (
        userId: number,
        userRequestId?: number
    ) => Promise<{ exams: IExam[] } | undefined>;
    handleClickExam?: (url: string) => void;
    title: string;
}

export default function ExamProfileOutlet(props: IExamProfileOutletProps) {
    const { getExams, title, handleClickExam } = props;
    const userRequestId = useAppSelector((state) => state.app.userInfo?.id);
    const { userInfo } = useUserInfo();
    const [exams, setExams] = React.useState<IExam[] | undefined>(undefined);
    React.useEffect(() => {
        const getExamsToState = async () => {
            if (userInfo) {
                const res = await getExams(userInfo.id, userRequestId);
                if (res) setExams(res.exams);
            }
        };
        getExamsToState();
    }, [userInfo]);

    if (!exams || ultis.checkEmptyArray(exams)) {
        return (
            <div className={styles.examProfileOutlet}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={1}
                    lineHeight="2"
                    borderBottom={`2px solid ${teal[500]}`}
                >
                    {title}
                </Typography>
                <p>Chưa có bài kiểm tra nào</p>
            </div>
        );
    }

    return (
        <div className={styles.examProfileOutlet}>
            <Typography
                variant="h5"
                fontWeight="bold"
                mb={1}
                lineHeight="2"
                borderBottom={`2px solid ${teal[500]}`}
            >
                {title}
            </Typography>
            <SmallExamCardList
                exams={exams}
                handleClickExam={handleClickExam}
            />
        </div>
    );
}
