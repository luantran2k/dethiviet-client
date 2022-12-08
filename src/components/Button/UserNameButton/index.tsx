import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { User } from "../../../redux/slices/appSlice";

export interface IUserNameButtonProps {
    user: User;
    fontSize?: number | string;
}

export default function UserNameButton(props: IUserNameButtonProps) {
    const navigate = useNavigate();
    const { user, fontSize = "1rem" } = props;
    return (
        <Typography
            sx={{
                fontSize: fontSize,
                fontWeight: "500",
                cursor: "pointer",
                "&:hover": {
                    color: teal[600],
                },
            }}
            onClick={() => {
                navigate(`/user/${user.id}/info`);
            }}
        >
            {user?.name || "@" + user.username}
        </Typography>
    );
}
