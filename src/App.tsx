import { ContactPage } from "@mui/icons-material";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { setIsSignIn } from "./redux/slices/appSlice";
import ultis from "./Utils/ultis";

function App() {
    const AboutPage = React.lazy(() => import("./pages/About"));
    const ErrorPage = React.lazy(() => import("./pages/Error"));
    const NotFoundPage = React.lazy(() => import("./pages/Error/NotFound"));
    const ExamPage = React.lazy(() => import("./pages/Exam"));
    const DetailExamPage = React.lazy(() => import("./pages/Exam/detail"));
    const HomePage = React.lazy(() => import("./pages/Home"));
    const FitHeightLayout = React.lazy(
        () => import("./pages/Layouts/FitHeightLayout")
    );
    const Root = React.lazy(() => import("./pages/Layouts/Root"));
    const LoginPage = React.lazy(() => import("./pages/Login"));
    const EditExamPage = React.lazy(() => import("./pages/Exam/edit"));

    const dispatch = useAppDispatch();
    const isRefreshTokenExpire = () => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (
            refreshToken &&
            new Date(ultis.parseJwt(refreshToken).exp * 1000) >= new Date()
        ) {
            return true;
        }
        return false;
    };
    const [isSignIn] = useState(isRefreshTokenExpire());

    useEffect(() => {
        dispatch(setIsSignIn(isSignIn));
    }, []);

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <Root />
                            </Suspense>
                        }
                        errorElement={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <ErrorPage />
                            </Suspense>
                        }
                    >
                        <Route
                            index
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <HomePage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="about"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <AboutPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="contact"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <ContactPage />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route
                        path="exam"
                        element={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <FitHeightLayout />
                            </Suspense>
                        }
                    >
                        <Route
                            index
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <ExamPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="detail/:examId"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <DetailExamPage />
                                </Suspense>
                            }
                        />
                        <Route
                            path="edit/:examId"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <EditExamPage />
                                </Suspense>
                            }
                        />
                    </Route>

                    <Route
                        path="signIn"
                        element={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                {isSignIn ? <Navigate to="/" /> : <LoginPage />}
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <NotFoundPage />
                            </Suspense>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
    //return <RouterProvider router={router} />;
}

export default App;
