import axios from "axios";

const request = {
    get: async <Filter>(url: string, params?: Filter) => {
        const { data } = await axios.get(import.meta.env.VITE_BASE_URL + url, {
            params,
        });
        return data;
    },
    post: async (url: string, payload: any) => {
        const { data } = await axios.post(
            import.meta.env.VITE_BASE_URL + url,
            payload
        );
        return data;
    },

    patch: async (url: string, payload: any) => {
        const { data } = await axios.patch(
            import.meta.env.VITE_BASE_URL + url,
            payload
        );
        return data;
    },

    delete: async (url: string, param?: any) => {
        const { data } = await axios.delete(
            import.meta.env.VITE_BASE_URL + url
        );
        return data;
    },
};
export default request;
