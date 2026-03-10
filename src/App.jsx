import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Materials from "./pages/Materials";
import MaterialFolder from "./pages/MaterialFolder";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Scheduler from "./pages/Scheduler";
import SchedulerDetailed from "./pages/Scheduler_Detailed";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/mathematics" element={<MaterialFolder />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/scheduler" element={<Scheduler />} />
          <Route path="/scheduler/detailed" element={<SchedulerDetailed />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;