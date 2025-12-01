import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Icons
import {
  Bell,
  Search,
  CalendarDays,
  User,
  ClipboardList,
  Award,
  LogOut,
} from "lucide-react";

// Dropdown
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="h-9 w-auto object-contain sm:h-10"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/100x40/transparent/333?text=LOGO";
                }}
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex items-center gap-3">
            
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-500">
              <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>

            {/* Dropdown user đơn giản */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full border border-gray-200 overflow-hidden p-0"
                >
                  <img
                    className="h-full w-full object-cover"
                    src="https://placehold.co/100x100/A3A3A3/FFFFFF?text=U"
                    alt="Avatar"
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs text-gray-500">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Thông tin cá nhân</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <span>Sự kiện của tôi</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer">
                  <Award className="mr-2 h-4 w-4" />
                  <span>Điểm & Quà tặng</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
