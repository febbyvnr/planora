import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div>

        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main
            className={`transition-all duration-300 p-6 ${
            collapsed ? "ml-20" : "ml-64"
            }`}
        >
            <Outlet />
        </main>

        </div>
    );
}