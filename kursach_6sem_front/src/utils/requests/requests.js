import axios from "axios";
import {server_url} from "../consts";

export const injectStore = _store => {
    store = _store
}

export const axiosInstance = axios.create({
    baseURL: server_url
});

let store

axiosInstance.interceptors.request.use(
    (config) => {
        let token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    function (error) {
        if (error.name === "AxiosError")
            throw error;
    }
);
