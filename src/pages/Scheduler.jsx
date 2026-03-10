import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import cardBg from "../assets/images/scheduler-bg.png";

export default function App() {
    const navigate = useNavigate();
    const today = new Date();
    const [monthOffset, setMonthOffset] = useState(0);

    const baseDate = new Date(
        today.getFullYear(),
        today.getMonth() + monthOffset,
        1
    );

    const currentMonth = baseDate.getMonth();
    const currentYear = baseDate.getFullYear();
    const todayDate = today.getDate();

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // convert sunday=0 → monday start
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];

    // empty cells
    for (let i = 0; i < startOffset; i++) {
        days.push(null);
    }

    // days of month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const monthName = baseDate.toLocaleString("default", { month: "long" });

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupTab, setPopupTab] = useState("create");
    const [joinCode, setJoinCode] = useState("");
    const [createName, setCreateName] = useState("");

    const handleJoin = () => {
        if (!joinCode.trim()) return;
        alert(`Berhasil join calendar space dengan code: ${joinCode}`);
        setPopupOpen(false);
        setJoinCode("");
    };

    const handleCreate = () => {
        if (!createName.trim()) return;
        alert(`Calendar space "${createName}" berhasil dibuat!`);
        setPopupOpen(false);
        setCreateName("");
    };

    return (
        <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    What's On Your Agenda?
                </h1>
                <p className="text-gray-500 mt-1">
                    Keep track of classes, study sessions, and deadlines with ease
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
            {/* ========== LEFT SIDE ========== */}
                <div className="space-y-8">
                    {/* CALENDAR SPACES GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Academic Planner */}
                    <div 
                        onClick={() => navigate("/scheduler/detailed")}
                        className="rounded-3xl border overflow-hidden bg-white relative shadow-[0px_4px_0px_rgb(99,133,229)] hover:-translate-y-1 transition cursor-pointer"
                    >
                        <div
                            className="h-44 bg-cover bg-center bg-gradient-to-br from-blue-100 via-blue-50 to-white p-4 flex flex-col relative overflow-hidden"
                            style={{ backgroundImage: `url(${cardBg})` }}
                            >
                            {/* GRADIENT OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/50 via-blue-300/30 to-transparent"></div>

                            {/* CONTENT */}
                            <div className="relative z-10">
                                <p className="text-blue-700 font-semibold">
                                    Academic Planner
                                </p>
                                <p className="text-sm text-gray-600">
                                    12 events this week
                                </p>
                            </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-red-500 border-2 border-white"></div>
                            </div>
                            <span className="text-gray-500 text-sm">+49 more</span>
                        </div>
                    </div>

                    {/* Committee */}
                    <div className="rounded-3xl border overflow-hidden bg-white relative shadow-[0px_4px_0px_#6954CD] hover:-translate-y-1 transition cursor-pointer">
                        <div
                            className="h-44 bg-cover bg-center bg-gradient-to-br from-purple-100 via-purple-50 to-white p-4 flex flex-col relative overflow-hidden"
                            style={{ backgroundImage: `url(${cardBg})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/50 via-purple-300/30 to-transparent"></div>

                            <div className="relative z-10">
                                <p className="text-blue-700 font-semibold">Committee</p>
                                <p className="text-sm text-gray-600">
                                6 upcoming meetings
                                </p>
                            </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-red-500 border-2 border-white"></div>
                            </div>
                            <span className="text-gray-500 text-sm">+27 more</span>
                        </div>
                    </div>

                    {/* Design Club */}
                    <div className="rounded-3xl border overflow-hidden bg-white relative shadow-[0px_4px_0px_#F5B944] hover:-translate-y-1 transition cursor-pointer">
                        <div
                            className="h-44 bg-cover bg-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-white p-4 flex flex-col relative overflow-hidden"
                            style={{ backgroundImage: `url(${cardBg})` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/50 via-yellow-300/30 to-transparent"></div>

                            <div className="relative z-10">
                                <p className="text-blue-700 font-semibold">Design Club</p>
                                <p className="text-sm text-gray-600">4 upcoming events</p>
                            </div>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white"></div>
                                <div className="w-7 h-7 rounded-full bg-red-500 border-2 border-white"></div>
                            </div>
                            <span className="text-gray-500 text-sm">+103 more</span>
                        </div>
                    </div>

                    {/* CREATE CALENDAR SPACE */}
                    <div
                        onClick={() => setPopupOpen(true)}
                        className="rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center p-10 text-gray-500 hover:bg-gray-50 cursor-pointer transition"
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl mb-3">
                            +
                        </div>
                        <p className="font-semibold">Create Calendar Space</p>
                        <p className="text-sm text-gray-400">
                            Organize
                            <br />a new schedule workspace
                        </p>
                    </div>
                    </div>
                    {/* END CALENDAR SPACES GRID */}

                    {/* PRODUCTIVITY BANNER */}
                    <div className="bg-[#C9D4F1] rounded-3xl p-8 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">
                                Your schedule looks amazing!
                            </h3>
                            <p className="text-gray-700 text-sm mt-1">
                                You've completed 85% of your weekly study goals
                            <br />
                                Your consistency ranks in the top 3% of Planora students!
                            </p>
                        </div>
                        <div className="text-5xl">⭐</div>
                    </div>
                </div>
                {/* ========== END LEFT SIDE ========== */}

                {/* ========== RIGHT SIDE ========== */}
                <div className="space-y-8 lg:border-l lg:pl-8">
                    {/* UPCOMING SCHEDULE */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Upcoming Schedule</h3>
                        <div className="bg-white rounded-2xl p-5 border space-y-4">
                            {/* MONTH NAV */}
                            <div className="flex justify-between items-center">
                                <button
                                    className="p-2 border rounded-lg hover:bg-gray-50 transition"
                                    onClick={() => setMonthOffset(monthOffset - 1)}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <p className="font-semibold">
                                    {monthName} {currentYear}
                                </p>
                                <button
                                    className="p-2 border rounded-lg hover:bg-gray-50 transition"
                                    onClick={() => setMonthOffset(monthOffset + 1)}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* WEEK DAYS */}
                            <div className="grid grid-cols-7 text-xs text-gray-500 text-center">
                                <span>Mo</span>
                                <span>Tu</span>
                                <span>We</span>
                                <span>Th</span>
                                <span>Fr</span>
                                <span>Sa</span>
                                <span>Su</span>
                            </div>

                            {/* CALENDAR DAYS */}
                            <div className="grid grid-cols-7 text-center gap-y-3 text-sm">
                                {days.map((day, index) => {
                                    const isToday =
                                    day === todayDate &&
                                    currentMonth === today.getMonth() &&
                                    currentYear === today.getFullYear();

                                    return (
                                        <span
                                            key={index}
                                            className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full ${
                                            isToday
                                                ? "bg-indigo-600 text-white font-bold"
                                                : day
                                                ? "hover:bg-gray-100 cursor-pointer"
                                                : ""
                                            }`}
                                        >
                                            {day}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* UPCOMING TODAY */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold">Upcoming Today</h3>
                            <button className="text-indigo-600 text-sm hover:underline">
                            See all
                            </button>
                        </div>
                        <div className="space-y-3">
                            {/* EVENT 1 */}
                            <div className="border rounded-xl p-4 flex gap-3 items-start bg-white shadow-[-6px_0px_0px_#6385E5]">
                                <div className="w-1.5 bg-blue-500 rounded"></div>
                                <div>
                                    <p className="font-semibold">Quiz : European History</p>
                                    <p className="text-sm text-gray-500">10:00 AM - 12:00 PM</p>
                                </div>
                                </div>
                                {/* EVENT 2 */}
                                <div className="border rounded-xl p-4 flex gap-3 items-start bg-white shadow-[-6px_0px_0px_#6954CD]">
                                <div className="w-1.5 bg-purple-500 rounded"></div>
                                <div>
                                    <p className="font-semibold">Committee Weekly Meeting</p>
                                    <p className="text-sm text-gray-500">04:00 PM - 07:00 PM</p>
                                </div>
                                </div>
                                {/* EVENT 3 */}
                                <div className="border rounded-xl p-4 flex gap-3 items-start bg-white shadow-[-6px_0px_0px_#F5B944]">
                                <div className="w-1.5 bg-yellow-500 rounded"></div>
                                <div>
                                    <p className="font-semibold">Study : Interior Design</p>
                                    <p className="text-sm text-gray-500">10:00 AM - 12:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ========== END RIGHT SIDE ========== */}
                </div>
                {/* END MAIN GRID */}
            </div>

            {/* ========== POPUP ========== */}
            {popupOpen && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl w-[380px] p-6 relative shadow-lg">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
                            onClick={() => {
                                setPopupOpen(false);
                                setJoinCode("");
                                setCreateName("");
                            }}
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-lg font-bold mb-4">Calendar Space</h2>

                        {/* Tab buttons: Create (left) | Join (right) */}
                        <div className="flex mb-5 gap-2">
                            <button
                                className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                                popupTab === "create"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                onClick={() => setPopupTab("create")}
                            >
                                Create
                            </button>
                            <button
                                className={`flex-1 py-2.5 rounded-lg font-medium transition ${
                                popupTab === "join"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                                onClick={() => setPopupTab("join")}
                            >
                                Join
                            </button>
                        </div>

                        {/* Tab content */}
                        {popupTab === "create" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-600 mb-1 block">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter calendar space title"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={createName}
                                        onChange={(e) => setCreateName(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                                    />
                                </div>
                                <button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition"
                                    onClick={handleCreate}
                                >
                                    Create Calendar Space
                                </button>
                            </div>
                        )}

                        {popupTab === "join" && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-600 mb-1 block">
                                    Invitation Code
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                                />
                            </div>
                            <button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition"
                                onClick={handleJoin}
                            >
                            Join with Code
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            )}
            {/* ========== END POPUP ========== */}
        </div>
    );
}
