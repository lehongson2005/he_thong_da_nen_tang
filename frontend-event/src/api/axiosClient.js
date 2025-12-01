// src/api/axiosClient.js
import axios from 'axios';

// Lấy đường dẫn từ file .env
const apiUrl = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm một request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;