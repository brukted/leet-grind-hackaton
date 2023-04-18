import axios from "axios";

export const configureAxios = () => {
    axios.defaults.baseURL = "http://localhost:3000/api/v1";

    // Add an interceptor that adds the auth token to every request
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};