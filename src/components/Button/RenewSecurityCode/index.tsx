import { Autorenew } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { updateExam } from "../../../redux/slices/examSlice";
import request from "../../../Utils/request";
import styles from "./styles.module.scss";

export interface IRenewSecurityCodeButtonProps {
    securityCode: string;
    id: number;
}

export default function RenewSecurityCodeButton(
    props: IRenewSecurityCodeButtonProps
) {
    const { id, securityCode: securityCodeProp } = props;
    const [securityCode, setSecurityCode] = useState(securityCodeProp);
    const [isRenewing, setIsRenewing] = useState(false);
    const dispath = useAppDispatch();
    useEffect(() => {
        setSecurityCode(securityCodeProp);
    }, [securityCodeProp]);

    const handleRenewSecurityCode = async () => {
        setIsRenewing(true);
        const res = await request.get<
            any,
            { securityCode: string; documentUrl: string }
        >(`exams/${id}/changeSecurityCode`);
        if (res?.securityCode) {
            setSecurityCode(res.securityCode);
        }
        if (res?.documentUrl) {
            dispath(updateExam({ documentUrl: res.documentUrl }));
        }
        setIsRenewing(false);
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Mã xác minh: {securityCode}</Typography>
            <Button
                size="small"
                onClick={handleRenewSecurityCode}
                disabled={isRenewing}
            >
                <Autorenew className={isRenewing ? styles.rotate : ""} />
            </Button>
        </Stack>
    );
}
