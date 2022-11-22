import { useEffect, useState } from "react";
import {
    BrowserRouter,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ErrorPage from "./pages/Error";
import NotFoundPage from "./pages/Error/NotFound";
import ExamPage from "./pages/Exam";
import DetailExamPage from "./pages/Exam/detail";
import EditExamPage from "./pages/Exam/edit";
import HomePage from "./pages/Home";
import FitHeightLayout from "./pages/Layouts/FitHeightLayout";
import Root from "./pages/Layouts/Root";
import LoginPage from "./pages/Login";
import { setIsSignIn } from "./redux/slices/appSlice";
import ultis from "./Utils/ultis";

function App() {
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
                        element={<Root />}
                        errorElement={<ErrorPage />}
                    >
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>
                    <Route path="exam" element={<FitHeightLayout />}>
                        <Route index element={<ExamPage />} />
                        <Route
                            path="detail/:examId"
                            element={<DetailExamPage />}
                        />
                        <Route path="edit/:examId" element={<EditExamPage />} />
                    </Route>

                    <Route
                        path="signIn"
                        element={isSignIn ? <Navigate to="/" /> : <LoginPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
    //return <RouterProvider router={router} />;
}

export default App;
