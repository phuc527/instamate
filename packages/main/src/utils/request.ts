import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
} from "axios";
import CONFIG from "../config";
import history from "./history";

const request: AxiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL,

    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
    const newConfig = { ...config };

    return newConfig;
});

request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError<unknown>) => {
        if (
            error.response?.status === 401 &&
            history.location.pathname !== "/login"
        ) {
            history.push("/login");
        }
        return Promise.reject(error.response);
    }
);

export default request;
