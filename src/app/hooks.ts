import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setIsSignIn } from "../redux/slices/appSlice";
import type { AppDispatch, RootState } from "../redux/store";
import request from "../Utils/request";
import ultis from "../Utils/ultis";

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
