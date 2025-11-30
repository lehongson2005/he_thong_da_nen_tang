import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../../api/authApi";

// Icons
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      
      toast.success("Account created! Redirecting to login...", {
        autoClose: 2000,
        position: "top-right"
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      toast.error(err.message || "Registration failed.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Container chính: Chia 2 màn hình
    <div className="flex h-screen w-full bg-white font-sans overflow-hidden">
      <ToastContainer style={{ fontSize: '14px' }} />

      {/* --- PHẦN BÊN TRÁI: FORM REGISTER --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-white relative z-10">
        
        <div className="w-full max-w-sm">
            {/* Logo / Title */}
            <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
              Create Account.
            </h1>
            <p className="text-center text-gray-400 text-sm mb-8">
              Sign up to get started with us
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Input Name */}
              <div className="relative">
                 <input
                    type="text"
                    className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                 />
                 <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Input Email */}
              <div className="relative">
                 <input
                    type="email"
                    className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />
                 <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Input Password */}
              <div className="relative">
                 <input
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10 pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                 <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                 
                 {/* Nút ẩn hiện mật khẩu */}
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#20B2AA] focus:outline-none"
                 >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                 </button>
              </div>

              {/* Button Register - Màu xanh ngọc #55B4B0 */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-6
                  ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#55B4B0] hover:bg-[#48A9A6]"}`}
              >
                {isLoading ? <CgSpinner className="animate-spin mx-auto text-xl" /> : "Register"}
              </button>
            </form>

            {/* Social Login Section */}
            <div className="mt-8 text-center">
               <p className="text-gray-400 text-sm mb-4">or sign up with</p>
               <div className="flex justify-center gap-4">
                  <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                     <FaFacebookF size={14} />
                  </button>
                  <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                     <FaGoogle size={14} />
                  </button>
                  <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                     <FaLinkedinIn size={14} />
                  </button>
               </div>
            </div>
            
            {/* Link mobile only */}
            <div className="mt-6 text-center md:hidden">
                <span className="text-gray-500 text-sm">Already have an account? </span>
                <Link to="/login" className="text-[#55B4B0] font-bold text-sm hover:underline">Login here</Link>
            </div>
        </div>
      </div>

      {/* --- PHẦN BÊN PHẢI: BANNER & LINK TO LOGIN --- */}
      <div className="hidden md:flex w-1/2 bg-[#55B4B0] relative justify-center items-center overflow-hidden">
          
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
             <img 
               src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
               alt="Beach Background" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-[#55B4B0] mix-blend-multiply"></div>
          </div>

          {/* Nội dung Overlay */}
          <div className="relative z-10 text-center text-white px-10">
             <h2 className="text-4xl font-bold mb-4 leading-tight">
                Welcome Back!
             </h2>
             <p className="text-teal-100 mb-8 max-w-xs mx-auto text-sm">
                To keep connected with us please login with your personal info.
             </p>
             
             {/* Nút chuyển về Login (Ghost Button) */}
             <Link 
               to="/login" 
               className="inline-block px-10 py-2.5 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-[#55B4B0] transition-all"
             >
                &larr; Login
             </Link>
          </div>

          {/* Họa tiết trang trí */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>

    </div>
  );
}