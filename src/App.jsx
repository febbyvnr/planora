import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import { Route } from "lucide-react";

import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/Login/LoginPage";
import Materials from "./pages/Materials";
import MaterialFolder from "./pages/MaterialFolder";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Scheduler from "./pages/Scheduler";
import SchedulerDetailed from "./pages/Scheduler_Detailed";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import SettingsNotifications from "./pages/SettingsNotifications";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<MainLayout />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />     
                    <Route path="/materials" element={<Materials />} />
                    <Route path="/materials/mathematics" element={<MaterialFolder />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                    <Route path="/scheduler/detailed" element={<SchedulerDetailed />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/change-password" element={<ChangePassword />} />
                    <Route path="/settings/notifications" element={<SettingsNotifications />} />
                </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;