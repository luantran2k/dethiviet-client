import { Delete, Search, Send } from "@mui/icons-material";
import {
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
import { red, teal } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import Avatar from "../../../components/Avatar";
import UserNameButton from "../../../components/Button/UserNameButton";
import AppModal from "../../../components/Modal";
import OrderList from "../../../components/OrderList";
import { sendAlert, setLoading, User } from "../../../redux/slices/appSlice";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";

export interface IUserOutletProps {}

export default function UserOutlet(props: IUserOutletProps) {
    const dispatch = useAppDispatch();
    const [users, setUsers] = useState<User[]>();
    const [page, setPage] = useState(1);
    const [userSelectedIds, setUsersSelectedIds] = useState<number[]>([]);
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const search = useRef<HTMLInputElement>(null);
    const mailTitle = useRef<HTMLInputElement>(null);
    const mailContent = useRef<HTMLInputElement>(null);

    const getUsers = async (page: number, searchArg?: string) => {
        const result = await request.get<
            { page: number; search?: string },
            { users: User[]; totalPages?: number }
        >("admin/users", { page: page - 1, search: searchArg });
        if (result?.users) {
            setUsers(result.users);
        }
        if (result?.totalPages) {
            setTotalPages(result.totalPages);
        }
    };

    useEffect(() => {
        getUsers(page);
    }, [page]);

    useEffect(() => {
        getUsers(page, searchText);
    }, [searchText]);

    const handleSearch = () => {
        if (search.current && search.current?.value !== "") {
            setSearchText(search.current?.value);
        } else {
            setSearchText("");
        }
    };

    const handleDelete = async () => {
        const res = await request.post("admin/users/remove", {
            ids: userSelectedIds,
        });
        if (res) {
            setUsersSelectedIds([]);
            getUsers(page, searchText);
        }
    };

    const handleSendMail = async () => {
        if (
            mailContent.current?.value == "" ||
            mailTitle.current?.value == ""
        ) {
            dispatch(
                sendAlert({
                    message: "Không được bỏ trống nội dung và tiêu đề",
                    severity: "error",
                })
            );
            return;
        }
        dispatch(setLoading(true));

        const res = await request.post("admin/users/mail", {
            ids: userSelectedIds,
            title: mailTitle.current?.value,
            content: mailContent.current?.value,
        });
        if (res) {
            dispatch(
                sendAlert({
                    message: "Gửi mail thành công",
                    severity: "success",
                })
            );
            mailContent.current?.value == "";
            mailTitle.current?.value == "";
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
                Nguời dùng
            </Typography>
            <Stack direction="row" alignItems="center" mb="2rem">
                <ButtonGroup disabled={userSelectedIds.length === 0}>
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
                                Bạn có đồng ý xoá các người dùng sau không ?
                            </Typography>
                            <OrderList variant="decimal">
                                {userSelectedIds.map((id) => {
                                    const user = users?.find(
                                        (user) => id === user.id
                                    );
                                    return (
                                        <li key={user?.username}>
                                            {user?.username}
                                        </li>
                                    );
                                })}
                            </OrderList>
                        </Box>
                    </AppModal>
                    <AppModal
                        trigger={
                            <Button startIcon={<Send />}>Gửi Email</Button>
                        }
                        cancelButton={<Button variant="outlined">Huỷ</Button>}
                        confirmButton={<Button variant="contained">Gửi</Button>}
                        confirmHandler={handleSendMail}
                    >
                        <Stack spacing={2}>
                            <Typography fontSize="1.2rem" maxWidth="60rem">
                                Tới:{" "}
                                {userSelectedIds
                                    .map((id) => {
                                        const user = users?.find(
                                            (user) => id === user.id
                                        );
                                        return user?.username;
                                    })
                                    .join(", ")}
                            </Typography>
                            <TextField
                                fullWidth
                                label="Tiêu đề"
                                inputRef={mailTitle}
                            />
                            <TextField
                                fullWidth
                                label="Nội dung"
                                inputRef={mailContent}
                                multiline
                                minRows={5}
                                maxRows={10}
                            />
                        </Stack>
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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={
                                    userSelectedIds.length === users?.length
                                }
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setUsersSelectedIds(
                                            users?.map((user) => user.id)!
                                        );
                                    } else {
                                        setUsersSelectedIds([]);
                                    }
                                }}
                            />
                        </TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Ảnh đại diện</TableCell>
                        <TableCell>Tên đăng nhập</TableCell>
                        <TableCell>Tên hiển thị</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Ngày tham gia</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Checkbox
                                    checked={userSelectedIds.some(
                                        (id) => id === user.id
                                    )}
                                    onChange={(e) => {
                                        const isSelected = userSelectedIds.some(
                                            (id) => id === user.id
                                        );
                                        if (isSelected) {
                                            setUsersSelectedIds((ids) =>
                                                ids.filter(
                                                    (id) => id !== user.id
                                                )
                                            );
                                        } else {
                                            setUsersSelectedIds((ids) => [
                                                ...ids,
                                                user.id,
                                            ]);
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>
                                <Avatar profileImg={user.profileImg} />
                            </TableCell>
                            <TableCell>
                                <UserNameButton user={user} />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                                {ultis.formatDate(user.createdAt)}
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
