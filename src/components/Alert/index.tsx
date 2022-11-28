import { Alert, Button } from "@mui/material";
import styles from "./style.module.scss";

export interface IAppAlertProps {
    variant: "success" | "warning" | "info" | "error";
    message: string;
}

export default function AppAlert(props: IAppAlertProps) {
    return (
        <div>
            <Button onClick={() => {}}>Alert</Button>
            <Alert severity={props.variant} className={styles.alert}>
                This is an error alert — check it out!
            </Alert>
        </div>
    );
}
