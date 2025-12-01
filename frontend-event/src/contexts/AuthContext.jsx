import { createContext, useContext, useEffect, useState } from 'react';
import { login as loginUserApi, register as registerUserApi, logout as logoutUserApi } from '../api/authApi';
import { getMe, logout as apiLogout } from '../api/authApi'; // Import apiLogout
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from 'react-hot-toast'; // For notifications

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (token) {
                const userData = await getMe();
                setUser(userData);
            } else {
                setUser(null); // No token, no user
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
            if (error.status === 401) {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token'); // Also remove from session storage if present
            }
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const refreshUser = () => {
        setLoading(true); // Set loading to true when refreshing
        fetchUser();
    };

    const logout = async () => {
        console.log("Attempting logout from AuthContext...");
        const currentToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        console.log("Token before backend apiLogout call:", currentToken);

        try {
            await apiLogout(); // Call backend logout
            console.log("Backend apiLogout call succeeded.");
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            setUser(null);
            toast.success("Đăng xuất thành công!");
            navigate("/login"); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed in AuthContext:", error);
            toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
        }
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        setUser,
        loading,
        isAdmin,
        refreshUser,
        logout, // Add logout to the context value
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
