import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "../../../api/authApi";

// Icons
import { FiMail, FiLock } from "react-icons/fi";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State cho Remember me
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }

    setIsLoading(true);
    try {
      const data = await login({ email, password, rememberMe }); // Truyền rememberMe vào API call
      localStorage.removeItem("token");
      sessionStorage.removeItem("token"); // Clear both before setting to ensure no old tokens persist

      if (rememberMe) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
      
      toast.success("Login successful!", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/"); // Chuyển hướng về trang chủ
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container chính: Chia 2 màn hình, fix chiều cao full màn hình
    <div className="flex h-screen w-full bg-white font-sans overflow-hidden">
      <ToastContainer style={{ fontSize: '14px' }} />

      {/* --- PHẦN BÊN TRÁI: FORM LOGIN --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-white relative z-10">
        
        <div className="w-full max-w-sm">
            {/* Logo / Title */}
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Login hire.
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Input Email - Style nền xám (Filled Input) */}
              <div className="relative">
                 <input
                    type="email"
                    className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                 />
              </div>

              {/* Input Password */}
              <div className="relative">
                 <input
                    type="password"
                    className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                 />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                 <label className="flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        className="mr-2 accent-[#20B2AA]" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                 </label>
                 <Link to="/forgot-password" className="hover:text-[#20B2AA] transition-colors">
                    Forgot password?
                 </Link>
              </div>

              {/* Button Login - Bo tròn (Pill shape) */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-6
                  ${isLoading ? "bg-gray-400" : "bg-[#55B4B0] hover:bg-[#48A9A6]"}`} 
                  // Mã màu #55B4B0 là màu xanh ngọc (Teal) giống trong ảnh
              >
                {isLoading ? <CgSpinner className="animate-spin mx-auto text-xl" /> : "Login"}
              </button>
            </form>

            {/* Social Login Section */}
            <div className="mt-8 text-center">
               <p className="text-gray-400 text-sm mb-4">or use your account</p>
               <div className="flex justify-center gap-4">
                  {/* Social Buttons: Tròn, viền xám nhạt */}
                  <a href={`${API_BASE_URL}/auth/facebook/redirect`} className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                     <FaFacebookF size={14} />
                  </a>
                  <a href={`${API_BASE_URL}/auth/google/redirect`} className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                     <FaGoogle size={14} />
                  </a>
                  <a href="#" className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                     <FaLinkedinIn size={14} />
                  </a>
               </div>
            </div>
        </div>
      </div>

      {/* --- PHẦN BÊN PHẢI: BANNER & REGISTER --- */}
      <div className="hidden md:flex w-1/2 bg-[#55B4B0] relative justify-center items-center overflow-hidden">
          
          {/* Họa tiết sóng nước / Background trang trí (CSS vẽ tay hoặc ảnh) */}
          <div className="absolute inset-0 opacity-20">
             {/* Bạn có thể thay url ảnh này bằng ảnh cái thuyền như trong mẫu */}
             <img 
               src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop" 
               alt="Ocean Background" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-[#55B4B0] mix-blend-multiply"></div>
          </div>

          {/* Nội dung Overlay */}
          <div className="relative z-10 text-center text-white px-10">
             <h2 className="text-4xl font-bold mb-4 leading-tight">
                Start your <br/> journey now
             </h2>
             <p className="text-teal-100 mb-8 max-w-xs mx-auto text-sm">
                If you don't have an account yet, join us and start your journey.
             </p>
             
             {/* Nút Register: Trong suốt, Viền trắng, Bo tròn */}
             <Link 
               to="/register" 
               className="inline-block px-10 py-2.5 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-[#55B4B0] transition-all"
             >
                Register &rarr;
             </Link>
          </div>

          {/* Họa tiết trang trí phụ (vòng tròn mờ) */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>

    </div>
  );
}