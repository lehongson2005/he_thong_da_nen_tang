import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowUp, 
  Target, 
  Heart, 
  Users, 
  Globe, 
  Sparkles, 
  Award 
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Đảm bảo bạn đã có component này hoặc thay bằng thẻ <button> thường

const AboutPage = () => {
  // --- 1. LOGIC SCROLL TO TOP ---
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- 2. HIỆU ỨNG ANIMATION ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden relative">
      
      {/* Thanh tiến trình đọc bài viết (Progress Bar trên cùng) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Team working" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 border border-blue-400 text-blue-300 text-sm font-semibold mb-6 backdrop-blur-md">
              Hành trình kiến tạo tương lai
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Chúng tôi là <span className="text-blue-500">ETDC</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Nền tảng kết nối sự kiện hàng đầu, nơi đam mê gặp gỡ cơ hội. Chúng tôi không chỉ tổ chức sự kiện, chúng tôi tạo ra những khoảnh khắc đáng nhớ.
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
        >
            <span className="text-sm">Cuộn xuống để khám phá</span>
            <div className="w-px h-12 bg-white/30 mx-auto mt-2"></div>
        </motion.div>
      </section>

      {/* ================= CÂU CHUYỆN CỦA CHÚNG TÔI ================= */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Câu chuyện khởi đầu</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Được thành lập vào năm 2020, xuất phát từ một ý tưởng đơn giản: <em className="text-blue-600 font-medium">"Làm sao để việc tìm kiếm và tham gia sự kiện trở nên dễ dàng hơn?"</em>.
              </p>
              <p>
                Chúng tôi nhận thấy rằng có hàng ngàn sự kiện tuyệt vời diễn ra mỗi ngày nhưng lại thiếu vắng người tham dự chỉ vì thông tin không được lan tỏa. ETDC ra đời để lấp đầy khoảng trống đó.
              </p>
              <p>
                Từ một nhóm nhỏ 3 người trong một quán cà phê, giờ đây chúng tôi đã phát triển thành một cộng đồng lớn mạnh, kết nối hàng triệu người với những trải nghiệm thay đổi cuộc sống.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 flex gap-8">
                <div>
                    <h4 className="text-3xl font-bold text-blue-600">5+</h4>
                    <span className="text-gray-500">Năm kinh nghiệm</span>
                </div>
                <div>
                    <h4 className="text-3xl font-bold text-blue-600">10k+</h4>
                    <span className="text-gray-500">Sự kiện thành công</span>
                </div>
                <div>
                    <h4 className="text-3xl font-bold text-blue-600">1M+</h4>
                    <span className="text-gray-500">Người dùng</span>
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Story" 
              className="relative rounded-2xl shadow-2xl z-10 hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= SỨ MỆNH & TẦM NHÌN (CARDS) ================= */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative BG */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-[10%] right-[0%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Giá trị cốt lõi</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Những nguyên tắc định hình văn hóa và cách chúng tôi phục vụ cộng đồng.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: <Target className="w-10 h-10 text-blue-600" />, 
                title: "Tầm nhìn", 
                desc: "Trở thành hệ sinh thái sự kiện số 1 khu vực, nơi mọi ý tưởng đều có sân khấu để tỏa sáng." 
              },
              { 
                icon: <Heart className="w-10 h-10 text-red-500" />, 
                title: "Tận tâm", 
                desc: "Chúng tôi đặt khách hàng làm trọng tâm, phục vụ bằng cả trái tim và sự nhiệt huyết." 
              },
              { 
                icon: <Sparkles className="w-10 h-10 text-yellow-500" />, 
                title: "Sáng tạo", 
                desc: "Không ngừng đổi mới công nghệ để mang lại trải nghiệm mượt mà và độc đáo nhất." 
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6 p-4 bg-gray-50 rounded-xl inline-block">
                    {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= ĐỘI NGŨ (TEAM) ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gặp gỡ những người dẫn đầu</h2>
            <p className="text-gray-500">Đội ngũ tài năng đứng sau sự thành công của ETDC</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
                { name: "Nguyễn Văn A", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" },
                { name: "Trần Thị B", role: "Head of Marketing", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" },
                { name: "Lê Văn C", role: "CTO / Tech Lead", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
                { name: "Phạm Thị D", role: "Event Manager", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" },
            ].map((member, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                >
                    <div className="aspect-[3/4] overflow-hidden">
                        <img 
                            src={member.img} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                    {/* Overlay thông tin */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.name}</h3>
                        <p className="text-blue-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.role}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* ================= CTA (CALL TO ACTION) ================= */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng tham gia cùng chúng tôi?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                    Đừng bỏ lỡ cơ hội khám phá những sự kiện tuyệt vời hoặc tổ chức sự kiện của riêng bạn ngay hôm nay.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-xl shadow-xl">
                        Bắt đầu ngay
                    </Button>
                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold rounded-xl bg-transparent">
                        Liên hệ tư vấn
                    </Button>
                </div>
            </motion.div>
        </div>
      </section>

      {/* ================= SCROLL TO TOP BUTTON ================= */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-colors focus:outline-none"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}

    </div>
  );
};

export default AboutPage;