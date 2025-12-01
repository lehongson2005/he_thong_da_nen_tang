const API_URL = import.meta.env.VITE_API_BASE_URL;

// Lấy header, bao gồm token nếu includeAuth = true
const getHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (includeAuth) {
        let token = null;
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                token = localStorage.getItem('token') || sessionStorage.getItem('token');
            }
        } catch (e) {
            console.warn("Cannot access storage:", e);
        }
        // console.log("Token retrieved for headers:", token); // Re-add if needed for debugging
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    // console.log("Headers being sent:", headers); // Re-add if needed for debugging
    return headers;
};

// Xử lý response
async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.message || 'Đã có lỗi xảy ra từ API.');
        error.status = response.status;
        throw error;
    }
    return data;
}

// Login và lưu token vào localStorage
export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);

    if (data.token) {
        localStorage.setItem('token', data.token);
        console.log("Token saved to localStorage:", data.token);
    }

    return data;
};

// Register
export const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

// Forgot Password
export const forgotPassword = async (email) => {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email }),
    });
    return handleResponse(response);
};

// Reset Password
export const resetPassword = async (data) => {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

// Change Password (cần token)
export const changePassword = async (data) => {
    const response = await fetch(`${API_URL}/change-password`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

// Logout (cần token)
export const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: getHeaders(true),
    });
    // Xoá token sau khi logout
    localStorage.removeItem('token');
    return handleResponse(response);
};

// Lấy thông tin user (cần token)
export const getMe = async () => {
    const response = await fetch(`${API_URL}/me`, {
        method: 'GET',
        headers: getHeaders(true),
    });
    return handleResponse(response);
};

// Helper: migrate token từ sessionStorage sang localStorage (nếu cần)
export const migrateTokenToLocalStorage = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        localStorage.setItem('token', token);
        console.log("Token migrated to localStorage:", token);
    }
};
