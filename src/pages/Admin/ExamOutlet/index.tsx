import { Delete, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import UserNameButton from "../../../components/Button/UserNameButton";
import AppModal from "../../../components/Modal";
import OrderList from "../../../components/OrderList";
import { sendAlert } from "../../../redux/slices/appSlice";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";
import { IDetailExam } from "../../Exam/detail";

export interface IExamOutletProps {}

export default function ExamOutlet(props: IExamOutletProps) {
    const dispatch = useAppDispatch();
    const [exams, setExams] = useState<IDetailExam[]>();
    const [selectedExamIds, setSelectedExamIds] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const search = useRef<HTMLInputElement>(null);

    const getExams = async (page: number, searchArg?: string) => {
        const result = await request.get<
            { page: number; search?: string },
            { exams: IDetailExam[]; totalPages?: number }
        >("admin/exams", { page: page - 1, search: searchArg });
        if (result?.exams && !ultis.checkEmptyArray(result.exams)) {
            setExams(result.exams);
        } else {
            setTotalPages(1);
            setExams([]);
        }
        if (result?.totalPages) {
            setTotalPages(result.totalPages);
        }
    };

    useEffect(() => {
        getExams(page);
    }, [page]);

    useEffect(() => {
        getExams(page, searchText);
    }, [searchText]);

    const handleDelete = async () => {
        const res = await request.post("admin/exams/remove", {
            ids: selectedExamIds,
        });
        if (res) {
            setSelectedExamIds([]);
            getExams(page, searchText);
        }
    };

    const handleSearch = () => {
        if (search.current && search.current?.value !== "") {
            setSearchText(search.current?.value);
        } else {
            setSearchText("");
        }
    };

    const handleChangeCheckBox = (exam: IDetailExam) => {
        const isSelected = selectedExamIds.some((id) => id === exam.id);
        if (isSelected) {
            setSelectedExamIds((ids) => ids.filter((id) => id !== exam.id));
        } else {
            setSelectedExamIds((ids) => [...ids, exam.id!]);
        }
    };

    return (
        <Stack>
            <Typography
                variant="h2"
                fontSize="2rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                Đề thi
            </Typography>
            <Stack direction="row" alignItems="center" mb="2rem">
                <ButtonGroup disabled={selectedExamIds.length === 0}>
                    <AppModal
                        trigger={<Button startIcon={<Delete />}>Xoá</Button>}
                        cancelButton={<Button variant="outlined">Huỷ</Button>}
                        confirmButton={
                            <Button variant="contained">Đồng ý</Button>
                        }
                        confirmHandler={handleDelete}
                    >
                        <Box>
                            <Typography fontSize="1.4rem">
                                Bạn có đồng ý xoá các đề thi sau không ?
                            </Typography>
                            <OrderList variant="decimal">
                                {selectedExamIds.map((id) => {
                                    const exam = exams?.find(
                                        (exam) => id === exam.id
                                    );
                                    return (
                                        <li key={exam?.title}>{exam?.title}</li>
                                    );
                                })}
                            </OrderList>
                        </Box>
                    </AppModal>
                </ButtonGroup>
                <TextField
                    size="small"
                    sx={{ margin: "0 1rem 0 auto" }}
                    placeholder="Nhập để tìm kiếm"
                    inputRef={search}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        handleSearch();
                    }}
                >
                    <Search />
                </Button>
            </Stack>
            <Box width="68rem" overflow={"auto"}>
                <Table sx={{ width: "120rem" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    checked={
                                        selectedExamIds?.length ===
                                            exams?.length &&
                                        selectedExamIds?.length > 0
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedExamIds(
                                                exams?.map((exam) => exam.id!)!
                                            );
                                        } else {
                                            setSelectedExamIds([]);
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Tiêu đề</TableCell>
                            <TableCell>Chủ sở hữu</TableCell>
                            <TableCell>Công khai</TableCell>
                            <TableCell>Thời gian làm bài</TableCell>
                            <TableCell>Loại đề thi</TableCell>
                            <TableCell>Tên kỳ thi</TableCell>
                            <TableCell>Tên môn học</TableCell>
                            <TableCell>Đường dẫn file</TableCell>
                            <TableCell>Mã xác minh</TableCell>
                            <TableCell>Đề thi gốc</TableCell>
                            <TableCell>Được đề xuất</TableCell>
                            <TableCell>Ngày đăng</TableCell>
                            <TableCell>Ngày cập nhật</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {exams?.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedExamIds.some(
                                            (id) => id === exam.id
                                        )}
                                        onChange={() => {
                                            handleChangeCheckBox(exam);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{exam.id}</TableCell>
                                <TableCell>{exam.title}</TableCell>
                                <TableCell>
                                    {<UserNameButton user={exam.owner} />}
                                </TableCell>
                                <TableCell>
                                    {exam.isPublic
                                        ? "Công khai"
                                        : "Không công khai"}
                                </TableCell>
                                <TableCell>{exam.duration}</TableCell>
                                <TableCell>{exam.type}</TableCell>
                                <TableCell>{exam.examName}</TableCell>
                                <TableCell>{exam.subjectName}</TableCell>
                                <TableCell>
                                    {exam?.documentUrl && (
                                        <a
                                            href={exam?.documentUrl}
                                            target="_blank"
                                        >
                                            Tài liệu
                                        </a>
                                    )}
                                </TableCell>
                                <TableCell>{exam.securityCode}</TableCell>
                                <TableCell>
                                    {exam.isOriginal ? "Gốc" : "Tạo tự động"}
                                </TableCell>
                                <TableCell>
                                    {exam.isSuggest ? "Có" : "Không"}
                                </TableCell>
                                <TableCell>
                                    {ultis.formatDate(exam.createdAt)}
                                </TableCell>
                                <TableCell>
                                    {ultis.formatDate(exam.updatedAt)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Stack direction="row" alignSelf="center" m="2rem" spacing={2}>
                <Pagination
                    count={totalPages}
                    showFirstButton
                    showLastButton
                    onChange={(e, pageSelected) => {
                        setPage(pageSelected);
                    }}
                />
            </Stack>
        </Stack>
    );
}
