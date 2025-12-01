import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// --- IMPORTS CÁC TRANG (PAGES) ---
import Login from "./pages/user/login/login.jsx";
import Register from "./pages/user/login/register.jsx";
import Index from "./pages/index.jsx";
import ForgotPassword from "./pages/user/forgot-password/ForgotPassword.jsx";
import ChangePassword from "./pages/user/change-password/ChangePassword.jsx";
import AuthCallback from "./pages/auth/Callback.jsx";
import ContactPage from "./pages/user/static/ContactPage.jsx";
import AboutPage from "./pages/user/static/AboutPage.jsx";
import CareersPage from "./pages/user/static/CareersPage.jsx";
import PrivacyPolicyPage from "./pages/user/static/PrivacyPolicyPage.jsx";

// --- IMPORTS USER PAGES ---
import Profile from "./pages/user/Profile.jsx"; // Import Profile component
import AccountInfo from "./pages/user/AccountInfo.jsx"; // Import AccountInfo component
import NotFoundPage from "./pages/NotFoundPage.jsx"; // Import NotFoundPage

// --- IMPORTS ADMIN PAGES ---
import BannerManager from "./pages/admin/DashboardBanner/BannerManager.jsx";
import AddBanner from "./pages/admin/DashboardBanner/AddBanner.jsx";
import EditBanner from "./pages/admin/DashboardBanner/EditBanner.jsx";


// --- IMPORTS LAYOUTS (HEADER & FOOTER) ---
// Đảm bảo đường dẫn import đúng với thư mục máy bạn
import Header from "./layouts/user/hearder.jsx";
import Footer from "./layouts/user/footer.jsx";
import AdminLayout from "./layouts/admin/AdminLayout.jsx"; // Import AdminLayout
import AdminRoute from "./components/AdminRoute.jsx"; // Import AdminRoute

// --- CẤU HÌNH LAYOUT CHÍNH (CÓ HEADER + FOOTER) ---
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn nằm trên cùng */}
      <Header />
      
      {/* Phần nội dung thay đổi (Outlet) sẽ co giãn để đẩy Footer xuống dưới */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer luôn nằm dưới cùng */}
      <Footer />
    </div>
  );
};

// --- CẤU HÌNH AUTH LAYOUT (KHÔNG HEADER/FOOTER) ---
// Dành cho Login, Register... để hiển thị full màn hình Split Screen
const AuthLayout = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      <Outlet />
    </div>
  );
};

export default function App() {
  return (
    
      <Routes>
        
        {/* ========================================================= */}
        {/* NHÓM 1: CÁC TRANG AUTH (KHÔNG CÓ HEADER/FOOTER)           */}
        {/* ========================================================= */}
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        {/* ========================================================= */}
        {/* NHÓM 2: CÁC TRANG CHÍNH (CÓ HEADER + FOOTER)              */}
        {/* ========================================================= */}
        <Route element={<MainLayout />}>
            {/* Trang chủ */}
            <Route path="/" element={<Index />} />
            
            {/* Các trang chức năng bên trong */}
            
            <Route path="/search" element={<div className="p-10">Trang tìm kiếm</div>} />
            <Route path="/calendar" element={ <div className="p-10">Lịch Vạn Niên</div>} />
            <Route path="/notifications" element={<div className="p-10">Tất cả thông báo</div>} />

            {/* Static Pages */}
            <Route path="/events" element={<div className="p-10">Trang Tất Cả Sự Kiện</div>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<Profile />}>
                <Route index element={<AccountInfo />} /> {/* Default to AccountInfo */}
                <Route path="account" element={<AccountInfo />} />
                  </Route>
        </Route>

        {/* ========================================================= */}
        {/* NHÓM 3: ADMIN ROUTES (SỬ DỤNG ADMIN LAYOUT)              */}
        {/* ========================================================= */}
        <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<div className="p-10">Admin Dashboard Content</div>} /> {/* Default admin page */}
                <Route path="dashboard" element={<div className="p-10">Admin Dashboard Content</div>} />
                <Route path="users" element={<div className="p-10">User Management</div>} />
                <Route path="events" element={<div className="p-10">Event Management</div>} />
                <Route path="banners" element={<BannerManager />} />
                <Route path="banners/add" element={<AddBanner />} />
                <Route path="banners/edit/:id" element={<EditBanner />} />
                <Route path="settings" element={<div className="p-10">Settings Management</div>} />
            </Route>
        </Route>


        {/* Route 404 - Mặc định quay về trang chủ */}
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    
  );
}