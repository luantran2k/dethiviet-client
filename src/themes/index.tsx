import { createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: teal[300],
        },
    },
});
