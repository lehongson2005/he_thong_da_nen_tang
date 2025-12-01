import React from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Mail, User, Phone, CalendarDays, Lock, LogOut } from 'lucide-react'; // Import thêm icon

const AccountInfo = () => {
    const { user, loading, logout } = useAuth(); // Destructure logout from context
    const handleChangePassword = () => {
        // Ví dụ điều hướng đến trang đổi mật khẩu
        window.location.href = "/change-password";
    };

    if (loading) {
        return <div className="text-center py-4">Đang tải thông tin tài khoản...</div>;
    }

    if (!user) {
        return <div className="text-center py-4 text-red-500">Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin tài khoản.</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Thông tin cơ bản</h2>

            {/* Avatar and Name */}
            <div className="flex items-center space-x-4">
                <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                />
                <div>
                    <p className="text-xl font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">Vai trò: {user.role}</p>
                </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                </div>
                {user.phone && (
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <div>
                            <p className="text-xs text-gray-500">Số điện thoại</p>
                            <p className="font-medium text-gray-800">{user.phone}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Other Information */}
            {user.last_login_at && (
                <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <CalendarDays className="w-5 h-5 text-gray-600" />
                    <div>
                        <p className="text-xs text-gray-500">Đăng nhập gần nhất</p>
                        <p className="font-medium text-gray-800">{new Date(user.last_login_at).toLocaleString('vi-VN')}</p>
                    </div>
                </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleChangePassword}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                    <Lock className="w-4 h-4" />
                    Đổi mật khẩu
                </button>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default AccountInfo;
