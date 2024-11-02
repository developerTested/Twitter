import axios, { AxiosResponse } from "axios"
import { getAccessToken, resetUser } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import { refreshToken } from "./helper";

const TwitterAPI = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 60 * 1000,
})

/**
 * Axios send Access Token
 */
TwitterAPI.interceptors.request.use(function (config) {

    const token = getAccessToken(store.getState());

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        store.dispatch(resetUser());
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});


/**
 * Axios Response 
 */
TwitterAPI.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async error => {
        const originalRequest = error.config;

        // Check if the error is a 401 and if it's not already trying to refresh
        if (error.response &&
            error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (error.response.data &&
                error.response.data.errors &&
                error.response.data.errors.name === "TokenExpiredError") {
                try {
                    await refreshToken();

                    return TwitterAPI(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }

        return error.response?.data ? Promise.reject(error.response.data) : Promise.reject(error);
    }
);


export default TwitterAPI