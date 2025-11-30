import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../../api/authApi";

// Icons
import { FiMail, FiLock, FiKey, FiArrowLeft, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgotPassword() {
  const [step, setStep] = useState('request'); // 'request' | 'reset' | 'done'
  
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Xử lý gửi email ---
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.warning("Please enter your email!");

    setIsLoading(true);
    try {
      const data = await forgotPassword(email);
      toast.success(data.message || "OTP sent to your email!", { autoClose: 2000 });
      setStep('reset');
    } catch (error) {
      toast.error(error.message || "Email not found.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Xử lý đổi mật khẩu ---
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!token || !password || !passwordConfirmation) {
        toast.warning("Please fill in all fields!");
        return;
    }
    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await resetPassword({ email, token, password, password_confirmation: passwordConfirmation });
      toast.success(data.message || "Password reset successful!");
      setStep('done');
    } catch (error) {
      toast.error(error.message || "Invalid OTP or expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans overflow-hidden">
      <ToastContainer style={{ fontSize: '14px' }} />

      {/* --- PHẦN BÊN TRÁI: FORM --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-white relative z-10">
        
        <div className="w-full max-w-sm">
            
            {/* --- STEP 1: REQUEST OTP --- */}
            {step === 'request' && (
                <>
                    <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
                        Forgot Password?
                    </h1>
                    <p className="text-center text-gray-400 text-sm mb-8">
                        Enter your email details to recover your password.
                    </p>

                    <form onSubmit={handleRequestSubmit} className="space-y-4">
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-4
                            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#55B4B0] hover:bg-[#48A9A6]"}`}
                        >
                            {isLoading ? <CgSpinner className="animate-spin mx-auto text-xl" /> : "Recover Password"}
                        </button>
                    </form>
                </>
            )}

            {/* --- STEP 2: RESET FORM --- */}
            {step === 'reset' && (
                <>
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
                        Reset Password
                    </h1>
                    <div className="text-center mb-6">
                        <span className="text-xs font-semibold bg-teal-50 text-teal-600 px-3 py-1 rounded-full">
                            {email}
                        </span>
                        <p className="text-gray-400 text-xs mt-2">Enter the OTP sent to your email.</p>
                    </div>

                    <form onSubmit={handleResetSubmit} className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10"
                                placeholder="OTP Code"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                            <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10 pr-10"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#20B2AA]">
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type={showConfirmPass ? "text" : "password"}
                                className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10 pr-10"
                                placeholder="Confirm Password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#20B2AA]">
                                {showConfirmPass ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-4
                            ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#55B4B0] hover:bg-[#48A9A6]"}`}
                        >
                            {isLoading ? <CgSpinner className="animate-spin mx-auto text-xl" /> : "Set New Password"}
                        </button>
                    </form>
                </>
            )}

            {/* --- STEP 3: SUCCESS --- */}
            {step === 'done' && (
                <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiCheckCircle className="text-4xl text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">All Done!</h2>
                    <p className="text-gray-500 mb-8">Your password has been reset successfully.</p>
                    <Link 
                        to="/login"
                        className="block w-full py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-[#55B4B0] hover:bg-[#48A9A6]"
                    >
                        Back to Login
                    </Link>
                </div>
            )}

            {/* Link Back - Luôn hiển thị trừ khi đã xong */}
            {step !== 'done' && (
                <div className="mt-8 text-center">
                    <Link to="/login" className="inline-flex items-center text-gray-500 hover:text-[#55B4B0] transition-colors font-medium">
                        <FiArrowLeft className="mr-2" />
                        Back to Login
                    </Link>
                </div>
            )}
        </div>
      </div>

      {/* --- PHẦN BÊN PHẢI: BANNER --- */}
      <div className="hidden md:flex w-1/2 bg-[#55B4B0] relative justify-center items-center overflow-hidden">
          
          {/* Background Image - Chọn ảnh chủ đề Bảo mật/Khóa */}
          <div className="absolute inset-0 opacity-20">
             <img 
               src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop" 
               alt="Security Lock" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-[#55B4B0] mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 text-center text-white px-10">
             <h2 className="text-4xl font-bold mb-4 leading-tight">
                Don't worry!
             </h2>
             <p className="text-teal-100 max-w-xs mx-auto text-sm leading-relaxed">
                It happens to the best of us. We'll help you recover your account in no time.
             </p>
          </div>

          {/* Họa tiết trang trí */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>

    </div>
  );
}