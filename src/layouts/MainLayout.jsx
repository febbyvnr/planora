import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FBF9FF] overflow-hidden text-gray-800 w-full relative">
      {/* Sidebar hidden on mobile */}
      <div className="hidden md:block h-full relative z-10 shrink-0">
        <Sidebar className="h-full border-r border-gray-200" />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative z-10 w-64 bg-white h-full shadow-2xl">
             <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden w-full max-w-full">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto w-full">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
            <div className="p-4 md:p-6 lg:px-8 w-full max-w-full overflow-hidden">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
}