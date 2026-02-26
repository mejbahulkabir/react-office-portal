import axios from "axios";

const api = axios.create({
  baseURL: " https://node-backend-office-portal-1.onrender.com/api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
