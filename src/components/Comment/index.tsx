import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { User } from "../../redux/slices/appSlice";
import Avatar from "../Avatar";
import UserNameButton from "../Button/UserNameButton";

export interface ICommentProps {
    user: User;
}

export default function AppComment(props: ICommentProps) {
    const { user } = props;
    return (
        <Stack direction="row" spacing={1}>
            <Stack>
                <Avatar profileImg={user.profileImg!} />
            </Stack>
            <Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    <UserNameButton user={user} />
                    <Typography
                        fontSize="0.8rem"
                        fontStyle="normal"
                        sx={{ transform: "translate(0,10%)" }}
                    >
                        {new Date().toLocaleString()}
                    </Typography>
                </Stack>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Typography>
                <ButtonGroup variant="outlined" size="small">
                    <Button>
                        <ArrowUpward />
                    </Button>
                    <Button>{300}</Button>
                    <Button>
                        <ArrowDownward />
                    </Button>
                </ButtonGroup>
            </Stack>
        </Stack>
    );
}
