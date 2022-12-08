import { Typography } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { User } from "../../../redux/slices/appSlice";

export interface IUserNameButtonProps {
    user: User;
    fontSize?: number | string;
    prefix?: string;
}

export default function UserNameButton(props: IUserNameButtonProps) {
    const navigate = useNavigate();
    const { user, fontSize = "1rem", prefix } = props;
    return (
        <Typography
            sx={{
                fontSize: fontSize,
                fontWeight: "500",
                cursor: "pointer",
                "&:hover": {
                    color: teal[600],
                },
                span: {
                    color: grey[900],
                },
            }}
            onClick={() => {
                navigate(`/user/${user.id}/info`);
            }}
        >
            {" "}
            <span>{prefix}</span>
            {user?.name || "@" + user.username}
        </Typography>
    );
}
