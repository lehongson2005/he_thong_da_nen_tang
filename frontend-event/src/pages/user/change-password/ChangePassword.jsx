import { useState } from "react";
import { Link } from "react-router-dom"; // Giả sử có React Router
import { changePassword } from "../../../api/authApi";

// Icons
import { FiLock, FiKey, FiEye, FiEyeOff, FiSave, FiShield, FiArrowLeft } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentPassword || !password || !passwordConfirmation) {
        toast.warning("Please fill in all fields!");
        return;
    }

    if (password !== passwordConfirmation) {
      toast.error("New passwords do not match.");
      return;
    }

    if (password.length < 6) {
        toast.warning("Password must be at least 6 characters.");
        return;
    }

    setIsLoading(true);

    try {
      const data = await changePassword({ 
          current_password: currentPassword, 
          password, 
          password_confirmation: passwordConfirmation 
      });
      
      toast.success(data.message || "Password changed successfully!");
      
      // Reset form
      setCurrentPassword("");
      setPassword("");
      setPasswordConfirmation("");
      
    } catch (error) {
      toast.error(error.message || "Failed to change password. Check current password.");
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
            <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
              Change Password
            </h1>
            <p className="text-center text-gray-400 text-sm mb-8">
              Create a new strong password for your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Current Password */}
                <div className="relative">
                    <input
                        type={showCurrent ? "text" : "password"}
                        className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10 pr-10"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#20B2AA]">
                        {showCurrent ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {/* 2. New Password */}
                <div className="relative">
                    <input
                        type={showNew ? "text" : "password"}
                        className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10 pr-10"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#20B2AA]">
                        {showNew ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {/* 3. Confirm Password */}
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        className="w-full bg-gray-100 text-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20B2AA] transition-all placeholder-gray-400 pl-10 pr-10"
                        placeholder="Confirm New Password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#20B2AA]">
                        {showConfirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>

                {/* Button Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-6
                    ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#55B4B0] hover:bg-[#48A9A6]"}`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                             <CgSpinner className="animate-spin text-xl mr-2" />
                             Updating...
                        </div>
                    ) : (
                        "Update Password"
                    )}
                </button>
            </form>

            {/* Back Button */}
            <div className="mt-8 text-center">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-[#55B4B0] transition-colors font-medium">
                    <FiArrowLeft className="mr-2" />
                    Back to Dashboard
                </Link>
            </div>
        </div>
      </div>

      {/* --- PHẦN BÊN PHẢI: BANNER --- */}
      <div className="hidden md:flex w-1/2 bg-[#55B4B0] relative justify-center items-center overflow-hidden">
          
          {/* Background Image - Chọn ảnh chủ đề Bảo vệ/Khiên */}
          <div className="absolute inset-0 opacity-20">
             <img 
               src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop" 
               alt="Digital Security" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-[#55B4B0] mix-blend-multiply"></div>
          </div>

          <div className="relative z-10 text-center text-white px-10">
             <div className="bg-white/20 p-4 rounded-full inline-block mb-6 backdrop-blur-sm">
                 <FiShield className="text-4xl text-white" />
             </div>
             <h2 className="text-4xl font-bold mb-4 leading-tight">
                Secure your account
             </h2>
             <p className="text-teal-100 max-w-xs mx-auto text-sm leading-relaxed">
                Regularly updating your password helps keep your account and data safe.
             </p>
          </div>

          {/* Họa tiết trang trí */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
      </div>

    </div>
  );
}