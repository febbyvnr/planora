import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF9FF] text-gray-800">
      {/* Fixed Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Content area — offset by sidebar width */}
      <div
        className={`flex flex-col min-h-dvh transition-all duration-300 ${
          collapsed ? "pl-20" : "pl-64"
        }`}
      >
        {/* Sticky Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
