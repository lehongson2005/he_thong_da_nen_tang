import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { User, ClipboardList, Award } from 'lucide-react';

const Profile = () => {
    const location = useLocation();

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Thông tin cá nhân</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="md:w-1/4 bg-white rounded-lg shadow-sm p-6">
                        <nav className="space-y-2">
                            <ProfileNavLink to="/profile/account" icon={<User />}>
                                Thông tin tài khoản
                            </ProfileNavLink>
                           
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="md:w-3/4 bg-white rounded-lg shadow-sm p-8">
                        <Outlet /> {/* Renders the child route components */}
                    </main>
                </div>
            </div>
        </div>
    );
};

const ProfileNavLink = ({ to, icon, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                        ${isActive ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
};

export default Profile;
