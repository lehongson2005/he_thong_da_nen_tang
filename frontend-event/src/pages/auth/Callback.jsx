import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            // Lưu token và chuyển hướng về trang chủ
            localStorage.setItem('token', token);
            navigate('/');
        } else {
            // Nếu không có token, báo lỗi và chuyển về trang login
            console.error("Social login failed: No token received.");
            navigate('/login?error=social_login_failed');
        }
    }, [location, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2>Đang xử lý đăng nhập...</h2>
            <p>Vui lòng chờ trong giây lát.</p>
        </div>
    );
};

export default AuthCallback;
