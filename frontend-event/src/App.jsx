import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login/login.jsx";
import Register from "./pages/user/login/register.jsx";
import Index from "./pages/index.jsx";
import ForgotPassword from "./pages/user/forgot-password/ForgotPassword.jsx";
import ChangePassword from "./pages/user/change-password/ChangePassword.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<Index />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />


        {/* Dashboard */}
        <Route path="/dashboard" element={<div>Dashboard</div>} />

        {/* Route mặc định */}
        <Route path="*" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}
