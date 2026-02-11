import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===== Request interceptor ===== */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ===== Response interceptor ===== */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    return Promise.reject({
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Une erreur est survenue",
      status: error.response?.status ?? 0,
      data: error.response?.data ?? null,
    });
  }
);

export default api;
