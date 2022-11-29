import { Delete } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import QuestionTypeDatas from "../../../const/QuestionTypes";
import {
    removePartTemp,
    updateFieldPartTemp,
} from "../../../redux/slices/createExamSlice";

export interface IPartsTempProps {
    questionTypes: string[];
}

export default function PartsTemp(props: IPartsTempProps) {
    const { questionTypes } = props;
    const parts = useAppSelector((state) => state.createExam.parts);
    const dispatch = useAppDispatch();
    return (
        <Stack spacing={4}>
            {parts.map((part) => (
                <Stack spacing={2} key={part.clientId}>
                    <Stack spacing={1} direction="row">
                        {" "}
                        <TextField
                            fullWidth
                            label="Tiêu đề"
                            onChange={(e) =>
                                dispatch(
                                    updateFieldPartTemp({
                                        clientId: part.clientId,
                                        field: "title",
                                        value: e.target.value,
                                    })
                                )
                            }
                        />
                        <Button
                            onClick={() =>
                                dispatch(removePartTemp(part.clientId))
                            }
                        >
                            <Delete />
                        </Button>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                        <TextField
                            sx={{ flex: "0 0 50%" }}
                            label="Loại câu hỏi"
                            select
                            defaultValue={questionTypes[0]}
                            onChange={(e) =>
                                dispatch(
                                    updateFieldPartTemp({
                                        clientId: part.clientId,
                                        field: "type",
                                        value: e.target.value,
                                    })
                                )
                            }
                        >
                            {questionTypes.map((questionType, index) => (
                                <MenuItem value={questionType} key={index}>
                                    {
                                        QuestionTypeDatas[
                                            questionType as keyof typeof QuestionTypeDatas
                                        ].label
                                    }
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            sx={{ flex: "0 0 20%" }}
                            type="number"
                            label="Số lượng câu hỏi"
                            onChange={(e) =>
                                dispatch(
                                    updateFieldPartTemp({
                                        clientId: part.clientId,
                                        field: "numberOfQuestions",
                                        value: Number(e.target.value),
                                    })
                                )
                            }
                        />
                        <TextField
                            sx={{ flex: "0 0 20%" }}
                            type="number"
                            label="Tổng số điểm"
                            onChange={(e) =>
                                dispatch(
                                    updateFieldPartTemp({
                                        clientId: part.clientId,
                                        field: "totalPoints",
                                        value: Number(e.target.value),
                                    })
                                )
                            }
                        />
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}
