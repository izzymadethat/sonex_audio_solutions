import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);
