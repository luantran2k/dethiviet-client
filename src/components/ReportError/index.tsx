import { Stack, TextField, Button, Box } from "@mui/material";
import { useRef, useState } from "react";
import { Image } from "@mui/icons-material";
import request from "../../Utils/request";
import IReport from "./interfaces/Report";
import { useAppDispatch } from "../../app/hooks";
import { sendAlert } from "../../redux/slices/appSlice";

export interface IRepportErrorProps {
    examId?: number;
}

export default function RepportError(props: IRepportErrorProps) {
    const { examId } = props;
    const imageReportInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const [imageReport, setImageReport] = useState<File>();
    const [contentReport, setContentReport] = useState("");
    const handleSubmit = async () => {
        const form = new FormData();
        if (contentReport === "") {
            dispatch(
                sendAlert({
                    message: "Không được bỏ trống mô tả",
                    severity: "error",
                })
            );
            return;
        }
        form.append("content", contentReport);
        if (imageReport) {
            form.append("image", imageReport);
        }
        if (examId) {
            form.append("examId", examId + "");
        }
        setContentReport("");
        setImageReport(undefined);
        dispatch(
            sendAlert({
                message: "Đã gửi báo cáo",
                severity: "info",
            })
        );
        const res = await request.post<IReport>("reports", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (res) {
            dispatch(
                sendAlert({
                    message: "Gửi báo cáo thành công",
                    severity: "success",
                })
            );
        }
    };
    return (
        <Stack spacing={2}>
            <TextField
                label=" Mô tả lỗi"
                multiline
                minRows={3}
                maxRows={6}
                value={contentReport}
                onChange={(e) => {
                    setContentReport(e.target.value);
                }}
            />
            <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={handleSubmit}>
                    Gửi
                </Button>
                <Button
                    onClick={() => {
                        imageReportInputRef.current?.click();
                    }}
                >
                    <Image />
                    <input
                        type="file"
                        ref={imageReportInputRef}
                        accept="image/png, image/jpg, image/jpeg"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setImageReport(e.target.files[0]);
                            }
                        }}
                    />
                </Button>
            </Stack>
            {imageReport && (
                <Box maxHeight="18rem" overflow="auto">
                    <img
                        src={URL.createObjectURL(imageReport)}
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            )}
        </Stack>
    );
}
