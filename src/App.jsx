import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import LoginPage from "./pages/Login/LoginPage";
import Materials from "./pages/Materials";
import MaterialFolder from "./pages/MaterialFolder";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Scheduler from "./pages/Scheduler";
import SchedulerDetailed from "./pages/Scheduler_Detailed";

function App() {
    return (
        <BrowserRouter>
                <Routes>
                    {/*Buat Layout LandingPage*/}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<MainLayout />} />
                    </Route>

                    {/*Buat Login*/}
                    <Route path="/login" element={<LoginPage />} />     

                    {/*Buat Layout Dashboard*/}
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />                        
                        <Route path="/materials" element={<Materials />} />
                        <Route path="/materials/mathematics" element={<MaterialFolder />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/scheduler" element={<Scheduler />} />
                        <Route path="/scheduler/detailed" element={<SchedulerDetailed />} />
                    </Route>

                </Routes>
        </BrowserRouter>
    );
}

export default App;