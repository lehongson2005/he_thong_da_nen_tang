import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Star, 
  Users, 
  Ticket, 
  Search 
} from "lucide-react";

// Mock Data: Sự kiện nổi bật (Giả lập)
const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Tech Summit Vietnam 2025",
    date: "20/11/2025",
    location: "TP. Hồ Chí Minh",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    price: "Miễn phí",
    category: "Công nghệ"
  },
  {
    id: 2,
    title: "Music Festival: Summer Vibes",
    date: "15/07/2025",
    location: "Đà Nẵng",
    image: "https://images.unsplash.com/photo-1459749411177-8c4750bb0e8f?q=80&w=2070&auto=format&fit=crop",
    price: "500.000 VNĐ",
    category: "Âm nhạc"
  },
  {
    id: 3,
    title: "Workshop: Art & Creative",
    date: "05/09/2025",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    price: "200.000 VNĐ",
    category: "Nghệ thuật"
  },
  {
    id: 4,
    title: "Startup Networking Night",
    date: "12/08/2025",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
    price: "Miễn phí",
    category: "Kinh doanh"
  }
];

// Mock Data: Danh mục
const CATEGORIES = [
  { name: "Công nghệ", icon: "💻" },
  { name: "Âm nhạc", icon: "🎵" },
  { name: "Thể thao", icon: "⚽" },
  { name: "Giáo dục", icon: "📚" },
  { name: "Nghệ thuật", icon: "🎨" },
  { name: "Ẩm thực", icon: "🍔" },
];

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra token đơn giản để xem trạng thái đăng nhập
    const token = localStorage.getItem("token");
    if (token) {
      // Giả lập lấy thông tin user (hoặc gọi API thực tế ở đây)
      setUser({
        name: "Bạn", // Có thể thay bằng tên thật từ API
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      });
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {user ? (
              <div className="mb-6 inline-flex items-center bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                <span className="text-sm font-medium text-blue-800">Chào mừng trở lại, {user.name}! 👋</span>
              </div>
            ) : (
               <div className="mb-6 inline-flex items-center bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 shadow-sm">
                <span className="text-sm font-medium text-orange-800">🔥 Sự kiện hot nhất tháng 11 đang diễn ra</span>
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Khám phá & Tham gia <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Sự Kiện Đỉnh Cao
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
              Nền tảng kết nối sự kiện hàng đầu. Tìm kiếm đam mê, kết nối cộng đồng và tạo ra những kỷ niệm đáng nhớ ngay hôm nay.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/search" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Tìm sự kiện ngay
              </Link>
              {!user && (
                <Link 
                  to="/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold rounded-xl shadow-sm transition flex items-center justify-center"
                >
                  Đăng ký tài khoản
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-gray-500 mb-6 uppercase tracking-wider text-center">Khám phá theo chủ đề</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {CATEGORIES.map((cat, idx) => (
                    <Link 
                        key={idx} 
                        to={`/search?category=${cat.name}`}
                        className="flex items-center space-x-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-5 py-3 rounded-full transition-all cursor-pointer group"
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                        <span className="font-medium text-gray-700 group-hover:text-blue-700">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* ================= FEATURED EVENTS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Sự kiện nổi bật</h2>
              <p className="mt-2 text-gray-500">Đừng bỏ lỡ những sự kiện hấp dẫn nhất tuần này</p>
            </div>
            <Link to="/search" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition">
              Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_EVENTS.map((event) => (
              <Link to={`/event/${event.id}`} key={event.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
                    {event.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {event.date}</span>
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-blue-600 font-bold">{event.price}</span>
                    <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform flex items-center">
                        Chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="mt-8 text-center sm:hidden">
             <Link to="/search" className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 w-full justify-center">
                Xem tất cả sự kiện
             </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="p-4">
                    <div className="text-4xl font-extrabold mb-2">10K+</div>
                    <div className="text-blue-200 text-sm font-medium flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-1"/> Sự kiện / Năm
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-4xl font-extrabold mb-2">500K+</div>
                    <div className="text-blue-200 text-sm font-medium flex items-center justify-center">
                        <Users className="w-4 h-4 mr-1"/> Người tham gia
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-4xl font-extrabold mb-2">100+</div>
                    <div className="text-blue-200 text-sm font-medium flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-1"/> Thành phố
                    </div>
                </div>
                <div className="p-4">
                    <div className="text-4xl font-extrabold mb-2">4.9/5</div>
                    <div className="text-blue-200 text-sm font-medium flex items-center justify-center">
                        <Star className="w-4 h-4 mr-1"/> Đánh giá
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sẵn sàng tạo nên sự kiện của riêng bạn?</h2>
            <p className="text-gray-500 mb-10 text-lg">
                Đăng ký ngay để tổ chức sự kiện, quản lý vé và tiếp cận hàng ngàn người tham gia tiềm năng.
            </p>
            <div className="flex justify-center space-x-4">
                 <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition shadow-lg">
                    Tổ chức sự kiện
                 </button>
                 <Link to="/contact" className="px-8 py-3 bg-white text-gray-900 border border-gray-300 font-bold rounded-lg hover:bg-gray-50 transition">
                    Liên hệ tư vấn
                 </Link>
            </div>
        </div>
      </section>

    </div>
  );
}