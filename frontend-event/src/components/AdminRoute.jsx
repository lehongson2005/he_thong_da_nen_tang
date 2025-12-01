import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = () => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        // You can render a loading spinner here
        return <div>Loading...</div>;
    }

    if (!user || !isAdmin()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This is so we can send them along to that page after they login,
        // which is a nicer user experience than dropping them off on the home page.
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
