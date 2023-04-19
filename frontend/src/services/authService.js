import axios from "axios";

export const login = async (email, password) => {
    return axios.post("/login", { email, password }).then((response) => {
        return response.data.data;
    });
};

export const register = async (firstName, lastName, telegramUrl, email, password) => {
    return axios.post("/signup", { name: firstName, lastname: lastName, telegram: telegramUrl, email, password }).then((response) => {
        return response.data.data;
    });
};
