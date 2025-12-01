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

export default axiosClient;