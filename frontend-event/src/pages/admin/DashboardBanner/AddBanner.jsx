import React, { useState, useEffect } from "react"; // Thêm useEffect
import { CheckCircle, XCircle, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_API_URL = import.meta.env.VITE_API_ORIGIN;

// Khởi tạo instance Axios đã cấu hình
const API = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true, // Vẫn giữ để xử lý CSRF cookie
});

// Hàm này sẽ chạy trước MỌI request
API.interceptors.request.use(
    (config) => {
      // 1. Đọc Token từ Local Storage
      const authToken = localStorage.getItem('authToken');

      // 2. Nếu có Token và request là đến API được bảo vệ (không phải csrf-cookie)
      // Hoặc nếu nó là POST/PUT/DELETE
      if (authToken && config.url !== '/sanctum/csrf-cookie') {
        // 3. Thiết lập Bearer Token trong Header
        config.headers['Authorization'] = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);


// --- SIMPLE BUTTON COMPONENT (Giữ nguyên) ---
// ...
const SimpleButton = ({ children, onClick, variant = "default", type = "button", className = "" }) => {
  let baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2";
  let variantClasses = "";

  switch (variant) {
    case "destructive":
      variantClasses = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case "outline":
      variantClasses = "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300";
      break;
    case "ghost":
      variantClasses = "text-gray-700 hover:bg-gray-100 focus:ring-gray-300";
      break;
    case "default":
    default:
      variantClasses = "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
      break;
  }

  return (
      <button type={type} onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </button>
  );
};


// --- CUSTOM MODAL COMPONENT (Giữ nguyên) ---
const MessageModal = ({ show, onClose, type, message }) => {
  // ... (Code MessageModal giữ nguyên) ...
  if (!show) return null;

  const isSuccess = type === 'success';
  const icon = isSuccess ? <CheckCircle size={24} className="text-green-600" /> : <XCircle size={24} className="text-red-600" />;
  const title = isSuccess ? "Thành công" : "Lỗi";
  const bgColor = isSuccess ? "border-green-300" : "border-red-300";

  return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center p-4">
        <div className={`bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border-t-4 ${bgColor}`}>
          <div className="flex items-center space-x-3 mb-4">
            {icon}
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm mb-6">{message}</p>
          <div className="flex justify-end">
            <SimpleButton type="button" variant={isSuccess ? "default" : "destructive"} onClick={onClose}>
              Đóng
            </SimpleButton>
          </div>
        </div>
      </div>
  );
};

// --- ADD BANNER COMPONENT ---
const AddBanner = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: 'success', text: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setModalMessage({ type: 'error', text: "Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, JPEG)." });
        setShowModal(true);
        e.target.value = null;
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!title || !link || !image) {
      setModalMessage({ type: 'error', text: "Vui lòng nhập đầy đủ Tiêu đề, Mô tả, Đường dẫn và Ảnh Banner!" });
      setShowModal(true);
      return;
    }

    // 💡 Thêm kiểm tra Token ở đây
    if (!localStorage.getItem('authToken')) {
      setModalMessage({ type: 'error', text: "Lỗi xác thực: Vui lòng đăng nhập lại để thực hiện thao tác này." });
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      // 1️⃣ Lấy CSRF cookie (cần cho Sanctum)
      await API.get("/sanctum/csrf-cookie");

      // 2️⃣ Upload ảnh trước (Route này đã là Public và giờ có thể mang Bearer Token)
      const formDataImg = new FormData();
      formDataImg.append("media_image", image);

      const uploadRes = await API.post("/api/banners/upload-image", formDataImg, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      const imageUrl = uploadRes.data.url;
      if (!imageUrl) throw new Error("Backend không trả về URL ảnh.");


      // 3️⃣ Tạo banner mới (Route này cần Bearer Token trong Header)
      const payload = {
        media_title: title,
        media_detail_link: link,
        media_image_url: imageUrl,
        media_is_active: status ? 1 : 0,
      };

      // API.post ở đây sẽ tự động gửi Bearer Token nhờ interceptor đã cài đặt
      await API.post("/api/banners", payload);

      setModalMessage({ type: 'success', text: `Banner "${title}" đã được lưu thành công!` });
      setShowModal(true);
      setTimeout(() => {
        navigate("/dashboard/banners");
      }, 1000);
      // Reset form
      setTitle(""); setLink(""); setStatus(true); setImage(null);
      if (preview) URL.revokeObjectURL(preview); setPreview(null);

    } catch (err) {
      console.error(err.response?.data || err);
      // Xử lý lỗi 401:
      if (err.response?.status === 401) {
        setModalMessage({ type: 'error', text: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại!" });
      } else {
        const apiErrorMessage = err.response?.data?.message || (err.response?.data?.errors && Object.values(err.response.data.errors).flat().join(" ")) || err.message;
        const msg = apiErrorMessage || "Có lỗi xảy ra. Vui lòng thử lại!";
        setModalMessage({ type: 'error', text: msg });
      }
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 font-['Inter', sans-serif]">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Thêm banner mới</h2>
            <p className="text-sm text-gray-500">Điền vào các trường bên dưới để tạo banner mới.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề Banner *</label>
              <input type="text" placeholder="Ví dụ: Khuyến mãi Tết 2024" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn liên kết *</label>
              <input type="url" placeholder="https://example.com" value={link} onChange={(e) => setLink(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh Banner *</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition duration-150 cursor-pointer">
                {preview ? (
                    <img src={preview} alt="preview" className="w-full max-w-lg h-48 object-cover rounded-md mb-3 shadow-md" />
                ) : (
                    <div className="text-gray-400">
                      Nhấn để tải lên hoặc kéo thả tệp (PNG, JPG, JPEG)
                    </div>
                )}
                <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* Hiển thị toggle */}
            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only" checked={status} onChange={(e) => setStatus(e.target.checked)} />
                <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 shadow-inner ${status ? "bg-indigo-600" : "bg-gray-300"}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${status ? "translate-x-4" : "translate-x-0"}`} />
                </div>
              </label>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-between pt-6 border-t mt-6">
              <SimpleButton type="button" variant="outline" onClick={() => window.history.back()} className="shadow-sm">
                <ChevronLeft size={16} className="mr-1" /> Quay lại
              </SimpleButton>
              <SimpleButton type="submit" variant="default" className="shadow-lg" disabled={isLoading}>
                {isLoading ? 'Đang xử lý...' : '💾 Lưu Banner'}
              </SimpleButton>
            </div>
          </form>
        </div>

        <MessageModal show={showModal} onClose={handleCloseModal} type={modalMessage.type} message={modalMessage.text} />
      </div>
  );
};

export default AddBanner;
