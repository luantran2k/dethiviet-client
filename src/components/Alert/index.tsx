import { Alert, Button } from "@mui/material";
export interface IAppAlertProps {
    variant: "success" | "warning" | "info" | "error";
    message: string;
}

export default function AppAlert(props: IAppAlertProps) {
    return (
        <div>
            <Button onClick={() => {}}>Alert</Button>
            <Alert
                severity={props.variant}
                sx={{ position: "absolute", top: "2rem", right: "2rem" }}
            >
                This is an error alert — check it out!
            </Alert>
        </div>
    );
}
