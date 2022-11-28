import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import AppModal from "../../Modal";
import CreateExamModal from "../modal/create";

export interface ICreateExamButtonProps {
    text?: string;
    variant?: "contained" | "outlined" | "text";
    action?: () => void;
    size?: "small" | "medium" | "large";
}

export default function CreateExamButton(props: ICreateExamButtonProps) {
    const { text, variant = "contained", action, size = "medium" } = props;
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const navigate = useNavigate();
    const location = useLocation();
    if (isSignIn) {
        if (action) {
            return (
                <Button size={size} onClick={action} variant="contained">
                    {text || "Tạo đề thi mới"}
                </Button>
            );
        }
        return (
            <AppModal
                trigger={
                    <Button size={size} variant={variant}>
                        Tạo đề thi mới
                    </Button>
                }
            >
                <CreateExamModal />
            </AppModal>
        );
    }
    return (
        <Button
            size={size}
            onClick={() => {
                navigate("/signIn", {
                    state: {
                        from: location.pathname,
                    },
                });
            }}
            variant={variant}
        >
            Đăng nhập để tạo đề thi
        </Button>
    );
}
