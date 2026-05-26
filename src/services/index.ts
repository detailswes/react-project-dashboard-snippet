import axios from "axios";
import store from "../store";
import { userActions } from "../store/slices/userSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_AUTH,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token: string | null = localStorage.getItem("token");
        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    async (error) => {
        return await Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            store.dispatch(userActions.clearAuth());
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/auth";
        }
        return await Promise.reject(error);
    }
);

export default axiosInstance;
