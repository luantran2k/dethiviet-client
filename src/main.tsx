import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ExamPage from "./pages/Exam";
import EditExamPage from "./pages/Exam/edit";
import HomePage from "./pages/Home";
import FitHeightLayout from "./pages/Layouts/FitHeightLayout";
import Root from "./pages/Layouts/Root";
import { store } from "./redux/store";
import "./scss/index.scss";
import { theme } from "./themes";

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="counter" element={<App />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
        </Route>,
        <Route path="exam" element={<FitHeightLayout />}>
            <Route index element={<ExamPage />} />
            <Route path="edit" element={<EditExamPage />}>
                <Route path=":examId" element={<EditExamPage />} />
            </Route>
        </Route>,
    ])
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
