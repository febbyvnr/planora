import { useState, useEffect } from "react";
import AddSessionModel from "../components/AddSessionModel";

export default function Timer() {

    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    const [sessions, setSessions] = useState([
        { name: "Reading", duration: 25 },
        { name: "Deep Writing", duration: 45 },
        { name: "Break", duration: 10 }
    ]);

    const [logs, setLogs] = useState([
        { time: "10:45", activity: "Read about Math Test" },
        { time: "19:00", activity: "Reading: Lord of the Smile" }
    ]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [running]);

    function resetTimer() {
        setSeconds(0);
        setRunning(false);
    }

    function addSession(name, duration) {
        setSessions([...sessions, { name, duration }]);
    }

    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">

        {/* HEADER */}
        <div>
            <h2 className="text-3xl font-bold">Study Timer</h2>
            <p className="text-gray-500">
            Stay focused and build your momentum
            </p>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid md:grid-cols-2 gap-6">

            {/* TIMER CARD */}
            <div className="bg-white p-6 rounded-3xl shadow space-y-6">

            <div className="text-center">
                <p className="text-gray-500">Time Remaining</p>

                <div className="text-5xl font-bold">
                {minutes.toString().padStart(2, "0")} :
                {sec.toString().padStart(2, "0")}
                </div>
            </div>

            <div className="flex justify-center gap-4">

                <button
                onClick={() => setRunning(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-xl"
                >
                Start
                </button>

                <button
                onClick={() => setRunning(false)}
                className="bg-yellow-500 text-white px-6 py-2 rounded-xl"
                >
                Pause
                </button>

                <button
                onClick={resetTimer}
                className="bg-gray-400 text-white px-6 py-2 rounded-xl"
                >
                Reset
                </button>

            </div>
            </div>

            {/* SESSION PROGRESS */}
            <div className="bg-white p-6 rounded-3xl shadow space-y-4">

            <h3 className="text-xl font-semibold">Session Progress</h3>

            <div className="flex justify-between">
                <div>
                <p className="text-3xl font-bold">2h 15m</p>
                <p className="text-gray-500">Today's Total</p>
                </div>

                <div className="text-right">
                <p className="text-3xl font-bold">4</p>
                <p className="text-gray-500">Sessions</p>
                </div>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full">
                <div className="w-3/4 h-4 bg-gray-800 rounded-full"></div>
            </div>

            <p className="text-sm text-gray-500 text-center">
                You are 75% through your daily goal
            </p>

            </div>
        </div>

        {/* SESSION LIST */}
        <div className="space-y-4">

            <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Sessions</h3>

            <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
                Add Session
            </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

            {sessions.map((session, i) => (
                <div
                key={i}
                className="p-4 bg-white rounded-2xl shadow flex justify-between"
                >
                <div>
                    <p className="text-lg font-semibold">{session.name}</p>
                    <p className="text-gray-500">
                    {session.duration} minutes
                    </p>
                </div>
                </div>
            ))}

            </div>
        </div>

        {/* SESSION LOG */}
        <div className="bg-white p-6 rounded-3xl shadow space-y-4">

            <h3 className="text-xl font-semibold">Session Log</h3>

            {logs.map((log, i) => (
            <div key={i} className="flex gap-3">

                <div className="w-1 bg-green-400 rounded"></div>

                <div>
                <p className="font-semibold">{log.time}</p>
                <p className="text-gray-500">{log.activity}</p>
                </div>

            </div>
            ))}

        </div>

        {/* STREAK */}
        <div className="bg-blue-500 text-white p-6 rounded-3xl shadow">

            <p className="text-4xl font-bold">
            5 Day Streak
            </p>

            <p className="text-sm opacity-80">
            Don’t break the chain! Complete one more session
            </p>

        </div>

        {showModal && (
            <AddSessionModel
            close={() => setShowModal(false)}
            addSession={addSession}
            />
        )}

        </div>
    );
}