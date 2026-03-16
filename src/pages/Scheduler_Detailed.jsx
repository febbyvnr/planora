import { ChevronLeft, ChevronRight, Link, CircleUserRound } from "lucide-react";
import restImg from "../assets/images/scheduler-rest.png";
import { useState } from "react";
import footer from "../assets/images/schedule_detailed-footer.png"

export default function Scheduler_Detailed() {
    const getWeekDays = (date) => {
    const weekDays = [];
    const dayOfWeek = date.getDay();
    const diffToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMon);

    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            weekDays.push({
            day: dayNames[d.getDay()],
            date: d.getDate(),
            fullDate: d,
            });
        }
        return weekDays;
    };
    const times = ["08:00", "09:00", "10:00", "11:00", "12:00"];
    const [view, setView] = useState("week");
    const [currentDate, setCurrentDate] = useState(new Date());
    const days = getWeekDays(currentDate);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getWeekRange = (date) => {
        const day = date.getDay();
        const diffToMon = day === 0 ? -6 : 1 - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + diffToMon);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        const formatDate = (d) => `${monthNames[d.getMonth()]} ${d.getDate()}`;
        return `${formatDate(monday)} - ${formatDate(sunday)}, ${sunday.getFullYear()}`;
    };

    const getMonthDates = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const dates = [];
        const paddingStart = firstDay === 0 ? 6 : firstDay - 1;
        for (let i = 0; i < paddingStart; i++) dates.push(null);
        for (let d = 1; d <= lastDate; d++) dates.push(d);
        while (dates.length % 7 !== 0) dates.push(null);
        return dates;
    };

    const renderMonthDates = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const dates = [];
        const paddingStart = firstDay === 0 ? 6 : firstDay - 1;
        for (let i = 0; i < paddingStart; i++) dates.push(null);
        for (let d = 1; d <= lastDate; d++) dates.push(d);
        while (dates.length % 7 !== 0) dates.push(null);
        return dates;
    };

    const monthDates = renderMonthDates(2026, 2);
    const weekRangeText = getWeekRange(currentDate);

    const shorten = (text) => {
        if (!text) return "";
        const width = window.innerWidth;
        let limit;
        if (width >= 1280) {
            limit = 80;
        } else if (width >= 645) {
            limit = 15;
        } else if (width >= 400) {
            limit = 15;
        } else {
            limit = 15;
        }
        return text.length > limit ? text.slice(0, limit) + ".." : text;
    };

    return (
        <div className="space-y-8 px-3 sm:px-4 lg:px-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    Stay on track, Olivia
                </h1>
                <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                    <button className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white">
                        <ChevronLeft size={16}/>
                        <span>{view === "week" ? weekRangeText : `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</span>
                        <ChevronRight size={16}/>
                    </button>
                    <div className="bg-gray-200 rounded-full p-1 flex">
                        <button
                            onClick={() => setView("week")}
                            className={`px-4 py-1 rounded-full ${
                                view === "week" ? "bg-white shadow" : ""
                            }`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setView("month")}
                            className={`px-4 py-1 rounded-full ${
                                view === "month" ? "bg-white shadow" : ""
                            }`}
                        >
                            Month
                        </button>
                    </div>
                </div>
            </div>
            {view === "week" && (
                <div className="bg-white rounded-3xl border p-3 sm:p-4 lg:p-6 overflow-x-auto">
                    <div className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))] sm:grid-cols-[70px_repeat(7,1fr)] lg:grid-cols-[80px_repeat(7,1fr)] min-w-[760px]">
                        <div className="text-gray-500">
                            <p className="font-semibold mb-8">GMT+7</p>
                            {times.map((time,i)=>(
                                <div key={i} className="h-24 flex items-start">
                                    {time}
                                </div>
                            ))}
                        </div>
                        {days.map((d,i)=>(
                            <div key={i} className="border-l px-3 relative">
                                <div className="text-center mb-4">
                                    <p className="text-gray-500 text-xs">{d.day}</p>
                                    <p className="font-semibold">{d.date}</p>
                                </div>
                                {i===0 && (
                                    <>
                                        <div className="absolute top-[60px] left-3 right-3 bg-blue-100 border border-blue-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Discrete Structures
                                            </p>
                                            <p className="text-[10px] lg:text-[8px] text-blue-600 font-semibold">
                                                MATHEMATICS
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                08:00 - 09:30
                                            </p>
                                        </div>
                                        <div className="absolute top-[150px] left-3 right-3 bg-purple-100 border border-purple-200 rounded-xl p-2">
                                            <p className="text-xs lg:text-[11px] font-semibold">
                                                Behavioral Finance
                                            </p>
                                            <p className="text-[10px] lg:text-[8px] text-purple-600 font-semibold">
                                                PSHYCOLOGY
                                            </p>
                                            <div className="flex -space-x-3">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center border bg-red-100">
                                                    <CircleUserRound size={22} className="text-red-500"/>
                                                </div>
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center border bg-purple-100">
                                                    <CircleUserRound size={22} className="text-purple-500"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute top-[245px] left-3 right-3 bg-yellow-100 border border-yellow-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Visual Culture Analysis
                                            </p>
                                            <p className="text-[10px] text-yellow-600 font-semibold">
                                                HISTORY
                                            </p>
                                        </div>
                                    </>
                                )}
                                {i===1 && (
                                    <>
                                        <div className="absolute top-[110px] left-3 right-3 bg-blue-100 border border-blue-200 rounded-xl p-2">
                                            <p className="text-xs lg:text-[10px] font-semibold">
                                                Probability Theory
                                            </p>
                                            <p className="text-[10px] lg:text-[8px] text-blue-600 font-semibold">
                                                MATHEMATICS
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                08:30 - 10:00
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-medium">
                                                Room 3427
                                            </p>
                                        </div>
                                        <div className="absolute top-[300px] left-3 right-3 bg-green-100 border border-green-200 rounded-xl p-2">
                                            <p className="text-xs lg:text-[10px] font-semibold">
                                                Neurobiology Basics
                                            </p>
                                            <p className="text-[10px] text-green-600 font-semibold">
                                                BIOLOGY
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                10:30 - 11:30
                                            </p>
                                        </div>
                                    </>
                                )}
                                {i===2 && (
                                    <div className="absolute top-[70px] left-3 right-3 bg-yellow-100 border border-yellow-300 rounded-xl p-3">
                                        <p className="text-xs font-semibold">
                                            Design Heritage
                                        </p>
                                        <p className="text-[10px] text-yellow-600 font-semibold">
                                            HISTORY
                                        </p>
                                        <p className="text-[10px] text-gray-500 mt-1">
                                            Intensive session on accessibility patterns for mobile devices.
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex -space-x-3">
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center border bg-purple-100">
                                                    <CircleUserRound size={22} className="text-purple-500"/>
                                                </div>
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center border bg-blue-100">
                                                    <CircleUserRound size={22} className="text-blue-500"/>
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-medium">
                                                +8
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {i===3 && (
                                    <>
                                        <div className="absolute top-[60px] left-3 right-3 bg-green-100 border border-green-200 rounded-xl p-2">
                                            <p className="text-xs lg:text-[10px] font-semibold">
                                                Genetics Fundamental
                                            </p>
                                            <p className="text-[10px] text-green-600 font-semibold">
                                                BIOLOGY
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                08:00 - 10:00
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-medium">
                                                Room 3215
                                            </p>
                                        </div>
                                        <div className="absolute top-[160px] left-3 right-3 bg-yellow-100 border border-yellow-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Digital Artifact Study
                                            </p>
                                            <p className="text-[10px] text-yellow-600 font-semibold">
                                                HISTORY
                                            </p>
                                            <div className="flex items-center gap-1 text-[10px] lg:text-[9px] text-gray-500 font-medium">
                                                <Link size={10}/>
                                                <span>Briev_v2.pdf</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-[340px] left-3 right-3 bg-purple-100 border border-purple-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Cognitive Bias Study
                                            </p>
                                            <p className="text-[10px] lg:text-[8px] text-purple-600 font-semibold">
                                                PSHYCOLOGY
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                11:00 - 13:00
                                            </p>
                                            <p className="text-[10px] text-gray-500 font-medium">
                                                Online
                                            </p>
                                        </div>
                                    </>
                                )}
                                {i===4 && (
                                    <>
                                        <div className="absolute top-[70px] left-3 right-3 bg-blue-100 border border-blue-200 rounded-xl p-2">
                                            <p className="text-xs lg:text-[8px] font-semibold">
                                                Computational Thinking
                                            </p>
                                            <p className="text-[10px] lg:text-[8px] text-blue-600 font-semibold">
                                                MATHEMATICS
                                            </p>
                                        </div>
                                        <div className="absolute top-[210px] left-3 right-3 bg-purple-100 border border-purple-200 rounded-xl p-2">
                                            <p className="text-xs lg:text-[10px] font-semibold">
                                                Sosial Pshycology
                                            </p>
                                            <p className="text-[10px] lg:text-[8px] text-purple-600 font-semibold">
                                                PSHYCOLOGY
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                09:30
                                            </p>
                                            <p className="text-[10px] text-gray-500 mt-1">
                                                Reviewing catering and venue contratcs for the spring gala. 
                                            </p>
                                        </div>
                                    </>
                                )}
                                {i===5 && (
                                    <div className="absolute top-[300px] left-3 right-3 bg-yellow-100 border border-yellow-200 rounded-xl p-2">
                                        <p className="text-xs font-semibold">
                                            Curatorial Practice
                                        </p>
                                        <p className="text-[10px] text-yellow-600 font-semibold">
                                            HISTORY
                                        </p>
                                        <p className="text-[10px] text-gray-500">
                                            10:30 - 12:00
                                        </p>
                                    </div>
                                )}
                                {i===6 && (
                                    <div className="absolute top-[50px] bottom-[40px] left-3 right-3 flex flex-col items-center justify-center bg-green-100 border border-green-200 rounded-2xl text-center p-4">
                                        <img
                                            src={restImg}
                                            className="w-20 mb-3"
                                        />
                                        <p className="font-semibold text-green-700 text-sm">
                                            Rest & Recharge
                                        </p>
                                        <p className="text-xs text-green-600">
                                            No scheduled task
                                            <br/>
                                            Take some time for yourself!
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {view === "month" && (
                <div className="bg-white rounded-3xl border p-3 sm:p-4 lg:p-6 overflow-x-auto">
                    <div className="min-w-[900px]">
                        <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-2 py-2">
                            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day) => (
                                <div key={day}>{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-3 text-sm text-gray-700">
                            {monthDates.map((date, i) => (
                                <div
                                    key={i}
                                    className="h-24 sm:h-28 lg:h-32 border rounded-xl flex items-start p-1 sm:p-2 text-sm text-gray-400 relative"
                                >
                                    {date && <p className="font-semibold">{date}</p>}
                                    
                                    {date === 1 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Academic Prep")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 2 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Calculus Lecturer")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 3 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#9333EA] bg-[rgba(147,51,234,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Cognitive Pshycology Seminar")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 4 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#A16207] bg-[rgba(253,224,71,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Ancient Civilizations Lecture")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 5 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Biology Lab Session")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 6 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Algebra Quiz")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 7 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-2 -mr-1">
                                            <div className="flex bg-[rgba(253,224,71,0.18)] text-[#A16207] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("History Reading Review")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(147,51,234,0.18)] text-[#9333EA] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Study Group Discussion")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 8 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Biology Notes Review")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 9 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Problem Solving Workshop")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 10 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(147,51,234,0.18)] text-[#9333EA] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Behavioral Psychology Lecture")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(253,224,71,0.18)] text-[#A16207] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("History Seminar")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 11 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Genetics Discussion")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 12 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(72,138,236,0.18)] text-[#488AEC] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#488AEC]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Statistic Lecture")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(147,51,234,0.18)] text-[#9333EA] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Research Methods Meeting")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(253,224,71,0.18)] text-[#A16207] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("History Lecture")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 13 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#A16207] bg-[rgba(253,224,71,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("History Essay Draft Due")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 14 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(72,138,236,0.18)] text-[#488AEC] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#488AEC]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Math Practice session")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(147,51,234,0.18)] text-[#9333EA] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Group Study: Pshycology")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 15 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Biology Concept Review")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 16 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Biology Midterm")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 17 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#9333EA] bg-[rgba(147,51,234,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Intro to Social Pshycology")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 18 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#A16207] bg-[rgba(253,224,71,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Historical Analysis Workshop")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 19 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Calculus Problem Review")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 20 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#A16207] bg-[rgba(253,224,71,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Art & Cultural History Lecture")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 21 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(72,138,236,0.18)] text-[#488AEC] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#488AEC]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Math Study Group")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(16,185,129,0.18)] text-[#10B981] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Biology Review")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 22 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#9333EA] bg-[rgba(147,51,234,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Pshycology Reading")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 23 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#9333EA] bg-[rgba(147,51,234,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Pshycology Research Meeting")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 24 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Statistic Exam")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 25 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#A16207] bg-[rgba(253,224,71,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("History Presentation Prep")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 26 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Biology Lab Report")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 27 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#488AEC] bg-[rgba(72,138,236,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#6385E5]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Mathematics Course Wrap")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 28 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(253,224,71,0.18)] text-[#A16207] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("History Study Review")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(147,51,234,0.18)] text-[#9333EA] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Psychology Discussion Group")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 29 && (
                                        <div className="absolute top-7 left-2 right-2 text-[#10B981] bg-[rgba(16,185,129,0.18)] rounded-[8px] p-0 text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                            <p className="font-medium truncate sm:whitespace-normal">
                                                {shorten("Weekly Biology Review")}
                                            </p>
                                        </div>
                                    )}
                                    {date === 30 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(72,138,236,0.18)] text-[#488AEC] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#488AEC]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Calculus Review Session")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(16,185,129,0.18)] text-[#10B981] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#10B981]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Biology Study Notes")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {date === 31 && (
                                        <div className="flex flex-col gap-1 mt-5 w-full -ml-3 -mr-1">
                                            <div className="flex bg-[rgba(147,51,234,0.18)] text-[#9333EA] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#9333EA]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("Pshycology Reflection Meeting")}
                                                </p>
                                            </div>
                                            <div className="flex bg-[rgba(253,224,71,0.18)] text-[#A16207] rounded-[8px] text-[10px] sm:text-[12px] lg:text-[14px] shadow-[-3px_0px_0px_#FDE047]">
                                                <p className="font-medium truncate sm:whitespace-normal">
                                                    {shorten("History Reading Wrap-up")}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="rounded-[40px] overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                <img
                    src={footer}
                    alt="Schedule_Detailed footer"
                    className="w-full h-auto"
                />
            </div>
        </div>
    );
}