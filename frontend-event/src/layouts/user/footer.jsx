import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl">
              Đăng ký nhận bản tin của chúng tôi.
            </h1>
            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
              <input
                id="email"
                type="text"
                className="w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                placeholder="Địa chỉ Email"
              />
              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform bg-gray-800 rounded-lg md:w-auto md:mx-4 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                Đăng ký
              </button>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Liên kết nhanh</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link to="/" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">Trang chủ</Link>
              <Link to="/events" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">Sự kiện</Link>
              <Link to="/contact" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">Liên hệ</Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Về chúng tôi</p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <Link to="/about" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">Câu chuyện</Link>
              <Link to="/careers" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">Tuyển dụng</Link>
              <Link to="/privacy-policy" className="text-gray-600 transition-colors duration-300 hover:underline hover:text-blue-500">Chính sách</Link>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-8" />
        <div className="flex items-center justify-between">
          <Link to="/">
            <h2 className="text-2xl font-bold text-gray-800">Event<span className="text-blue-500">Hub</span></h2>
          </Link>
          <div className="flex -mx-2">
            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Facebook">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Twitter">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Github">
                <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4 text-sm">
            © 2025 EventHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;