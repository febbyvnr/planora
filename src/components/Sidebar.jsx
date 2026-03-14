import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BookOpen,
  Folder,
  Hourglass,
  Settings,
  Menu
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/images/logo.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Scheduler", icon: Calendar, path: "/scheduler" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Learning Plan", icon: BookOpen, path: "/learning-plan" },
    { name: "Materials", icon: Folder, path: "/materials" },
    { name: "Study Timer", icon: Hourglass, path: "/timer" },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white border-r flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>

        {/* HAMBURGER */}
        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* LOGO + TITLE */}
        <div
          className={`flex items-center py-4 ${
            collapsed ? "justify-center px-0" : "justify-center gap-3 px-6"
          }`}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />

          {!collapsed && (
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
                onClick={() => navigate(item.path)}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "gap-3"
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
                {!collapsed && item.name}
              </div>
            );
          })}
        </nav>
      </div>

      {/* SETTINGS */}
      <div
        className={`px-6 py-6 flex items-center ${
          collapsed ? "justify-center" : "gap-3"
        } text-gray-500 hover:text-black cursor-pointer`}
      >
        <Settings size={20} />
        {!collapsed && "Settings"}
      </div>
    </div>
  );
}