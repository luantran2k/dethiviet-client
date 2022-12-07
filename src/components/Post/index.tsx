import { MoreVert, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { User } from "../../redux/slices/appSlice";
import UserNameButton from "../Button/UserNameButton";
import AppComment from "../Comment";

export interface IPostProps {
    user?: User;
}

export default function Post(props: IPostProps) {
    const { user } = props;
    if (!user) {
        return <></>;
    }
    return (
        <Stack
            spacing={2}
            sx={{
                padding: "1rem",
                backgroundColor: "white",
                borderRadius: ".4rem",
                boxShadow:
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
        >
            <Stack
                spacing={1}
                direction="row"
                sx={{
                    img: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    },
                }}
            >
                <Box sx={{ height: "2.8rem", width: "2.8rem" }}>
                    <img src={user?.profileImg} alt="avatar" />
                </Box>
                <Stack>
                    <UserNameButton user={user} fontSize="1.2rem" />
                    <Typography fontWeight={400} fontSize=".8rem">
                        {new Date().toLocaleString()}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignSelf: "center",
                        marginLeft: "auto !important",
                    }}
                >
                    <Button sx={{}}>
                        <MoreVert />
                    </Button>
                </Stack>
            </Stack>
            <Typography sx={{ margin: ".4rem 0" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate cum recusandae blanditiis asperiores architecto ullam
                sequi maiores doloribus dolores, adipisci veritatis, officia
                esse fuga rerum libero temporibus totam minima? Enim.
            </Typography>
            <ButtonGroup>
                <Button>
                    <ArrowUpward />
                </Button>
                <Button>{300}</Button>
                <Button>
                    <ArrowDownward />
                </Button>
            </ButtonGroup>
            <Stack direction="row" spacing={2}>
                <TextField size="small" sx={{ flex: 1 }} />
                <Button variant="contained">Bình luận</Button>
            </Stack>
            <Stack spacing={1}>
                <AppComment user={user!} />
                <AppComment user={user!} />
                <AppComment user={user!} />
            </Stack>
        </Stack>
    );
}
