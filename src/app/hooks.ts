import { sendAlert } from "./../redux/slices/appSlice";
import { refreshToken } from "./../Utils/request";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import request, { instance } from "../Utils/request";
import { useLocation, useNavigate } from "react-router-dom";
import ultis from "../Utils/ultis";
import { setIsSignIn } from "../redux/slices/appSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useFetch<Filter>(
    url: string,
    more?: { params?: any; config?: AxiosRequestConfig<any> }
): { data: any; error: any; loading: boolean };

export function useFetch<Filter, ResultData>(
    url: string,
    more?: { params?: any; config?: AxiosRequestConfig<any> }
): { data: ResultData; error: any; loading: boolean };

export function useFetch<Filter, ResultData>(
    url: string,
    more?: { params?: any; config?: AxiosRequestConfig<any> }
) {
    const [data, setData] = useState<ResultData | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { params, config } = more || {};
    useEffect(() => {
        (async function () {
            try {
                setError(null);
                setLoading(true);
                const data = await request.get<Filter, ResultData>(
                    url,
                    params,
                    config
                );
                if (data) setData(data);
            } catch (err: any) {
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        })();
    }, [url, params]);

    return { data, error, loading };
}

export function useAuth(options?: { role: string }) {
    const role = options?.role;
    const { isSignIn, ...app } = useAppSelector((state) => state.app);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            isSignIn &&
            role &&
            !app.userInfo?.role?.some((roleSome) => roleSome === role)
        ) {
            alert("Bạn không có quyền truy cập");
            navigate("/");
        }
        if (!isSignIn) {
            const refresToken = ultis.checkRefreshTokenExpire();
            if (!refresToken) {
                if (location.state) {
                    navigate("/signIn", { state: { from: location.pathname } });
                } else {
                    navigate("/signIn");
                }
                return;
            } else {
                dispatch(setIsSignIn());
            }
        }
    }, [isSignIn]);

    return app.userInfo;
}
