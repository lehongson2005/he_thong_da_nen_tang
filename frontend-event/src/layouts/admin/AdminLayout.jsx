import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, Image } from 'lucide-react'; // Image icon for banners

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-800 text-white shadow-lg flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-indigo-700">
                    Admin Panel
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink to="/admin/dashboard" icon={<LayoutDashboard />}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/users" icon={<Users />}>
                        Users
                    </NavLink>
                    <NavLink to="/admin/events" icon={<Calendar />}>
                        Events
                    </NavLink>
                    <NavLink to="/admin/banners" icon={<Image />}>
                        Banners
                    </NavLink>
                    <NavLink to="/admin/settings" icon={<Settings />}>
                        Settings
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-gray-800">Welcome, Admin!</h1>
                    {/* Admin actions/profile here */}
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet /> {/* Renders the child route components */}
                </main>
            </div>
        </div>
    );
};

const NavLink = ({ to, icon, children }) => {
    return (
        <Link
            to={to}
            className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-700 hover:text-white transition-colors duration-200"
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
};

export default AdminLayout;
