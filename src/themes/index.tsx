import { createTheme } from "@mui/material";
import { amber, orange, teal } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: amber[400],
        },
    },
    breakpoints: {
        values: { xs: 567, sm: 768, md: 992, lg: 1200, xl: 1400 },
    },
});
