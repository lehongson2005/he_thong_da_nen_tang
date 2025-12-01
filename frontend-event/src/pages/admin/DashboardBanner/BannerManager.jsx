import React, {useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {Edit2, Trash2, ChevronLeft, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import BannerApi from "../../../api/Banner/banner";
import toast, {Toaster} from "react-hot-toast";

const PLACEHOLDER_IMAGE = "https://placehold.co/60x36/cccccc/333333?text=Banner";

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorUrls, setErrorUrls] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const searchTimeout = useRef(null);

  // --- Lấy banner từ API ---
  const fetchBanners = async (keyword = "", status = "all") => {
    try {
      setLoading(true);
      let data = [];
      if (keyword) {
        data = await BannerApi.search(keyword); // API search
      } else {
        data = await BannerApi.getAll();
      }

      // Lọc theo trạng thái
      if (status !== "all") {
        const isActive = status === "active" ? 1 : 0;
        data = data.filter((b) => b.media_is_active === isActive);
      }

      // Format data
      const formatted = data.map((b) => ({
        id: b.media_id,
        title: b.media_title,
        desc: b.media_detail_link || "Không có mô tả",
        image: b.media_image_url,
        link: b.media_detail_link || "#",
        status: b.media_is_active,
        updated: new Date(b.updated_at).toLocaleDateString("vi-VN"),
      }));

      setBanners(formatted);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Lỗi khi lấy banner:", err);
      toast.error("Không thể tải danh sách banner!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // --- Tìm kiếm (debounce 500ms) ---
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchBanners(value, statusFilter);
    }, 500);
  };

  // --- Lọc trạng thái ---
  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    fetchBanners(search, value);
  };

  // --- Xử lý lỗi ảnh ---
  const handleImageError = (id) => {
    setErrorUrls((prev) => ({...prev, [id]: true}));
  };

  // --- Xóa banner ---
  const handleDelete = async (id, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa banner "${title}" không?`)) return;
    setLoading(true);
    try {
      const result = await BannerApi.delete(id);
      if (result) {
        toast.success(`✅ Banner "${title}" đã xóa thành công.`);
        fetchBanners(search, statusFilter);
        setErrorUrls((prev) => {
          const newErrors = {...prev};
          delete newErrors[id];
          return newErrors;
        });
      } else {
        toast.error("⚠️ Lỗi khi xóa banner.");
      }
    } catch (err) {
      console.error("❌ Lỗi xóa banner:", err);
      toast.error("Có lỗi xảy ra khi xóa banner.");
    } finally {
      setLoading(false);
    }
  };

  // --- Toggle trạng thái ---
  const toggleStatus = async (b) => {
    setLoading(true);
    try {
      const result = await BannerApi.toggleStatus(b.id, b.status === 1);
      if (result) {
        setBanners((prev) =>
            prev.map((item) =>
                item.id === b.id ? {...item, status: b.status === 1 ? 0 : 1} : item
            )
        );
        toast.success("✅ Trạng thái banner đã được cập nhật");
      } else {
        toast.error("❌ Lỗi khi thay đổi trạng thái");
      }
    } catch (err) {
      console.error("❌ Lỗi khi toggle trạng thái:", err);
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái");
    } finally {
      setLoading(false);
    }
  };


  // --- Phân trang ---
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBanners = banners.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(banners.length / itemsPerPage);

  const pageNumbersToShow = 5;
  let startPage = Math.max(currentPage - Math.floor(pageNumbersToShow / 2), 1);
  let endPage = startPage + pageNumbersToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - pageNumbersToShow + 1, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);


  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Đang tải banner...</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <Toaster position="top-right"/>
        <main className="max-w-6xl mx-auto mt-6 bg-white rounded-2xl shadow p-4 md:p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
            <div>
              <h2 className="text-lg md:text-xl font-semibold">Quản lý banner</h2>
              <p className="text-sm text-gray-500">Quản lý và theo dõi tất cả banner</p>
            </div>
            <Link to="/admin/banners/add">
              <Button className="w-full md:w-auto">+ Thêm banner</Button>
            </Link>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
            <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề banner..."
                value={search}
                onChange={handleSearchChange}
                className="border px-4 py-2 rounded-md w-full sm:w-72 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition duration-150 text-sm md:text-base"
            />
            <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
                value={statusFilter}
                onChange={handleStatusChange}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hiển thị</option>
              <option value="inactive">Ẩn</option>
            </select>
          </div>

          {/* Bảng banner */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg table-auto">
              <thead className="bg-gray-100">
              <tr>
                <th className="p-2 md:p-3 text-left w-10"><input type="checkbox"/></th>
                <th className="p-2 md:p-3 text-left w-1/4">Tiêu đề</th>
                <th className="p-2 md:p-3 text-left w-24">Ảnh banner</th>
                <th className="p-2 md:p-3 text-left">Link</th>
                <th className="p-2 md:p-3 text-center w-24">Trạng thái</th>
                <th className="p-2 md:p-3 text-center w-28 hidden sm:table-cell">Ngày cập nhật</th>
                <th className="p-2 md:p-3 text-center w-20">Hành động</th>
              </tr>
              </thead>
              <tbody>
              {currentBanners.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-gray-50 align-top">
                    <td className="p-2 md:p-3"><input type="checkbox"/></td>
                    <td className="p-2 md:p-3">{b.title}</td>
                    <td className="p-2 md:p-3">
                      <img
                          src={errorUrls[b.id] || !b.image ? PLACEHOLDER_IMAGE : b.image}
                          alt={b.title || "banner"}
                          onError={() => handleImageError(b.id)}
                          className="w-14 h-9 rounded object-cover border border-gray-200"
                      />
                    </td>
                    <td className="p-2 md:p-3 text-blue-600 underline break-words max-w-[150px] sm:max-w-xs">
                      <a href={b.link} target="_blank" rel="noreferrer">{b.link}</a>
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      {/* Giữ switch trượt như cũ */}
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={b.status}
                            onChange={() => toggleStatus(b)}
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-checked:bg-indigo-600 rounded-full relative transition-colors duration-300">
                          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${b.status ? "translate-x-6" : "translate-x-0"}`}></span>
                        </div>
                      </label>
                    </td>
                    <td className="p-2 md:p-3 text-center hidden sm:table-cell">{b.updated}</td>
                    <td className="p-2 md:p-3">
                      <div className="flex justify-center items-center space-x-2">
                        <Link to={`/admin/banners/edit/${b.id}`} className="text-blue-600 hover:text-blue-800 flex items-center" title="Chỉnh sửa">
                          <Edit2 size={18}/>
                        </Link>
                        <button
                            className="text-red-600 hover:text-red-800 flex items-center"
                            onClick={() => handleDelete(b.id, b.title)}
                            disabled={loading}
                            title="Xóa"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>

          {/* Pagination cố định góc phải dưới */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500 flex-wrap">
      <span className="mb-2 sm:mb-0">
        Hiển thị {indexOfFirst + 1}–{Math.min(indexOfLast, banners.length)} trong {banners.length} kết quả
      </span>
            <div className="ml-auto flex items-center space-x-1 md:space-x-2 flex-shrink-0">
              <button
                  className="p-1 md:p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16}/>
              </button>
              {pages.map((i) => (
                  <button
                      key={i}
                      className={`px-2 md:px-3 py-1 border rounded ${currentPage === i ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`}
                      disabled={currentPage === i}
                      onClick={() => setCurrentPage(i)}
                  >
                    {i}
                  </button>
              ))}
              <button
                  className="p-1 md:p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={16}/>
              </button>
            </div>
          </div>

        </main>
      </div>


  );
}
