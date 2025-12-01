import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import { logout as apiLogout } from "../../api/authApi"; // Import logout API function
import { toast } from "react-hot-toast"; // For notifications

// Icons
import {
  Bell,
  Search,
  CalendarDays,
  User,
  ClipboardList,
  Award,
  LogOut,
  LogIn,
  UserPlus
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
  const { user, loading, setUser } = useAuth(); // Use useAuth hook
  const navigate = useNavigate();

  const logout = async () => {
    console.log("Attempting logout...");
    const currentToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("Token before logout API call:", currentToken);

    try {
      await apiLogout(); // Call your API logout function
      console.log("Logout API call succeeded.");

      localStorage.removeItem("token"); // Clear token from local storage
      sessionStorage.removeItem("token"); // Clear token from session storage
      console.log("Token removed from localStorage and sessionStorage.");

      setUser(null); // Clear user state
      toast.success("Đăng xuất thành công!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.");
    }
  };

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

            {loading ? ( // Show loading state
                <div>Loading...</div>
            ) : user ? ( // User is logged in
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-10 w-10 rounded-full border border-gray-200 overflow-hidden p-0"
                        >
                            <img
                                className="h-full w-full object-cover"
                                src={user.avatar || "https://placehold.co/100x100/A3A3A3/FFFFFF?text=U"}
                                alt="Avatar"
                            />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56 p-2">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile/account")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Thông tin cá nhân</span>
                        </DropdownMenuItem>
                        {user.role === 'admin' && (
                            <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Admin Dashboard</span>
                                </DropdownMenuItem>
                            </>
                        )}


                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="cursor-pointer text-red-600"   onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Đăng xuất</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : ( // User is not logged in
                <>
                    <Link to="/login">
                        <Button variant="ghost" className="text-gray-700 hover:bg-gray-100 flex items-center">
                            <LogIn className="mr-2 h-4 w-4" />
                            Đăng nhập
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="default" className="flex items-center">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Đăng ký
                        </Button>
                    </Link>
                </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;

