import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BookOpen,
  Folder,
  Hourglass,
  Settings,
  Menu,
  X
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/images/logo.png";

export default function Sidebar({ isMobile, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // If mobile, ensure sidebar is not collapsed
  const isCollapsed = isMobile ? false : collapsed;

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Scheduler", icon: Calendar, path: "/scheduler" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Learning Plan", icon: BookOpen, path: "/learning-plan" },
    { name: "Materials", icon: Folder, path: "/materials" },
    { name: "Study Timer", icon: Hourglass, path: "/timer" },
  ];

  const handleNavigate = (path) => {
      navigate(path);
      if (isMobile && onClose) onClose();
  };

  return (
    <div
      className={`h-full bg-white flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div>

        {/* HAMBURGER */}
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={() => {
                if (isMobile && onClose) {
                    onClose();
                } else {
                    setCollapsed(!collapsed);
                }
            }}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            {isMobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* LOGO + TITLE */}
        <div
          className={`flex items-center py-4 ${
            isCollapsed ? "justify-center px-0" : "justify-center gap-3 px-6"
          }`}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />

          {!isCollapsed && (
            <h1 className="text-2xl font-bold">
              Planora
            </h1>
          )}
        </div>

        {/* MENU */}
        <nav className="px-3 flex flex-col gap-1">
          {menu.map((item, index) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(item.path + "/");

            return (
              <div
                key={index}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "gap-3"
                } px-4 py-3 cursor-pointer rounded-2xl transition
                ${
                  isActive
                    ? "text-[#6385E5] font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={{
                  backgroundColor: isActive ? "#6385E52E" : "transparent"
                }}
              >
                <Icon size={20} />
                {!isCollapsed && item.name}
              </div>
            );
          })}
        </nav>
      </div>

      {/* SETTINGS */}
      <div
        onClick={() => handleNavigate('/settings')}
        className={`px-6 py-4 mx-3 mb-4 rounded-2xl flex items-center ${
          isCollapsed ? "justify-center px-4" : "gap-3"
        } cursor-pointer transition ${
            location.pathname.startsWith('/settings')
                ? "text-[#6385E5] font-semibold bg-[#6385E52E]" 
                : "text-gray-500 hover:text-black hover:bg-gray-100"
        }`}
      >
        <Settings size={20} />
        {!isCollapsed && "Settings"}
      </div>
    </div>
  );
}