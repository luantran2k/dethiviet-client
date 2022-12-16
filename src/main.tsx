import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import { Util } from "pdfjs-dist";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "./scss/index.scss";
import { theme } from "./themes";
import ultis from "./Utils/ultis";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {ultis.checkMobileDevice() ? (
            <h1>Tạm thời chưa hỗ trợ các thiết bị di động</h1>
        ) : (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Provider>
        )}
    </React.StrictMode>
);
