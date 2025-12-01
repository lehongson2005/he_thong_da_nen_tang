import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import Label  from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import Checkbox from "@/components/ui/checkbox.jsx";
import BannerApi from "../../../api/Banner/banner";
import toast, { Toaster } from "react-hot-toast";

export default function EditBanner() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID banner từ URL
  const [formData, setFormData] = useState({
    media_title: "",
    media_detail_link: "",
    media_publish_from: "",
    media_publish_to: "",
    media_order: 0,
    media_is_active: false,
    media_image_url: "", // Để lưu URL ảnh hiện tại
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // Bắt đầu với loading true khi tải dữ liệu banner
  const [submitting, setSubmitting] = useState(false); // Trạng thái khi đang gửi form
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banner = await BannerApi.getById(id);
        if (banner) {
          setFormData({
            media_title: banner.media_title || "",
            media_detail_link: banner.media_detail_link || "",
            media_publish_from: banner.media_publish_from ? new Date(banner.media_publish_from).toISOString().split('T')[0] : "",
            media_publish_to: banner.media_publish_to ? new Date(banner.media_publish_to).toISOString().split('T')[0] : "",
            media_order: banner.media_order || 0,
            media_is_active: banner.media_is_active === 1,
            media_image_url: banner.media_image_url || "",
          });
          setImagePreview(banner.media_image_url); // Hiển thị ảnh hiện tại
        } else {
          toast.error("Không tìm thấy banner.");
          navigate("/admin/banners");
        }
      } catch (err) {
        console.error("Lỗi khi tải banner:", err);
        toast.error("Không thể tải thông tin banner.");
        navigate("/admin/banners");
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Xem trước ảnh mới
    } else {
      setImagePreview(formData.media_image_url); // Nếu không chọn file, về ảnh cũ
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let finalImageUrl = formData.media_image_url; // Giữ ảnh cũ mặc định

    try {
      // 1. Upload ảnh mới nếu có
      if (selectedFile) {
        const uploadRes = await BannerApi.uploadImage(selectedFile);
        if (uploadRes && uploadRes.url) {
          finalImageUrl = uploadRes.url;
          toast.success("Ảnh mới đã được tải lên thành công!");
        } else {
          toast.error("Lỗi tải ảnh mới lên.");
          setSubmitting(false);
          return;
        }
      }

      // 2. Cập nhật banner
      const bannerData = {
        ...formData,
        media_image_url: finalImageUrl,
        media_order: parseInt(formData.media_order),
        media_is_active: formData.media_is_active ? 1 : 0, // Laravel mong đợi 0 hoặc 1
      };

      const updateRes = await BannerApi.update(id, bannerData);
      if (updateRes && updateRes.data) {
        toast.success("Banner đã được cập nhật thành công!");
        navigate("/admin/banners");
      } else {
        toast.error("Lỗi khi cập nhật banner.");
      }
    } catch (err) {
      console.error("Lỗi cập nhật banner:", err);
      toast.error("Có lỗi xảy ra khi cập nhật banner.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải thông tin banner...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Toaster position="top-right" />
      <main className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Chỉnh Sửa Banner</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tiêu đề Banner */}
          <div>
            <Label htmlFor="media_title" className="block text-sm font-medium text-gray-700">
              Tiêu đề Banner
            </Label>
            <Input
              type="text"
              id="media_title"
              name="media_title"
              value={formData.media_title}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Link chi tiết */}
          <div>
            <Label htmlFor="media_detail_link" className="block text-sm font-medium text-gray-700">
              Liên kết chi tiết (URL)
            </Label>
            <Input
              type="url"
              id="media_detail_link"
              name="media_detail_link"
              value={formData.media_detail_link}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Ngày xuất bản */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="media_publish_from" className="block text-sm font-medium text-gray-700">
                Ngày bắt đầu hiển thị
              </Label>
              <Input
                type="date"
                id="media_publish_from"
                name="media_publish_from"
                value={formData.media_publish_from}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="media_publish_to" className="block text-sm font-medium text-gray-700">
                Ngày kết thúc hiển thị
              </Label>
              <Input
                type="date"
                id="media_publish_to"
                name="media_publish_to"
                value={formData.media_publish_to}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Thứ tự hiển thị */}
          <div>
            <Label htmlFor="media_order" className="block text-sm font-medium text-gray-700">
              Thứ tự hiển thị
            </Label>
            <Input
              type="number"
              id="media_order"
              name="media_order"
              value={formData.media_order}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Hình ảnh Banner */}
          <div>
            <Label htmlFor="media_image" className="block text-sm font-medium text-gray-700">
              Hình ảnh Banner
            </Label>
            <Input
              type="file"
              id="media_image"
              name="media_image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Ảnh hiện tại:</p>
                <img src={imagePreview} alt="Xem trước ảnh" className="max-w-xs h-auto rounded-md shadow" />
              </div>
            )}
          </div>

          {/* Trạng thái hoạt động */}
          <div className="flex items-center">
            <Checkbox
              id="media_is_active"
              name="media_is_active"
              checked={formData.media_is_active}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, media_is_active: checked }))}
              className="mr-2"
            />
            <Label htmlFor="media_is_active" className="text-sm font-medium text-gray-700">
              Hiển thị Banner
            </Label>
          </div>

          {/* Nút gửi */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/banners")}
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Đang cập nhật..." : "Cập nhật Banner"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
