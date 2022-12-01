import { Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { User } from "../../../redux/slices/appSlice";

export interface IUserNameButtonProps {
    user: User;
}

export default function UserNameButton(props: IUserNameButtonProps) {
    const navigate = useNavigate();
    const { user } = props;
    return (
        <Typography
            sx={{
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
            {user.name || "@" + user.username}
        </Typography>
    );
}
