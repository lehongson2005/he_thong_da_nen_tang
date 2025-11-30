const API_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (includeAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return headers;
};

async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Đã có lỗi xảy ra từ API.');
    }
    return data;
}

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const forgotPassword = async (email) => {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email }),
    });
    return handleResponse(response);
};

export const resetPassword = async (data) => {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const changePassword = async (data) => {
    const response = await fetch(`${API_URL}/change-password`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const logout = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: getHeaders(true),
    });
    return handleResponse(response);
};
