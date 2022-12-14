import { Box } from "@mui/material";

export interface IAvatarProps {
    profileImg?: string;
}

export default function Avatar(props: IAvatarProps) {
    let { profileImg } = props;
    if (!profileImg) {
        profileImg = "/image/user/profile.png";
    }
    return (
        <Box
            sx={{
                height: "2.8rem",
                width: "2.8rem",
                img: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                },
            }}
        >
            <img src={profileImg} alt="avatar" />
        </Box>
    );
}
