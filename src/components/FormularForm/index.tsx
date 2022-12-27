import { Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import katex from "katex";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { FormulaList } from "../../const/formular";
import { sendAlert } from "../../redux/slices/appSlice";
import AppModal from "../Modal";
declare let renderMathInElement: (
    element: HTMLElement,
    options?: object
) => void;
export interface IformulaFormProps {}

export default function formulaForm(props: IformulaFormProps) {
    const [formula, setformula] = useState("");
    const formulaPreview = useRef<HTMLDivElement>(null);
    const formulaFormRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (formulaPreview.current) {
            try {
                katex.render(formula, formulaPreview.current, {
                    displayMode: true,
                    leqno: false,
                    fleqn: false,
                    throwOnError: true,
                    errorColor: "#cc0000",
                    strict: "warn",
                    output: "html",
                    trust: false,
                    macros: { "\\f": "#1f(#2)" },
                });
            } catch {}
        }
    }, [formula]);
    return (
        <AppModal
            trigger={<MenuItem>Công thức</MenuItem>}
            sx={{ maxWidth: "68rem" }}
        >
            <Stack spacing={2} ref={formulaFormRef}>
                <Typography variant="h5">Nhập công thức</Typography>
                <Stack direction="row" spacing={2}>
                    <div
                        ref={formulaPreview}
                        style={{
                            cursor: "copy",
                            flex: 1,
                            padding: ".4rem",
                            boxShadow:
                                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                        }}
                        onClick={() => {
                            if (formula) {
                                navigator.clipboard.writeText(`$${formula}$`);
                                dispatch(
                                    sendAlert({
                                        message: "Đã copy vào clipboard",
                                        severity: "success",
                                    })
                                );
                            }
                        }}
                    >
                        {formula && `$${formula}$`}
                    </div>
                    <TextField
                        sx={{ flex: 1 }}
                        value={formula}
                        multiline
                        onChange={(e) => setformula(e.target.value)}
                    />
                </Stack>
                <ForumlaPatterns />
            </Stack>
        </AppModal>
    );
}

function ForumlaPatterns() {
    const [formulas, setformulas] = useState(FormulaList);
    const formulasRef = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch();
    useEffect(() => {
        try {
            if (renderMathInElement && formulasRef.current) {
                renderMathInElement(formulasRef.current, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                        // { left: "\\(", right: "\\)", display: false },
                        // { left: "\\[", right: "\\]", display: true },
                    ],
                });
            }
        } catch (error) {
            console.log(error);
        }
    }, [formulas]);
    return (
        <>
            <Stack direction="row" spacing={2} alignItems="flex-end">
                <Typography>Ký hiệu</Typography>
                <a
                    href="https://en.wikibooks.org/wiki/LaTeX/Mathematics"
                    target="_blank"
                    style={{ color: teal[600], textDecoration: "none" }}
                >
                    Tham khảo ▶
                </a>
            </Stack>
            <TextField
                size="small"
                placeholder="Nhập để tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && search !== "") {
                        setformulas((formulas) =>
                            formulas.filter(
                                (formula) =>
                                    formula.label
                                        .toLowerCase()
                                        .includes(search) ||
                                    formula.value.toLowerCase().includes(search)
                            )
                        );
                    } else {
                        setformulas(FormulaList);
                    }
                }}
            />
            <Grid
                container
                ref={formulasRef}
                bgcolor={teal[50]}
                padding=".4rem"
                borderRadius=".4rem"
                spacing={2}
            >
                {formulas.map((formula, index) => (
                    <Grid
                        item
                        xs={2}
                        key={index}
                        title={formula.label}
                        onClick={() => {
                            navigator.clipboard.writeText(formula.value);
                            dispatch(
                                sendAlert({
                                    message: "Đã copy vào clipboard",
                                    severity: "success",
                                })
                            );
                        }}
                        sx={{
                            userSelect: "none",
                            cursor: "copy",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "all .3s ease",
                            "&:hover": {
                                bgcolor: teal[100],
                            },
                        }}
                    >{`$${formula.value}$`}</Grid>
                ))}
            </Grid>
        </>
    );
}
