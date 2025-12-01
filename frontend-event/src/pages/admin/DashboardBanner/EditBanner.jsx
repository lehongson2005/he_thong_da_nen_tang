import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, ChevronLeft } from "lucide-react";
import BannerApi from "../../../api/Banner/banner";

// Nút đơn giản
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

// Modal thông báo
const MessageModal = ({ show, onClose, type, message }) => {
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
                    <SimpleButton
                        type="button"
                        variant={isSuccess ? "default" : "destructive"}
                        onClick={onClose}
                    >
                        Đóng
                    </SimpleButton>
                </div>
            </div>
        </div>
    );
};

// Trang chỉnh sửa banner
const EditBanner = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ type: 'success', text: '' });

    // Lấy dữ liệu banner theo ID
    useEffect(() => {
        setIsLoading(true);
        BannerApi.getById(id)
            .then(data => {
                if (!data) throw new Error("Không lấy được banner từ server");
                setTitle(data.media_title);
                setLink(data.media_detail_link);
                setStatus(Boolean(data.media_is_active));
                setCurrentImageUrl(
                    data.media_image_url?.startsWith("http")
                        ? data.media_image_url
                        : `${import.meta.env.VITE_API_ORIGIN}${data.media_image_url}`
                );
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                setModalMessage({ type: "error", text: "Lỗi khi tải dữ liệu banner!" });
                setShowModal(true);
            })
            .finally(() => setIsLoading(false));

        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [id]);

    // Khi chọn ảnh mới
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setModalMessage({ type: 'error', text: "Vui lòng chọn tệp hình ảnh hợp lệ." });
                setShowModal(true);
                e.target.value = null;
                return;
            }
            setNewImage(file);
            if (preview) URL.revokeObjectURL(preview);
            setPreview(URL.createObjectURL(file));
        } else {
            setNewImage(null);
            if (preview) URL.revokeObjectURL(preview);
            setPreview(null);
        }
    };

    // Gửi form cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !link) {
            setModalMessage({ type: 'error', text: "Vui lòng nhập đầy đủ Tiêu đề và Đường dẫn liên kết!" });
            setShowModal(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("media_title", title);
            formData.append("media_detail_link", link);
            formData.append("media_is_active", status ? 1 : 0);

            if (newImage) {
                formData.append("media_image", newImage);
            }

            await BannerApi.update(id, formData);

            setModalMessage({ type: 'success', text: "Cập nhật banner thành công!" });
            setShowModal(true);
            setTimeout(() => {
                navigate("/dashboard/banners");
            }, 1000);
            if (preview) {
                setCurrentImageUrl(preview);

            }
            setNewImage(null);
            setPreview(null);
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            setModalMessage({ type: 'error', text: "Cập nhật banner thất bại!" });
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-lg font-medium text-indigo-600">
                Đang tải dữ liệu Banner ID {id}...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Chỉnh sửa banner (ID: {id})
                    </h2>
                    <p className="text-sm text-gray-500">Chỉnh sửa thông tin banner hiện tại và cập nhật.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tiêu đề */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tiêu đề Banner <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Đường dẫn liên kết <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Ảnh */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh Banner</label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-500 transition duration-150 cursor-pointer">
                            {(preview || currentImageUrl) ? (
                                <div className="w-full max-w-lg mb-3">
                                    <p className="text-xs text-gray-500 mb-1 font-semibold">Ảnh hiện tại:</p>
                                    <img
                                        src={preview || currentImageUrl}
                                        alt="Ảnh xem trước banner"
                                        className="w-full h-48 object-cover rounded-md shadow-md border"
                                    />
                                    <p className="text-xs text-gray-400 mt-2">{preview ? "Đã chọn ảnh mới" : "Bấm để đổi ảnh khác"}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 font-semibold">
                                    Nhấn để tải lên ảnh mới (PNG, JPG, JPEG • Tối đa 5MB)
                                </p>
                            )}
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Toggle hiển thị */}
                    <div className="flex items-center justify-between pt-4">
                        <label className="text-sm font-medium text-gray-700">Hiển thị Banner</label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                            />
                            <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 shadow-inner ${status ? "bg-indigo-600" : "bg-gray-300"}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${status ? "translate-x-4" : "translate-x-0"}`} />
                            </div>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-6 border-t mt-6">
                        <SimpleButton type="button" variant="outline" onClick={() => navigate(-1)} className="shadow-sm">
                            <ChevronLeft size={16} className="mr-1" /> Quay lại
                        </SimpleButton>
                        <SimpleButton type="submit" variant="default" className="shadow-lg bg-green-600 hover:bg-green-700">
                            ✅ Cập nhật Banner
                        </SimpleButton>
                    </div>
                </form>
            </div>

            <MessageModal
                show={showModal}
                onClose={handleCloseModal}
                type={modalMessage.type}
                message={modalMessage.text}
            />
        </div>
    );
};

export default EditBanner;
