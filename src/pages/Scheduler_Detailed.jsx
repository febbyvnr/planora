import { ChevronLeft, ChevronRight, Link } from "lucide-react";
import restImg from "../assets/images/scheduler-rest.png";
import { useState } from "react";

export default function Scheduler_Detailed() {
    const days = [
        { day: "MON", date: 23 },
        { day: "TUE", date: 24 },
        { day: "WED", date: 25 },
        { day: "THU", date: 26 },
        { day: "FRI", date: 27 },
        { day: "SAT", date: 28 },
        { day: "SUN", date: 29 },
    ];
    const times = ["08:00", "09:00", "10:00", "11:00", "12:00"];
    const [view, setView] = useState("week");

    return (
        <div className="space-y-8 pt-9">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    Stay on track, Olivia
                </h1>
                <div className="flex gap-4 items-center">
                    <button className="flex items-center gap-2 border rounded-full px-4 py-2 bg-white">
                        <ChevronLeft size={16}/>
                        <span>Mar 23 - Mar 29, 2026</span>
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
                <div className="bg-white rounded-3xl border p-6">
                    <div className="grid grid-cols-[80px_repeat(7,1fr)]">
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
                                            <p className="text-[10px] text-blue-600 font-semibold">
                                                MATHEMATICS
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                08:00 - 09:30
                                            </p>
                                        </div>
                                        <div className="absolute top-[150px] left-3 right-3 bg-purple-100 border border-purple-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Behavioral Finance
                                            </p>
                                            <p className="text-[10px] text-purple-600 font-semibold">
                                                PSHYCOLOGY
                                            </p>
                                            <div className="flex -space-x-1 mt-1">
                                                <div className="w-4 h-4 rounded-full bg-red-400"></div>
                                                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                                            </div>
                                        </div>
                                        <div className="absolute top-[245px] left-3 right-3 bg-yellow-100 border border-yellow-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Visual Culture Analysis
                                            </p>
                                            <p className="text-[10px] text-yellow-600 font-semibold">
                                                HISTORY
                                            </p>
                                            <button className="mt-2 bg-yellow-400 text-xs px-3 py-1 rounded-lg">
                                                Join
                                            </button>
                                        </div>
                                    </>
                                )}
                                {i===1 && (
                                    <>
                                        <div className="absolute top-[110px] left-3 right-3 bg-blue-100 border border-blue-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Probability Theory
                                            </p>
                                            <p className="text-[10px] text-blue-600 font-semibold">
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
                                            <p className="text-xs font-semibold">
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
                                            <div className="flex -space-x-1">
                                                <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-medium">
                                                +8
                                            </span>
                                        </div>
                                        <button className="mt-2 bg-yellow-400 text-xs px-3 py-1 rounded-lg">
                                            Join
                                        </button>
                                    </div>
                                )}
                                {i===3 && (
                                    <>
                                        <div className="absolute top-[60px] left-3 right-3 bg-green-100 border border-green-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
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
                                            <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                                                <Link size={10}/>
                                                <span>Briev_v2.pdf</span>
                                            </div>
                                        </div>
                                        <div className="absolute top-[340px] left-3 right-3 bg-purple-100 border border-purple-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Cognitive Bias Study
                                            </p>
                                            <p className="text-[10px] text-purple-600 font-semibold">
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
                                            <p className="text-xs font-semibold">
                                                Computational Thinking
                                            </p>
                                            <p className="text-[10px] text-blue-600 font-semibold">
                                                MATHEMATICS
                                            </p>

                                            <button className="mt-2 bg-blue-400 text-white text-xs px-3 py-1 rounded-lg">
                                                Join
                                            </button>
                                        </div>
                                        <div className="absolute top-[210px] left-3 right-3 bg-purple-100 border border-purple-200 rounded-xl p-2">
                                            <p className="text-xs font-semibold">
                                                Sosial Pshycology
                                            </p>
                                            <p className="text-[10px] text-purple-600 font-semibold">
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
                <div className="bg-white rounded-3xl border p-6">
                    <div className="grid grid-cols-7 text-center text-gray-500 text-sm mb-4">
                        <p>Mon</p>
                        <p>Tue</p>
                        <p>Wed</p>
                        <p>Thu</p>
                        <p>Fri</p>
                        <p>Sat</p>
                        <p>Sun</p>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-28 border rounded-xl flex items-start p-2 text-sm text-gray-400"
                        >
                            {i + 1}
                        </div>
                    ))}
                    </div>
                </div>
            )}
            <div className="bg-[#C9D4F1] rounded-3xl p-8 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">
                        You're doing great, Olivia!
                    </h3>
                    <p className="text-gray-700 text-sm mt-1">
                        You've completed 85% of your weekly study goals
                        <br/>
                        Your consistency is in the top 3% of Planora users
                    </p>
                </div>
                <div className="text-5xl">
                    ⭐
                </div>
            </div>
        </div>
    );
}