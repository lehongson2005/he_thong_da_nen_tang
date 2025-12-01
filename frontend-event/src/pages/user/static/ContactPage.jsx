import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";

// 🔐 CẤU HÌNH EMAILJS (Nên đưa vào biến môi trường .env)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_demo";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_demo";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "user_demo";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Khởi tạo hiệu ứng cuộn AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
    AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const loadingToast = toast.loading("Đang gửi tin nhắn... ⏳");

    try {
      // Gửi email qua EmailJS
      // Lưu ý: Nếu chưa cấu hình key thật, bước này sẽ lỗi hoặc không gửi được
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);

      setStatus("success");
      toast.dismiss(loadingToast);
      toast.success("✅ Gửi thành công! Chúng tôi sẽ phản hồi sớm.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.dismiss(loadingToast);
      toast.error("❌ Gửi thất bại. Vui lòng thử lại sau!");
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={32} />,
      title: "Email",
      info: "contact@tdc.edu.vn",
      link: "mailto:contact@tdc.edu.vn"
    },
    {
      icon: <Phone size={32} />,
      title: "Điện thoại",
      info: "(028) 3896 6825",
      link: "tel:02838966825"
    },
    {
      icon: <MapPin size={32} />,
      title: "Địa chỉ",
      info: "53 Võ Văn Ngân, P. Linh Chiểu, TP. Thủ Đức, TP. HCM",
      link: "https://goo.gl/maps/xyz" // Link demo
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4 font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* --- 1. HEADER --- */}
        <div data-aos="fade-down" className="text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Liên hệ với chúng tôi 💬
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Nếu bạn là sinh viên cần hỗ trợ hoặc có thắc mắc về sự kiện, vui lòng gửi tin nhắn qua form bên dưới hoặc liên hệ trực tiếp.
          </p>
        </div>

        {/* --- 2. INFO CARDS --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((item, i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 150}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-default"
            >
              <div className="flex justify-center mb-5 text-blue-600 bg-blue-50 w-20 h-20 rounded-full items-center mx-auto">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 font-medium">{item.info}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
            {/* --- 3. FORM GỬI TIN NHẮN --- */}
            <div
              data-aos="fade-right"
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Send className="w-6 h-6 text-blue-600" />
                Gửi tin nhắn
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                        <Input
                            name="name"
                            placeholder="Nguyễn Văn A"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Chủ đề</label>
                    <Input
                        name="subject"
                        placeholder="Vấn đề cần hỗ trợ..."
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nội dung</label>
                    <Textarea
                        name="message"
                        placeholder="Chi tiết nội dung tin nhắn..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[150px] bg-gray-50 border-gray-200 focus:bg-white transition-colors resize-none"
                    />
                </div>

                <div className="pt-2">
                  <Button
                    variant="default"
                    size="lg"
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-blue-300"
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      animate={status === "sending" ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        repeat: status === "sending" ? Infinity : 0,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      {status === "sending" ? null : <Send size={20} />}
                    </motion.div>
                    {status === "sending" ? "Đang gửi..." : "Gửi ngay"}
                  </Button>
                </div>
              </form>
            </div>

            {/* --- 4. GOOGLE MAPS --- */}
            <div
              data-aos="fade-left"
              className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full min-h-[400px]"
            >
              <iframe
                title="Vị trí Trường Cao đẳng Công nghệ Thủ Đức"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4749789205885!2d106.75548917485803!3d10.851432489301876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752797e321f8e9%3A0xb3ff69197b10ec4f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEPDtG5nIG5naOG7hyBUaOG7pyDEkOG7qWM!5e0!3m2!1svi!2s!4v1761918720346!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover"
              ></iframe>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
