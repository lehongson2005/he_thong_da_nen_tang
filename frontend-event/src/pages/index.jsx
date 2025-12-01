import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// 1. Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// 2. Import Swiper modules (Autoplay, Navigation, Pagination)
// Lưu ý: Nếu bạn dùng Swiper phiên bản cũ (< v9), hãy đổi thành: import { Autoplay, Navigation, Pagination } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// 3. Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Star, 
  Users, 
  Search, 
  Moon, 
  Sun,
  Clock
} from "lucide-react";

import BannerApi from "../api/Banner/banner.js";

// --- MOCK DATA ---
const ALL_EVENTS = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: i % 2 === 0 ? `Sự kiện Lịch Dương ${i + 1}` : `Lễ Hội Lịch Âm ${i + 1}`,
    date: i % 2 === 0 ? `20/${10 + (i%2)}/2025` : `15/${1 + (i%12)} (ÂL)`,
    type: i % 2 === 0 ? 'solar' : 'lunar',
    location: i % 3 === 0 ? "Hà Nội" : (i % 3 === 1 ? "Đà Nẵng" : "TP.HCM"),
    image: i % 2 === 0 
        ? `https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop`
        : `https://images.unsplash.com/photo-1533230676269-0744ebc4535c?q=80&w=2070&auto=format&fit=crop`,
    price: i % 5 === 0 ? "Miễn phí" : `${(i + 1) * 50}.000 VNĐ`,
    category: i % 2 === 0 ? "Công nghệ" : "Văn hóa"
}));

const NEWEST_EVENTS = ALL_EVENTS.slice(0, 5);

export default function Index() {
  const [user, setUser] = useState(null);
  const [activeBanner, setActiveBanner] = useState(null);
  
  const [activeTab, setActiveTab] = useState('solar');
  const [visibleCount, setVisibleCount] = useState(6);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // 1. Fetch active banner
    const fetchBanner = async () => {
        try {
            const activeBanners = await BannerApi.getActive();
            // Kiểm tra xem activeBanners có dữ liệu không trước khi set
            if (activeBanners && activeBanners.length > 0) {
                setActiveBanner(activeBanners[0]);
            }
        } catch (error) {
            console.error("Failed to fetch active banner", error);
        }
    };

    // 2. Kiểm tra user (Giả lập)
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        name: "Bạn",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      });
    }

    // 3. Lọc sự kiện
    const filtered = ALL_EVENTS.filter(ev => ev.type === activeTab);
    setFilteredEvents(filtered);
    setVisibleCount(6);

    fetchBanner();
  }, [activeTab]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* ================= 1. HERO BANNER ================= */}
      <section className="relative bg-white overflow-hidden h-[500px] flex items-center">
        {activeBanner ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{ backgroundImage: `url(${activeBanner.media_image_url})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ) : (
          <>
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-80"></div>
          </>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto">
            
            {activeBanner ? (
              // --- GIAO DIỆN KHI CÓ BANNER ---
              <>
                  <div className="inline-block px-4 py-1 mb-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium animate-fade-in-up">
                      🔥 Sự kiện nổi bật
                  </div>
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                    {activeBanner.media_title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed drop-shadow-md">
                     {activeBanner.media_description || "Khám phá ngay sự kiện hot nhất đang diễn ra!"}
                  </p>
              </>
            ) : (
              // --- GIAO DIỆN MẶC ĐỊNH ---
              <>
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
                  Nền tảng kết nối sự kiện hàng đầu. Tìm kiếm đam mê, kết nối cộng đồng và tạo ra những kỷ niệm đáng nhớ.
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to={activeBanner ? activeBanner.media_detail_link : "/search"}
                // target={activeBanner ? "_blank" : "_self"}
                className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl shadow-lg transition transform hover:-translate-y-1 flex items-center justify-center
                    ${activeBanner 
                        ? 'bg-white text-blue-900 hover:bg-gray-100' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/30'
                    }`}
              >
                <Search className="w-5 h-5 mr-2" />
                {activeBanner ? 'Xem chi tiết' : 'Tìm sự kiện ngay'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. NEWEST EVENTS SLIDER (CHẠY CHẠY) ================= */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-600" />
                    Mới nhất vừa lên sóng
                </h2>
            </div>

            <Swiper
                // Đảm bảo modules được truyền vào đây
                modules={[Autoplay, Navigation, Pagination]} 
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                className="pb-10 px-2"
            >
                {NEWEST_EVENTS.map((event) => (
                    <SwiperSlide key={event.id}>
                        <Link to={`/event/${event.id}`} className="block group h-full">
                            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                    NEW
                                </div>
                            </div>
                            <div className="mt-3">
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" /> {event.date}
                                </p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
      </section>

      {/* ================= 3. MAIN EVENTS LIST ================= */}
      <section className="py-20 bg-gray-50" id="events-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Khám phá sự kiện</h2>
              <p className="mt-2 text-gray-500">Lựa chọn loại lịch phù hợp với nhu cầu của bạn</p>
            </div>
            
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-gray-200 flex">
                <button 
                    onClick={() => setActiveTab('solar')}
                    className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        activeTab === 'solar' 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <Sun className="w-4 h-4 mr-2" />
                    Sự kiện Lịch Dương
                </button>
                <button 
                    onClick={() => setActiveTab('lunar')}
                    className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                        activeTab === 'lunar' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    <Moon className="w-4 h-4 mr-2" />
                    Sự kiện Lịch Âm
                </button>
            </div>
          </div>

          {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.slice(0, visibleCount).map((event) => (
                  <Link to={`/event/${event.id}`} key={event.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full animate-in fade-in zoom-in duration-500">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-blue-600 shadow-sm">
                        {event.category}
                      </div>
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-sm flex items-center ${event.type === 'lunar' ? 'bg-indigo-500' : 'bg-orange-500'}`}>
                         {event.type === 'lunar' ? <Moon className="w-3 h-3 mr-1" /> : <Sun className="w-3 h-3 mr-1" />}
                         {event.type === 'lunar' ? 'Âm lịch' : 'Dương lịch'}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                        <span className="flex items-center font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            <Calendar className="w-3 h-3 mr-1" /> {event.date}
                        </span>
                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-blue-600 font-bold text-lg">{event.price}</span>
                        <span className="text-sm font-medium text-gray-400 group-hover:translate-x-1 transition-transform flex items-center group-hover:text-blue-600">
                            Chi tiết <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
          ) : (
             <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                 <p className="text-gray-500">Chưa có sự kiện nào trong danh mục này.</p>
             </div>
          )}

          {visibleCount < filteredEvents.length && (
            <div className="mt-12 text-center">
                <button 
                    onClick={handleLoadMore}
                    className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    Xem thêm sự kiện
                    <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                </button>
                <p className="mt-3 text-sm text-gray-400">
                    Đang hiển thị {Math.min(visibleCount, filteredEvents.length)} trên tổng số {filteredEvents.length} sự kiện
                </p>
            </div>
          )}

        </div>
      </section>

      {/* ================= 4. STATS SECTION ================= */}
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

    </div>
  );
}