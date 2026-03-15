import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import Materials from "./pages/Materials";
import MaterialFolder from "./pages/MaterialFolder";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import LearningPlan from "./pages/LearningPlan";
import Scheduler from "./pages/Scheduler";
import SchedulerDetailed from "./pages/Scheduler_Detailed";
import Settings from "./pages/Setting/Settings";
import SettingsFriends from "./pages/Setting/SettingsFriends";
import ChangePassword from "./pages/ChangePassword";
import SettingsNotifications from "./pages/Setting/SettingsNotifications";
import StudySession from "./pages/StudySession";
import Timer from "./pages/Timer";
import AddSession from "./components/AddSessionModel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Authenticated Routes - all wrapped in MainLayout for sidebar */}
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/materials" element={<Materials />} />
                        <Route path="/materials/mathematics" element={<MaterialFolder />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/scheduler" element={<Scheduler />} />
                        <Route path="/scheduler/detailed" element={<SchedulerDetailed />} />
                        <Route path="/learning-plan" element={<LearningPlan />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/settings/friends" element={<SettingsFriends />} />
                        <Route path="/settings/notifications" element={<SettingsNotifications />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/study-session" element={<StudySession />} />
                        <Route path="/timer" element={<Timer />} />
                        <Route path="/timer-addsession" element={<AddSession />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;