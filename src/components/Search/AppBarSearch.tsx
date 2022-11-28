import { alpha, InputBase, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { teal } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: teal[400],
    zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    height: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        backgroundColor: teal[50],
        borderRadius: "1rem",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export interface IAppBarSearchProps {}

export default function AppBarSearch(props: IAppBarSearchProps) {
    const navigate = useNavigate();
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Tìm kiếm"
                inputProps={{ "aria-label": "search" }}
                onKeyUp={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value !== "") {
                        navigate("/exam/search?title=" + e.currentTarget.value);
                    }
                }}
            />
        </Search>
    );
}
