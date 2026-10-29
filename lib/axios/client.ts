import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 같은 앱의 Route Handler(app/api/*) 호출용 — 외부 백엔드(NEXT_PUBLIC_API_URL)와 분리
export const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
