import axios from "axios";

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

export default axiosInstance;
