// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://full-stack-assignment-2-0n7g.onrender.com",
  withCredentials: true, // for cookie-based auth (if used)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
