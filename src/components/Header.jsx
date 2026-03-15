import { Bell, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
    return (
        <div className="w-full flex justify-between md:justify-end items-center py-4 px-4 md:px-8 bg-white border-b border-gray-100 h-20 shrink-0 z-20 sticky top-0">

            {/* Mobile Menu Icon */}
            <div 
                className="md:hidden flex items-center text-gray-500 cursor-pointer hover:text-gray-800 transition"
                onClick={onMenuClick}
            >
                <Menu className="w-6 h-6" />
                <span className="ml-3 font-bold text-lg text-[#4B4E9A]">Planora</span>
            </div>

            <div className="flex items-center">
                {/* Notification Icon */}
                <div className="relative mr-6 cursor-pointer text-orange-400 hover:text-orange-500 transition">
                    <Bell className="fill-current w-6 h-6" />
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white"></span>
                </div>

                {/* Divider */}
                <div className="h-8 border-l border-gray-300 mx-2 md:mx-4 text-gray-400"></div>

                {/* User Profile */}
                <div className="flex items-center ml-2 md:ml-4 cursor-pointer">
                    <div className="text-right mr-3 hidden sm:block">
                        <p className="text-sm font-bold text-gray-800">Olivia</p>
                        <p className="text-xs text-gray-500">olivia123@gmail.com</p>
                    </div>
                    <div className="h-10 w-10 min-w-[40px] rounded-full bg-red-100 flex items-center justify-center text-red-500 border border-red-200 overflow-hidden">
                        {/* Fallback avatar if no image */}
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-75 mt-2">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
