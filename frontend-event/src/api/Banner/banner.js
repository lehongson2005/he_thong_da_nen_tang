import axios from "axios";

// URL gốc của API backend Laravel
const API_ROOT = import.meta.env.VITE_API_ORIGIN;
const API_BASE = `${API_ROOT}/api/banners`;

const BannerApi = {

    getConfig: () => {
        const token = localStorage.getItem("authToken");
        return {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
        };
    },

    // =======================
    // 🔹 LẤY TẤT CẢ BANNER
    // =======================
    getAll: async () => {
        try {
            const res = await axios.get(API_BASE, BannerApi.getConfig());

            // Chuẩn hóa URL ảnh
            const dataWithAbsoluteUrls = res.data.map((b) => {
                let imageUrl = b.media_image_url;

                // Nếu đường dẫn chưa có http(s), nối thêm domain backend
                if (imageUrl && !imageUrl.startsWith("http")) {
                    imageUrl = `${API_ROOT}${imageUrl}`;
                }

                return {...b, media_image_url: imageUrl};
            });

            return dataWithAbsoluteUrls;
        } catch (err) {
            console.error("❌ Lỗi getAll:", err);
            return [];
        }
    },

    //  LẤY THEO ID
    getById: async (id) => {
        try {
            const res = await axios.get(`${API_BASE}/${id}`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi getById(${id}):`, err);
            return null;
        }
    },

    // =======================
    // 🔹 TẠO BANNER
    // =======================
    create: async (banner) => {
        try {
            const res = await axios.post(API_BASE, banner, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi create:", err);
            return null;
        }
    },

    // =======================
    // 🔹 CẬP NHẬT BANNER
    // =======================
    update: async (id, banner) => {
        try {
            const token = localStorage.getItem("authToken");

            // Nếu có ảnh (file), gửi dưới dạng FormData
            let dataToSend;
            let headers;

            if (banner instanceof FormData) {
                dataToSend = banner;
                headers = {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "multipart/form-data",
                };
            } else {
                dataToSend = banner;
                headers = {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                };
            }

            const res = await axios.post(`${API_BASE}/${id}`, dataToSend, {headers});
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi update(${id}):`, err);
            return null;
        }
    },

    // =======================
    // 🔹 XOÁ BANNER
    // =======================
    delete: async (id) => {
        try {
            const res = await axios.delete(`${API_BASE}/${id}`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error(`❌ Lỗi delete(${id}):`, err);
            return null;
        }
    },
    // =======================
// 🔹 KÍCH HOẠT / VÔ HIỆU HOÁ
// =======================
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
        if (isActive) {
            return await BannerApi.deactivate(id);
        } else {
            return await BannerApi.activate(id);
        }
    },



    // =======================
    // 🔹 LẤY CÁC LOẠI DANH SÁCH
    // =======================
    getActive: async () => {
        try {
            const res = await axios.get(`${API_BASE}/active`);
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi getActive:", err);
            return [];
        }
    },

    // =======================
    // 🔹 TÌM KIẾM BANNER
    // =======================
    search: async (keyword) => {
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.get(`${API_BASE}/search?q=${encodeURIComponent(keyword)}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    "Content-Type": "application/json",
                },
            });
            return res.data; // server trả về mảng JSON banner
        } catch (err) {
            console.error("❌ Lỗi search:", err);
            return [];
        }
    },

    getActiveLimited: async (limit = 5) => {
        try {
            const res = await axios.get(`${API_BASE}/active-limited?limit=${limit}`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi getActiveLimited:", err);
            return [];
        }
    },

    getUpcoming: async () => {
        try {
            const res = await axios.get(`${API_BASE}/upcoming`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi getUpcoming:", err);
            return [];
        }
    },

    getExpired: async () => {
        try {
            const res = await axios.get(`${API_BASE}/expired`, BannerApi.getConfig());
            return res.data;
        } catch (err) {
            console.error("❌ Lỗi getExpired:", err);
            return [];
        }
    },

};

export default BannerApi;
