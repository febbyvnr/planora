import {
  LayoutDashboard,
  Calendar,
  CheckSquare,
  BookOpen,
  Folder,
  Hourglass,
  Settings
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Scheduler", icon: Calendar, path: "/scheduler" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Learning Plan", icon: BookOpen, path: "/learning-plan" },
    { name: "Materials", icon: Folder, path: "/materials" },
    { name: "Study Timer", icon: Hourglass, path: "/timer" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between">

      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-9 h-9 rounded-lg bg-indigo-500"></div>
          <h1 className="text-xl font-bold">Planora</h1>
        </div>

        {/* Menu */}
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
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-2xl transition
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
                {item.name}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Settings */}
      <div className="px-6 py-6 flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
        <Settings size={20} />
        Settings
      </div>

    </div>
  );
}