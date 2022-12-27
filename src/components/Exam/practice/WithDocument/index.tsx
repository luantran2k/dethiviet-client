import { Box, Stack, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { Part } from "../../../Part";
import PdfPreview from "../../../PdfPreview";
import PdfNativePreview from "../../../PdfPreview/NativePreview";

export interface IExamPracticeWithDocumentProps {}

export default function ExamPracticeWithDocument(
    props: IExamPracticeWithDocumentProps
) {
    const exam = useAppSelector((state) => state.exam);
    const [isNativePreview, setIsNativePreview] = useState(false);
    return (
        <Stack
            width={"100vw"}
            alignItems="start"
            height="calc(100vh - 4rem)"
            flexGrow={1}
            direction="row"
            bgcolor={teal[50]}
        >
            {isNativePreview ? (
                <PdfNativePreview url={exam.documentUrl!} isPreview={true} />
            ) : (
                <Box
                    sx={{
                        height: "100%",
                        flexBasis: "60%",
                        transition: "all 0.3s linear",
                        backgroundColor: "#ccc",
                    }}
                >
                    <PdfPreview
                        path={exam.documentUrl!}
                        securityCode={exam.securityCode}
                    />
                </Box>
            )}
            <Stack
                padding={2}
                marginTop="4.6rem"
                flexBasis="40%"
                height="calc(100% - 4.6rem)"
                overflow="auto"
            >
                <Typography variant="h2" fontSize="2rem" fontWeight={500}>
                    {exam.title}
                </Typography>
                <Box marginTop={2}>
                    {exam.parts?.map(({ id }) => (
                        <Part partId={id} key={id} />
                    ))}
                </Box>
            </Stack>
        </Stack>
    );
}
