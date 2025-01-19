import axios from "axios";

const api = axios.create({ baseURL: "https://task-manager-12jy.onrender.com/api",
});
export default api;
