import axios from "axios";
import { claerToken, getAccessToken, getRefreshToken, saveToken } from "../utils/helper";

const BaseUrl = "http://localhost:5000";

export const axiosAuth = axios.create({
  baseURL: BaseUrl,
  timeout: 10000
});

export const axiosApi = axios.create({
  baseURL: BaseUrl,
  timeout: 10000
});

let isRefreshing = false;
let failQueue = [];


const processQueue = (error, token = null) => {
  failQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failQueue = [];
};

axiosApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axiosApi(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();

        const refreshResp = await axiosAuth.post("/refresh", { refreshToken });

        const newAccess = refreshResp.data?.accessToken;

        if (!newAccess) throw new Error("No access token");

        saveToken(newAccess, refreshToken);

        processQueue(null, newAccess);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return axiosApi(originalRequest);

      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        claerToken();

        window.dispatchEvent(new Event("session-expired"));

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);