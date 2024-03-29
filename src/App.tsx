import { ContactPage } from "@mui/icons-material";
import React, { Suspense, useEffect, useState } from "react";
import {
    BrowserRouter,
    Navigate,
    redirect,
    Route,
    Routes,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import ProfilePage from "./pages/Profile";
import AccountSetting from "./pages/Profile/AccountSetting";
import CompletedExams from "./pages/Profile/CompletedExams";
import FavoriteExams from "./pages/Profile/FavoriteExams";
import UserProfileInfo from "./pages/Profile/Info";
import OwnExams from "./pages/Profile/OwnExams";
import { setIsSignIn } from "./redux/slices/appSlice";
import ultis from "./Utils/ultis";

function App() {
    const AboutPage = React.lazy(() => import("./pages/About"));
    const DiscussionPage = React.lazy(() => import("./pages/Discussion"));
    const ErrorPage = React.lazy(() => import("./pages/Error"));
    const NotFoundPage = React.lazy(() => import("./pages/Error/NotFound"));
    const ExamPage = React.lazy(() => import("./pages/Exam"));
    const CreateExamPage = React.lazy(() => import("./pages/Exam/create"));
    const SearchExamPage = React.lazy(() => import("./pages/Exam/search"));
    const DetailExamPage = React.lazy(() => import("./pages/Exam/detail"));
    const PracticeExamPage = React.lazy(() => import("./pages/Exam/practice"));
    const ResultExamPage = React.lazy(() => import("./pages/Exam/result"));
    const HomePage = React.lazy(() => import("./pages/Home"));
    const Root = React.lazy(() => import("./pages/Layouts/Root"));
    const LoginPage = React.lazy(() => import("./pages/Login"));
    const EditExamPage = React.lazy(() => import("./pages/Exam/edit"));
    const ReportPage = React.lazy(() => import("./pages/Report"));
    const FindPasswordPage = React.lazy(() => import("./pages/FindPassword"));
    const AdminPage = React.lazy(() => import("./pages/Admin"));
    const DashboardOutlet = React.lazy(
        () => import("./pages/Admin/DashboardOutlet")
    );
    const UserOutlet = React.lazy(() => import("./pages/Admin/UserOutlet"));
    const ExamOutlet = React.lazy(() => import("./pages/Admin/ExamOutlet"));
    const ReportOutlet = React.lazy(() => import("./pages/Admin/ReportOutlet"));

    const dispatch = useAppDispatch();
    const [isSignIn] = useState(ultis.checkRefreshTokenExpire());

    useEffect(() => {
        if (isSignIn) {
            dispatch(setIsSignIn());
        }
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
                            path="discussion"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <DiscussionPage />
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
                        <Route
                            path="findPassword"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <FindPasswordPage />
                                </Suspense>
                            }
                        />
                        <Route path="exam">
                            <Route
                                index
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <ExamPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="search"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <SearchExamPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="create"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <CreateExamPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="detail/:examId"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <DetailExamPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path="edit/:examId"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <EditExamPage />
                                    </Suspense>
                                }
                            ></Route>
                            <Route
                                path="practice/:examId"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <PracticeExamPage />
                                    </Suspense>
                                }
                            ></Route>
                            <Route
                                path="result/:resultId"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <ResultExamPage />
                                    </Suspense>
                                }
                            ></Route>
                        </Route>
                        <Route path="user">
                            <Route
                                path="report"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <ReportPage />
                                    </Suspense>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    <Suspense
                                        fallback={<h4>Đang tải trang</h4>}
                                    >
                                        <ProfilePage />
                                    </Suspense>
                                }
                            >
                                <Route
                                    path="info"
                                    element={<UserProfileInfo />}
                                />

                                <Route path="exams">
                                    <Route path="own" element={<OwnExams />} />
                                    <Route
                                        path="completed"
                                        element={<CompletedExams />}
                                    />
                                    <Route
                                        path="favorite"
                                        element={<FavoriteExams />}
                                    />
                                </Route>
                                <Route
                                    path="account-setting"
                                    element={<AccountSetting />}
                                />
                            </Route>
                        </Route>
                    </Route>

                    <Route
                        path="signIn"
                        element={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <Suspense fallback={<h4>Đang tải trang</h4>}>
                                <AdminPage />
                            </Suspense>
                        }
                    >
                        <Route index element={<Navigate to="home" />} />
                        <Route
                            path="home"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <DashboardOutlet />
                                </Suspense>
                            }
                        />
                        <Route
                            path="users"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <UserOutlet />
                                </Suspense>
                            }
                        />
                        <Route
                            path="exams"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <ExamOutlet />
                                </Suspense>
                            }
                        />
                        <Route
                            path="errors"
                            element={
                                <Suspense fallback={<h4>Đang tải trang</h4>}>
                                    <ReportOutlet />
                                </Suspense>
                            }
                        />
                    </Route>

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
