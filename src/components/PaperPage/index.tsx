import { Box, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import ultis from "../../Utils/ultis";
import PartPreview from "../Part/Preview";
import styles from "./styles.module.scss";
export declare let renderMathInElement: (
    element: HTMLElement,
    options?: object
) => void;
export interface IPaperPageProps {}

function getPageNumber(paper: React.RefObject<HTMLDivElement>) {
    return paper.current?.getBoundingClientRect().height
        ? Math.round(
              ultis.convertPixelToMilimeter(
                  paper.current?.getBoundingClientRect().height -
                      ultis.convertPixelToMilimeter(16 * 6) //padding top and bottom in scss
              ) /
                  (297 - ultis.convertPixelToMilimeter(16 * 6)) // A4 height in mm, 3 is padding top and bottom , 16 is rem. 25.4 = 3*2*16
          )
        : 1;
}

function PaperBackground({ pageNumber }: { pageNumber: number }) {
    return (
        <div className={styles.paperBackground}>
            <p className={styles.pageNumber}>{pageNumber}</p>
        </div>
    );
}

export default function PaperPage(props: IPaperPageProps) {
    const exam = useAppSelector((state) => state.exam);
    const paper = useRef<HTMLDivElement>(null);
    const [pageNumber, setPageNumber] = useState(getPageNumber(paper));

    useEffect(() => {
        setPageNumber(getPageNumber(paper));
    });

    useEffect(() => {
        try {
            if (renderMathInElement && paper.current) {
                renderMathInElement(paper.current, {
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
    });
    const paperBackground = Array(pageNumber)
        .fill({})
        .map((x, index) => (
            <PaperBackground key={index + 1} pageNumber={index + 1} />
        ));
    return (
        <div className={styles.paperWrapper}>
            <div ref={paper} className={styles.a4}>
                <Grid container marginBottom={4}>
                    <Grid item xs={5}>
                        <Stack
                            direction="column"
                            alignItems="center"
                            textAlign="center"
                            gap={1}
                        >
                            <Typography
                                fontWeight="bold"
                                sx={{
                                    textDecoration: "underline",
                                    textUnderlineOffset: 4,
                                }}
                            >
                                {exam.publishers?.toUpperCase()}
                            </Typography>
                            <Typography
                                border="1px solid black"
                                padding="0 1rem"
                            >
                                {exam.type === "official"
                                    ? "Ch??nh th???c"
                                    : "Kh??ng ch??nh th???c"}
                            </Typography>
                            <Typography fontStyle="italic">
                                (????? thi c?? {pageNumber} trang)
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7} borderBottom="1px solid black">
                        <Stack
                            direction="column"
                            alignItems="center"
                            textAlign="center"
                            gap={1}
                        >
                            <Typography fontWeight="bold">
                                {exam.examName?.toUpperCase()}
                            </Typography>
                            <Typography>
                                M??n: {exam.subjectName?.toUpperCase()}
                            </Typography>
                            <Typography fontStyle="italic">
                                Th???i gian l??m b??i: {exam.duration} ph??t, kh??ng
                                k??? th???i gian ph??t ?????
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={8} marginTop={2}>
                        <Stack direction="row">
                            <Typography fontWeight="bold">
                                H??? v?? t??n:
                            </Typography>
                            <Box
                                borderBottom="2px dotted black"
                                flexGrow={1}
                                sx={{ translate: "8px -4px" }}
                            ></Box>
                        </Stack>
                        <Stack direction="row">
                            <Typography fontWeight="bold">
                                S??? b??o danh:
                            </Typography>
                            <Box
                                borderBottom="2px dotted black"
                                flexGrow={1}
                                sx={{ translate: "8px -4px" }}
                            ></Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={4} textAlign="right" marginTop={2}>
                        <Typography
                            display="inline-block"
                            border="1px solid black"
                            padding="0 1rem"
                            fontWeight="bold"
                        >
                            M?? ????? thi: {exam.id}
                        </Typography>
                        <Typography
                            fontStyle="italic"
                            fontSize={14}
                            marginTop={1}
                        >
                            Ng??y thi: {new Date().toLocaleDateString("vi-Vn")}
                        </Typography>
                    </Grid>
                </Grid>
                {exam.parts?.map((part) => (
                    <PartPreview key={part.id} part={part} />
                ))}
            </div>
            <div className={styles.paperBackgrounds}>{paperBackground}</div>
        </div>
    );
}
