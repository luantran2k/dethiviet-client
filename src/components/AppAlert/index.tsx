import { Cancel } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeAlert } from "../../redux/slices/appSlice";
import styles from "./styles.module.scss";
export interface IAppALertProps {}

export default function AppALert(props: IAppALertProps) {
    const alerts = useAppSelector((state) => state.app.alerts);
    const dispatch = useAppDispatch();
    return (
        <div className={styles.alerts}>
            {alerts.map(({ severity, message, id }) => (
                <Alert
                    action={
                        <Button
                            color="inherit"
                            sx={{ height: "100%", alignSelf: "stretch" }}
                            onClick={() => dispatch(removeAlert(id))}
                        >
                            <Cancel />
                        </Button>
                    }
                    className={styles.alert}
                    key={id}
                    severity={severity}
                    sx={{ alignItems: "center" }}
                >
                    {message}
                </Alert>
            ))}
        </div>
    );
}
