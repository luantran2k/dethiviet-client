import { Autorenew } from "@mui/icons-material";
import { Stack, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setLoading } from "../../../redux/slices/appSlice";
import request from "../../../Utils/request";
import styles from "./style.module.scss";

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
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Mã xác minh: {securityCode}</Typography>
            <Button
                size="small"
                onClick={async () => {
                    setIsRenewing(true);
                    const res = await request.get<
                        any,
                        { securityCode: string; documentUrl: string }
                    >(`exams/${id}/changeSecurityCode`);
                    if (res?.securityCode) {
                        setSecurityCode(res.securityCode);
                    }
                    setIsRenewing(false);
                }}
                disabled={isRenewing}
            >
                <Autorenew className={isRenewing ? styles.rotate : ""} />
            </Button>
        </Stack>
    );
}