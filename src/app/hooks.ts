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
                const data = await request.get<Filter>(url, params, config);
                setData(data);
            } catch (err: any) {
                setError(err.response.data);
            } finally {
                setLoading(false);
            }
        })();
    }, [url, params]);

    return { data, error, loading };
}

export function useAuth(page?: string) {
    const isSignIn = useAppSelector((state) => state.app.isSignIn);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    if (page) {
        console.log("check sigin" + page, isSignIn); //for debugging
    }
    useEffect(() => {
        if (!isSignIn) {
            const refresToken = ultis.checkRefreshTokenExpire();
            if (!refresToken) {
                console.log("Use auth navigate to signIn");
                if (location.state) {
                    navigate("/signIn", { state: { from: location.pathname } });
                } else {
                    navigate("/");
                }
                return;
            } else {
                dispatch(setIsSignIn());
            }
        }
    }, [isSignIn]);
}
