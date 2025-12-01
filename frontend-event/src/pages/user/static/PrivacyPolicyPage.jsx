import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  ArrowUp, 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  Database, 
  Cookie, 
  Mail 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
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
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- 2. DỮ LIỆU CHÍNH SÁCH ---
  const policies = [
    {
      id: "collection",
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "1. Thu thập thông tin",
      content: [
        "Chúng tôi thu thập thông tin cá nhân mà bạn cung cấp trực tiếp khi đăng ký tài khoản, tham gia sự kiện hoặc liên hệ hỗ trợ.",
        "Các thông tin bao gồm: Họ tên, Email, Số điện thoại, và các thông tin thanh toán khi bạn mua vé.",
        "Thông tin thiết bị (IP, trình duyệt) được thu thập tự động để cải thiện trải nghiệm và bảo mật."
      ]
    },
    {
      id: "usage",
      icon: <FileText className="w-8 h-8 text-green-600" />,
      title: "2. Sử dụng thông tin",
      content: [
        "Cung cấp, vận hành và duy trì dịch vụ của chúng tôi.",
        "Gửi thông báo về vé, sự kiện mới hoặc thay đổi lịch trình.",
        "Phát hiện và ngăn chặn các hành vi gian lận, lạm dụng.",
        "Cá nhân hóa trải nghiệm người dùng dựa trên sở thích và lịch sử tham gia."
      ]
    },
    {
      id: "security",
      icon: <Lock className="w-8 h-8 text-red-600" />,
      title: "3. Bảo mật dữ liệu",
      content: [
        "Chúng tôi cam kết bảo vệ dữ liệu của bạn bằng các biện pháp an ninh tiên tiến nhất (mã hóa SSL, tường lửa).",
        "Dữ liệu thanh toán được xử lý bởi các đối tác cổng thanh toán uy tín, chúng tôi không lưu trữ thông tin thẻ đầy đủ.",
        "Tuy nhiên, không có phương thức truyền tải nào qua Internet là an toàn 100%, chúng tôi luôn nỗ lực tối đa để bảo vệ bạn."
      ]
    },
    {
      id: "sharing",
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      title: "4. Chia sẻ thông tin",
      content: [
        "Chúng tôi KHÔNG bán thông tin cá nhân của bạn cho bên thứ ba.",
        "Thông tin chỉ được chia sẻ với các nhà tổ chức sự kiện khi bạn đăng ký tham gia sự kiện của họ (để check-in).",
        "Chia sẻ khi có yêu cầu từ cơ quan pháp luật hoặc để bảo vệ quyền lợi hợp pháp của ETDC."
      ]
    },
    {
      id: "cookies",
      icon: <Cookie className="w-8 h-8 text-orange-600" />,
      title: "5. Cookies & Tracking",
      content: [
        "Chúng tôi sử dụng Cookies để ghi nhớ trạng thái đăng nhập và các tùy chọn của bạn.",
        "Bạn có thể tùy chỉnh trình duyệt để từ chối Cookies, nhưng một số tính năng của website có thể không hoạt động chính xác."
      ]
    }
  ];

  // --- 3. HIỆU ỨNG ANIMATION ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      
      {/* Thanh tiến trình đọc */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Abstract */}
        <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/security.png')]"></div>
             <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] bg-blue-600/30 rounded-full blur-[120px]"></div>
             <div className="absolute bottom-[0%] right-[0%] w-[60%] h-[60%] bg-purple-600/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-2xl">
                <Shield className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Chính Sách Bảo Mật
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Chúng tôi trân trọng sự tin tưởng của bạn. Dưới đây là cách chúng tôi thu thập, bảo vệ và sử dụng thông tin cá nhân của bạn tại ETDC.
            </p>
            <div className="mt-8 text-sm text-slate-400">
                Cập nhật lần cuối: <span className="text-white font-medium">01/01/2025</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-20 relative z-20">
        <div className="space-y-8">
            {policies.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                    <div className="flex items-start gap-6">
                        <div className="hidden sm:flex flex-shrink-0 w-16 h-16 bg-gray-50 rounded-2xl items-center justify-center">
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <span className="sm:hidden">{item.icon}</span>
                                {item.title}
                            </h2>
                            <ul className="space-y-3">
                                {item.content.map((text, i) => (
                                    <li key={i} className="flex items-start text-gray-600 text-lg leading-relaxed">
                                        <span className="mr-3 mt-2 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Bạn vẫn còn thắc mắc?</h2>
                  <p className="text-gray-500 mb-8 text-lg">
                      Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, đừng ngần ngại liên hệ với chúng tôi.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg">
                          Gửi Email Hỗ Trợ
                      </Button>
                      <Button variant="outline" className="border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl">
                          Trung Tâm Trợ Giúp
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
          className="fixed bottom-8 right-8 z-50 p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl transition-colors focus:outline-none ring-4 ring-white/20"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}

    </div>
  );
};

export default PrivacyPolicyPage;