import axios from "axios";

const BASE_URL = "https://api-node-ts-nine.vercel.app/";
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default api;