import axios from "axios";

const BASE_URL = "https://supreme-couscous-jx7pqqjv79qfxrv-8000.app.github.dev/";
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default api;