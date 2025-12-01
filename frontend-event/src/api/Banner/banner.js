import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; // ví dụ: http://localhost:8000/api
const API_BASE = `${API_URL}/banners`;

const BannerApi = {
    // 🔹 Cấu hình headers với token từ localStorage hoặc sessionStorage
    getConfig: () => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) {
            console.error("❌ Token không tồn tại. Vui lòng đăng nhập.");
            return { headers: {} };
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
    },

    // 🔹 UPLOAD ẢNH BANNER
    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append("media_image", file); // Đảm bảo tên trường là 'media_image'

            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) {
                console.error("❌ Token không tồn tại. Vui lòng đăng nhập.");
                return null;
            }

            const res = await axios.post(`${API_BASE}/upload-image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Quan trọng cho FormData
                },
            });
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi uploadImage:", err);
            throw err; // Ném lỗi để FE xử lý
        }
    },

    // 🔹 LẤY TẤT CẢ BANNER
    getAll: async () => {
        try {
            const res = await axios.get(API_BASE, BannerApi.getConfig());
            if (!Array.isArray(res.data)) {
                console.error("❌ Dữ liệu API trả về không phải mảng.", res.data);
                return [];
            }
            return res.data.map(b => ({ ...b, media_image_url: b.media_image_url }));
        } catch (err) {
            console.error("❌ Lỗi getAll:", err);
            return [];
        }
    },

    // 🔹 LẤY THEO ID
    getById: async (id) => {
        try {
            const res = await axios.get(`${API_BASE}/${id}`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi getById(${id}):`, err);
            return null;
        }
    },

    // 🔹 TẠO BANNER
    create: async (banner) => {
        try {
            const res = await axios.post(API_BASE, banner, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi create:", err);
            return null;
        }
    },

    // 🔹 CẬP NHẬT BANNER
    update: async (id, banner) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return null;

            let headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Luôn là application/json cho dữ liệu banner
            };

            const res = await axios.put(`${API_BASE}/${id}`, banner, { headers });
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi update(${id}):`, err);
            return null;
        }
    },

    // 🔹 XOÁ BANNER
    delete: async (id) => {
        try {
            const res = await axios.delete(`${API_BASE}/${id}`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi delete(${id}):`, err);
            return null;
        }
    },

    // 🔹 KÍCH HOẠT / VÔ HIỆU HOÁ
    activate: async (id) => {
        try {
            const res = await axios.post(`${API_BASE}/${id}/activate`, {}, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi activate(${id}):`, err);
            return null;
        }
    },

    deactivate: async (id) => {
        try {
            const res = await axios.post(`${API_BASE}/${id}/deactivate`, {}, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi deactivate(${id}):`, err);
            return null;
        }
    },

    toggleStatus: async (id, isActive) => {
        return isActive ? await BannerApi.deactivate(id) : await BannerApi.activate(id);
    },

    // 🔹 LẤY CÁC LOẠI DANH SÁCH
    getActive: async () => {
        try {
            const res = await axios.get(`${API_BASE}/active`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi getActive:", err);
            return [];
        }
    },

    // 🔹 TÌM KIẾM BANNER
    search: async (keyword) => {
        try {
            const res = await axios.get(`${API_BASE}/search?q=${encodeURIComponent(keyword)}`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi search:", err);
            return [];
        }
    },
};

export default BannerApi;
