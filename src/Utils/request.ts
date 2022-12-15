import { sendAlert, setLoading, User } from "./../redux/slices/appSlice";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../redux/store";

const { dispatch } = store;

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    timeout: 60000,
    headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
    async (config) => {
        if (
            config.url!.indexOf("/signIn") >= 0 ||
            config.url!.indexOf("/refreshToken") >= 0
        ) {
            return config;
        }
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && config.headers) {
            config.headers["Authorization"] = `Bearer ${localStorage.getItem(
                "accessToken"
            )}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        dispatch(setLoading(false));
        return response;
    },
    async (error) => {
        dispatch(setLoading(false));
        if (
            error.config &&
            error.config.url.indexOf("/refreshToken") === -1 &&
            error.response?.status === 401
        ) {
            const newTokens = await refreshToken();
            if (newTokens) {
                error.config.headers["Authorization"] = newTokens.accessToken;
                return instance.request({
                    ...error.config,
                    headers: error.config.headers.toJSON(),
                });
            }
        }
        dispatch(
            sendAlert({
                message:
                    error.response?.data?.message ||
                    "Có lỗi, vui lòng thử lại ",
                severity: "error",
                time: 5,
            })
        );
        return Promise.reject(error);
    }
);

export const refreshToken = async () => {
    const oldRefreshToken = localStorage.getItem("refreshToken");
    const response = await instance.get("auth/refreshToken", {
        headers: {
            Authorization: `Bearer ${oldRefreshToken}`,
        },
    });
    if (response && response.status === 200) {
        saveRefreshToken(response.data);
        return response.data;
    }
    removeToken();
    return false;
};

export const saveRefreshToken = (data: {
    accessToken: string;
    refreshToken: string;
    userInfo: User;
}) => {
    const { accessToken, refreshToken, userInfo } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
};

const request = {
    get: async <Filter, ResultData>(
        url: string,
        params?: Filter,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        const response = await instance.get(url, { params, ...config });
        if (response.data) {
            return response.data as ResultData;
        }
        return undefined;
    },
    post: async <ResultData>(
        url: string,
        payload: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        const response = await instance.post(url, payload, config);
        if (response) {
            const data: ResultData = response.data;
            return data;
        }
        return response;
    },

    patch: async <ResultData>(
        url: string,
        payload: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        const response = await instance.patch(url, payload, config);
        if (response) {
            const data: ResultData = response.data;
            return data;
        }
        return response;
    },

    delete: async <ResultData>(
        url: string,
        param?: any,
        config?: AxiosRequestConfig<any> | undefined
    ) => {
        const response = await instance.delete(url, config);
        if (response) {
            return response.data as ResultData;
        }
        return response;
    },
};
export default request;
