import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">Trang không tìm thấy</p>
        <p className="text-gray-600 mb-8">Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
