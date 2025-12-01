import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import Label  from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import Checkbox from "@/components/ui/checkbox.jsx";
import BannerApi from "../../../api/Banner/banner";
import toast, { Toaster } from "react-hot-toast";

export default function AddBanner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    media_title: "",
    media_detail_link: "",
    media_publish_from: "",
    media_publish_to: "",
    media_order: 0,
    media_is_active: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = "";

    try {
      // 1. Upload ảnh
      if (selectedFile) {
        const uploadRes = await BannerApi.uploadImage(selectedFile);
        if (uploadRes && uploadRes.url) {
          imageUrl = uploadRes.url;
          toast.success("Ảnh đã được tải lên thành công!");
        } else {
          toast.error("Lỗi tải ảnh lên.");
          setLoading(false);
          return;
        }
      } else {
        toast.error("Vui lòng chọn một hình ảnh cho banner.");
        setLoading(false);
        return;
      }

      // 2. Tạo banner
      const bannerData = {
        ...formData,
        media_image_url: imageUrl,
        media_order: parseInt(formData.media_order),
      };

      const createRes = await BannerApi.create(bannerData);
      if (createRes && createRes.data) {
        toast.success("Banner đã được tạo thành công!");
        navigate("/admin/banners");
      } else {
        toast.error("Lỗi khi tạo banner.");
      }
    } catch (err) {
      console.error("Lỗi thêm banner:", err);
      toast.error("Có lỗi xảy ra khi thêm banner.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Toaster position="top-right" />
      <main className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Thêm Banner Mới</h2>

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
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <div className="mt-4">
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
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang thêm..." : "Thêm Banner"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
