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

function App() {
    return (
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
                </Routes>
        </BrowserRouter>
    );
}

export default App;