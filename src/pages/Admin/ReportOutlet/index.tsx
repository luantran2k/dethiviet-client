import {
    BugReportRounded,
    DoneAllRounded,
    HourglassBottomRounded,
    Search,
} from "@mui/icons-material";
import {
    Button,
    Grid,
    MenuItem,
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
import { blue, red, teal } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import UserNameButton from "../../../components/Button/UserNameButton";
import ReportCard from "../../../components/Card/ReportCard";
import ImageFullView from "../../../components/ImageFullView";
import IReport from "../../../components/ReportError/interfaces/Report";
import { User } from "../../../redux/slices/appSlice";
import request from "../../../Utils/request";
import ultis from "../../../Utils/ultis";

interface States {
    done: number;
    pending: number;
    processing: number;
}

export interface IReportDetail extends IReport {
    user: User;
}

export interface IReportOutletProps {}

export default function ReportOutlet(props: IReportOutletProps) {
    const dispatch = useAppDispatch();
    const [states, setStates] = useState<States>();
    const [reports, setReports] = useState<IReportDetail[]>();
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const search = useRef<HTMLInputElement>(null);
    const [state, setState] = useState("all");

    const getReportData = async (
        page: number,
        search?: string,
        state?: string
    ) => {
        if (state === "all") {
            state = undefined;
        }
        const results = await request.get<
            { page: number; search?: string; state?: string },
            { states: States; reports: IReportDetail[]; totalPages?: number }
        >("admin/reports", { page: page - 1, search, state });
        if (results && results?.states) {
            setStates(results.states);
        }
        if (results?.reports && !ultis.checkEmptyArray(results.reports)) {
            setReports(results.reports);
        } else {
            setTotalPages(1);
            setReports([]);
        }
        if (results?.totalPages) {
            setTotalPages(results.totalPages);
        }
    };

    useEffect(() => {
        getReportData(page, searchText, state);
    }, [page]);

    useEffect(() => {
        getReportData(page, searchText, state);
    }, [state, searchText]);

    const handleSearch = () => {
        if (search.current && search.current?.value !== "") {
            setSearchText(search.current?.value);
        } else {
            setSearchText("");
        }
    };

    const handleChangeReportState = async (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        report: IReport
    ) => {
        const result = await request.patch<{
            states: States;
            updateResult: IReport;
        }>("admin/reports/update-state", {
            id: report.id,
            state: e.target.value,
        });
        if (result.updateResult) {
            setReports((reports) =>
                reports?.map((curReport) => {
                    if (curReport.id === report.id) {
                        return {
                            ...curReport,
                            state: e.target.value,
                        };
                    }
                    return curReport;
                })
            );
            setStates(result.states);
        }
    };

    if (ultis.checkEmptyArray(states)) {
        return <Typography>??ang t???i d??? li???u</Typography>;
    }

    return (
        <Stack>
            <Typography
                variant="h2"
                fontSize="2rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                B??o c??o l???i
            </Typography>
            <Typography
                variant="h2"
                fontSize="1.6rem"
                fontWeight={500}
                color={teal[800]}
                mb="2rem"
            >
                T???ng quan
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <ReportCard
                        icon={<BugReportRounded />}
                        title={"L???i m???i"}
                        data={states?.pending!}
                        color={red}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ReportCard
                        icon={<HourglassBottomRounded />}
                        title={"??ang x??? l??"}
                        data={states?.processing!}
                        color={blue}
                    />
                </Grid>
                <Grid item xs={4}>
                    <ReportCard
                        icon={<DoneAllRounded />}
                        title={"???? ho??n t???t"}
                        data={states?.done!}
                    />
                </Grid>
            </Grid>

            <Typography
                variant="h2"
                fontSize="1.6rem"
                fontWeight={500}
                color={teal[800]}
                m="4rem 0 2rem 0"
            >
                Chi ti???t
            </Typography>
            <Stack direction="row" alignItems="center" mb="2rem">
                <TextField
                    size="small"
                    value={state}
                    select
                    sx={{ margin: "0 1rem 0 auto", width: "10rem" }}
                    onChange={async (e) => {
                        setState(e.target.value);
                    }}
                >
                    <MenuItem value="all">T???t c???</MenuItem>
                    <MenuItem value="pending">L???i m???i</MenuItem>
                    <MenuItem value="processing">??ang x??? l??</MenuItem>
                    <MenuItem value="done">???? ho??n t???t</MenuItem>
                </TextField>
                <TextField
                    size="small"
                    placeholder="Nh???p ????? t??m ki???m"
                    inputRef={search}
                    sx={{ marginRight: "1rem" }}
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
                        <TableCell>id</TableCell>
                        <TableCell>Ng?????i b??o c??o</TableCell>
                        <TableCell>N???i dung</TableCell>
                        <TableCell>???nh minh ho???</TableCell>
                        <TableCell>Tr???ng th??i</TableCell>
                        <TableCell>Th???i gian b??o c??o</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports?.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>{report.id}</TableCell>
                            <TableCell>
                                <UserNameButton user={report.user} />
                            </TableCell>
                            <TableCell
                                sx={{ maxWidth: "34rem", textAlign: "justify" }}
                            >
                                {report.content}
                            </TableCell>
                            <TableCell>
                                {report.image && (
                                    <ImageFullView imageUrl={report.image} />
                                )}
                            </TableCell>
                            <TableCell sx={{ width: "10rem" }}>
                                <TextField
                                    value={report.state}
                                    select
                                    fullWidth
                                    onChange={(e) =>
                                        handleChangeReportState(e, report)
                                    }
                                    sx={{
                                        backgroundColor:
                                            report.state == "pending"
                                                ? red[100]
                                                : report.state == "processing"
                                                ? blue[100]
                                                : teal[100],
                                    }}
                                >
                                    <MenuItem value="pending">L???i m???i</MenuItem>
                                    <MenuItem value="processing">
                                        ??ang x??? l??
                                    </MenuItem>
                                    <MenuItem value="done">
                                        ???? ho??n t???t
                                    </MenuItem>
                                </TextField>
                            </TableCell>
                            <TableCell>
                                {new Date(report.createdAt!).toLocaleString()}
                            </TableCell>
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
