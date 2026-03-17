import { useState } from "react";
import { User, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import maskotLegendaris from '../assets/images/maskot-streak-legendaris.png';
import maskot50Hari from '../assets/images/maskot-streak-50 hari.png';
import maskotDedicated from '../assets/images/maskot-streak-dedicated.png';
import maskot30Hari from '../assets/images/maskot-streak-30 hari.png';
import maskotNewbie from '../assets/images/maskot-streak-newbie.png';
import maskotAngry from '../assets/images/sticker_7.png';
import ProductivityChart from '../components/ProductivityChart';


/**
 * Returns the mascot image that matches the total number of
 * learning plans completed across all friends.
 *  ≥ 500 → Legendaris
 *  ≥ 300 → Dedicated
 *  ≥ 100 → 50 Hari
 *  ≥  70 → 30 Hari
 *  ≥  30 → Newbie
 *   < 30 → Newbie (default)
 */
function getLearningPlanMascot(totalPlans) {
    if (totalPlans >= 500) return { src: maskotLegendaris, label: 'Legendaris', animation: 'floatAnimation 3s ease-in-out infinite' };
    if (totalPlans >= 300) return { src: maskotDedicated, label: 'Dedicated', animation: 'floatAnimation 3.2s ease-in-out infinite' };
    if (totalPlans >= 100) return { src: maskot50Hari, label: '50 Hari', animation: 'floatAnimation 3.5s ease-in-out infinite' };
    if (totalPlans >= 70) return { src: maskot30Hari, label: '30 Hari', animation: 'floatAnimation 3.8s ease-in-out infinite' };
    return { src: maskotNewbie, label: 'Newbie', animation: 'floatAnimation 4s ease-in-out infinite' };
}

export default function Dashboard() {
    const userStreaks = [
        {
            id: 1,
            category: "Global Productivity",
            title: "Overall Activity",
            theme: {
                bgTop: "bg-orange-400",
                gradient: "bg-gradient-to-r from-white to-orange-50",
                border: "border-orange-200",
                shadow: "shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_12px_25px_rgba(249,115,22,0.25)]",
                boxCompleted: "bg-orange-400",
                boxMissed: "bg-orange-100",
                mascotBg: "bg-orange-300/40"
            },
            days: 365,
            pattern: (i) => i % 7 !== 0 && i <= 20,
            completedText: "Productive Day",
            missedText: "No Activity",
            points: "+12",
            mascot: maskotLegendaris,
            mascotAnimation: 'floatAnimation 3s ease-in-out infinite',
            mascotClass: 'w-32 h-32 absolute right-[-10px] bottom-0',
            collaborators: []
        },
        {
            id: 2,
            category: "Scheduler",
            title: "Design Club",
            theme: {
                bgTop: "bg-[#4828b8]",
                gradient: "bg-gradient-to-r from-white to-indigo-50",
                border: "border-indigo-200",
                shadow: "shadow-[0_8px_20px_rgba(72,40,184,0.15)] hover:shadow-[0_12px_25px_rgba(72,40,184,0.25)]",
                boxCompleted: "bg-indigo-600",
                boxMissed: "bg-indigo-200",
                mascotBg: "bg-indigo-300/30"
            },
            days: 50,
            pattern: (i) => !(i < 9 || i === 11 || i === 12),
            completedText: "Tasks Created",
            missedText: "0 Tasks",
            points: "+5",
            mascot: maskot50Hari,
            mascotAnimation: 'floatAnimation 3.5s ease-in-out infinite',
            mascotClass: 'w-32 h-32 absolute right-[-10px] bottom-[-5px]',
            collaborators: ["bg-blue-500", "bg-orange-500"]
        },
        {
            id: 3,
            category: "Learning Plan",
            type: "friend",
        },{
            id: 4,
            mascot: maskotAngry,
            mascotAnimation: 'floatAnimation 3s ease-in-out infinite',
            mascotClass: 'w-32 h-32 absolute right-[-10px] bottom-0',
        }
    ];

    // ── Friend Streak slide data ──────────────
    const friendsData = [
        { name: "Anya", plans: 12 },
        { name: "Bram", plans: 10 },
        { name: "Cleo", plans: 9 },
        { name: "Dito", plans: 8 },
        { name: "Elena", plans: 7 },
        { name: "Farhan", plans: 6 },
        { name: "Gita", plans: 5 },
    ];
    const totalMaxPlans = 12; // Base for progress bar 100%
    const [friendIndex, setFriendIndex] = useState(0);
    const activeFriend = friendsData[friendIndex];
    const friendMascot = getLearningPlanMascot(activeFriend.plans);

    return (
        <div className="flex flex-col gap-8 text-gray-800 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-[#4B4E9A]">
                    Welcome back, <span className="text-red-500">Olivia</span>!
                </h1>
                <p className="text-xl text-gray-600 mt-3 font-medium">
                    Let's plan something{' '}
                    <span className="relative z-10 text-green-500 font-bold text-2xl">
                        productive
                        <span className="absolute bottom-1 left-0 w-full"></span>
                    </span>{' '}
                    today
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">

                <div className="xl:col-span-2 flex flex-col gap-6 md:gap-8 overflow-hidden w-full">

                    <div className="p-0 rounded-2xl w-full">
                        <h2 className="text-xl font-bold mb-2">Productivity Pulse</h2>
                        <p className="text-sm text-gray-500 mb-6 font-medium">
                            Watch your productivity grow! This graph shows how consistent you are with the schedules you create and complete
                        </p>

                        <div className="mt-4">
                            <ProductivityChart />
                        </div>
                    </div>

                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-[0_20px_25px_-15px_rgba(72,187,120,0.2)] mt-4">
                        <h2 className="text-xl font-bold mb-4 md:mb-6">Recently Updates</h2>

                        <div className="w-full text-sm font-semibold text-gray-700 overflow-x-auto pb-2">
                            <div className="min-w-[500px]">
                                <div className="grid grid-cols-4 text-gray-400 mb-4 px-4 pb-2">
                                    <div>Type</div>
                                    <div>Activity</div>
                                    <div>Item</div>
                                    <div>Time</div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="grid grid-cols-4 bg-green-50/70 rounded-xl p-4 items-center">
                                        <div className="text-gray-600">Task</div>
                                        <div>Created Task</div>
                                        <div className="text-gray-800">Website Project</div>
                                        <div className="text-gray-800">2 hours ago</div>
                                    </div>

                                    <div className="grid grid-cols-4 p-4 items-center">
                                        <div className="text-gray-600">Learning Plan</div>
                                        <div>Updated Plan</div>
                                        <div className="text-gray-800">UI Design</div>
                                        <div className="text-gray-800">Yesterday</div>
                                    </div>

                                    <div className="grid grid-cols-4 bg-green-50/70 rounded-xl p-4 items-center">
                                        <div className="text-gray-600">Scheduler</div>
                                        <div>Added Schedule</div>
                                        <div className="text-gray-800">Mathematics</div>
                                        <div className="text-gray-800">3 days ago</div>
                                    </div>

                                    <div className="grid grid-cols-4 p-4 items-center">
                                        <div className="text-gray-600">Materials</div>
                                        <div>Added Material</div>
                                        <div className="text-gray-800">Database Notes</div>
                                        <div className="text-gray-800">Jun 18</div>
                                    </div>

                                     <div className="grid grid-cols-4 bg-green-50/70 rounded-xl p-4 items-center">
                                        <div className="text-gray-600">Scheduler</div>
                                        <div>Added Schedule</div>
                                        <div className="text-gray-800">Mathematics</div>
                                        <div className="text-gray-800">3 days ago</div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-6">
                                    <button className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center gap-2">
                                        View All Activity
                                        <ChevronDown size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col gap-6 w-full xl:max-w-sm xl:ml-auto mt-4 xl:mt-0">
                    <h2 className="text-xl font-bold mb-1">Your Streak</h2>
                    <style>{`@keyframes floatAnimation { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }`}</style>

                    <style>{`
                        @keyframes pulseBorder {
                            0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
                            50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
                        }
                        @keyframes shakeSlow {
                            0%, 100% { transform: rotate(0deg); }
                            20% { transform: rotate(-8deg); }
                            40% { transform: rotate(8deg); }
                            60% { transform: rotate(-5deg); }
                            80% { transform: rotate(5deg); }
                        }
                    `}</style>

                    {/* ⚠️ Warning Streak Card – Judul Commite */}
                    <div className="w-full relative rounded-b-lg overflow-hidden" style={{ animation: 'pulseBorder 2s ease-in-out infinite', borderRadius: '0.5rem' }}>
                        <div className="bg-red-500 text-white font-bold px-4 py-1.5 text-sm w-full rounded-t-lg flex justify-between items-center">
                            <span>Scheduler</span>
                            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black tracking-wide animate-pulse">⚠️ STREAK AT RISK</span>
                        </div>

                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 border-t-0 rounded-b-lg p-5 relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-red-300/20 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="absolute left-[-10px] bottom-[-10px] w-20 h-20 bg-orange-300/20 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="w-3/4 z-10 relative">
                                <h3 className="font-bold text-gray-800 text-[16px] mb-1">Committte</h3>

                                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 border border-red-300 text-red-600 mb-2">
                                    💀 2 days inactive
                                </span>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {Array.from({ length: 27 }).map((_, i) => {
                                        const isMissed = i >= 25;
                                        return (
                                            <div key={i} className="group relative">
                                                <div className={`h-3 w-3 rounded-[3px] transition-transform group-hover:scale-125 ${isMissed ? 'bg-gray-200 border border-red-200' : 'bg-red-400'}`}></div>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                                                    {isMissed ? 'Missed — streak break!' : 'Task Committed'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p className="text-red-500 text-[11px] font-bold leading-tight">
                                    🔴 Resume today or your streak will reset!
                                </p>
                            </div>

                            <div className="absolute right-[15px] bottom-[30px] w-24 h-35 pointer-events-none opacity-95 group-hover:opacity-100 transition-opacity scale-x-[-1] z-20">
                                        <img
                                            src={maskotAngry}
                                            alt="Streak at risk"
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                            style={{ animation: 'floatAnimation 3s ease-in-out infinite' }}
                                        />
                                    </div>
                        </div>
                    </div>

                    {userStreaks.map((streak) => {
                        if (streak.category === "Global Productivity") {
                            return (
                                <div key={streak.id} className="w-full relative shadow-lg rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 border-2 border-orange-300 p-6 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
                                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/40 rounded-full blur-2xl group-hover:bg-white/60 transition-colors"></div>
                                    <div className="absolute left-[-20px] bottom-[-20px] w-32 h-32 bg-orange-400/20 rounded-full blur-2xl group-hover:bg-orange-400/30 transition-colors"></div>

                                    <div className="relative z-10">
                                        <div className="flex flex-col items-start mb-4">
                                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-sm mb-2">My Streak</span>

                                            <h3 className="font-extrabold text-gray-900 text-xl leading-tight mb-2">Overall Activity</h3>

                                            <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-orange-200 shadow-sm flex items-center gap-1.5 font-bold text-orange-600 text-sm mb-3">
                                                🔥 {streak.days} Days
                                            </div>

                                            <p className="text-gray-700 text-sm font-medium italic max-w-[200px] leading-relaxed">
                                                "Small steps every day lead to big results. Keep it up!"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="absolute right-[-10px] bottom-[-10px] w-40 h-40 pointer-events-none opacity-95 group-hover:opacity-100 transition-opacity scale-x-[-1] z-20">
                                        <img
                                            src={streak.mascot}
                                            alt={streak.category}
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                            style={{ animation: streak.mascotAnimation }}
                                        />
                                    </div>
                                </div>
                            );
                        }

                        if (streak.type === "friend") {
                            const avatarColors = [
                                "bg-red-400", "bg-pink-400", "bg-rose-400", "bg-orange-400",
                                "bg-amber-400", "bg-lime-500", "bg-emerald-500", "bg-teal-500",
                            ];
                            const pct = Math.round((activeFriend.plans / totalMaxPlans) * 100);

                            // Visual theme for the card
                            const theme = {
                                bgTop: "bg-[#fc6c68]",
                                gradient: "bg-gradient-to-r from-white to-red-50",
                                border: "border-red-200",
                                shadow: "shadow-[0_8px_20px_rgba(252,108,104,0.15)]",
                                bar: "bg-[#fc6c68]",
                                barBg: "bg-red-100",
                            };

                            return (
                                <div key={streak.id} className="w-full relative group">

                                    <button
                                        onClick={() => setFriendIndex(i => (i - 1 + friendsData.length) % friendsData.length)}
                                        className="absolute -left-3 top-[60%] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronLeft size={16} className="text-gray-600" />
                                    </button>

                                    <button
                                        onClick={() => setFriendIndex(i => (i + 1) % friendsData.length)}
                                        className="absolute -right-3 top-[60%] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition opacity-0 group-hover:opacity-100"
                                    >
                                        <ChevronRight size={16} className="text-gray-600" />
                                    </button>

                                    <div className={`w-full relative transition duration-300 rounded-b-lg ${theme.shadow}`}>
                                        <div className={`${theme.bgTop} text-white font-bold px-4 py-1.5 text-sm w-full rounded-t-lg flex justify-between items-center`}>
                                            <span>Learning Plan</span>
                                            <div className="flex gap-1">
                                                {friendsData.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setFriendIndex(i)}
                                                        className={`w-2 h-2 rounded-full transition-all ${i === friendIndex ? 'bg-white scale-125' : 'bg-white/40'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className={`${theme.gradient} border-2 ${theme.border} border-t-0 rounded-b-lg p-5 relative overflow-hidden flex flex-col justify-between min-h-[155px]`}>

                                            <div className="flex items-center justify-between">
                                                <div className="flex-1 pr-6 pb-2">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className={`shrink-0 w-10 h-10 rounded-full ${avatarColors[friendIndex % avatarColors.length]} flex items-center justify-center text-white text-[16px] font-bold border-2 border-white shadow-sm`}>
                                                            {activeFriend.name[0]}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[15px] font-bold text-gray-800">{activeFriend.name}</span>
                                                            <span className="text-[11px] font-semibold text-gray-500">Plans completed</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex-1 h-2.5 rounded-full ${theme.barBg} overflow-hidden`}>
                                                            <div
                                                                className={`h-full rounded-full ${theme.bar} transition-all duration-500`}
                                                                style={{ width: `${pct}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[12px] font-bold text-[#fc6c68] w-8">{activeFriend.plans}x</span>
                                                    </div>
                                                </div>

                                                <div className="w-20 shrink-0 flex items-center justify-center">
                                                    <img
                                                        src={friendMascot.src}
                                                        alt="streak mascot"
                                                        className="w-16 h-16 object-contain drop-shadow-md"
                                                        style={{ animation: friendMascot.animation }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center mt-auto pt-3 border-t border-red-100 w-full">
                                                <span className="text-[10px] font-bold text-gray-400">Streak with {activeFriend.name}</span>
                                                <span className="ml-auto text-[10px] text-gray-400">{friendIndex + 1} / {friendsData.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Default → dot-box streak (e.g. Scheduler)
                        // Skip placeholder entries that have no theme
                        if (!streak.theme) return null;

                        return (
                            <div key={streak.id} className={`w-full relative shadow-sm transition duration-300 rounded-b-lg ${streak.theme.shadow}`}>
                                <div className={`${streak.theme.bgTop} text-white font-bold px-4 py-1.5 text-sm w-full rounded-t-lg flex justify-between items-center`}>
                                    <span>{streak.category}</span>
                                </div>
                                <div className={`${streak.theme.gradient} border-2 ${streak.theme.border} border-t-0 rounded-b-lg p-5 flex justify-between relative overflow-hidden min-h-[155px]`}>
                                    <div className="w-3/4 z-10 flex flex-col items-start h-full">
                                        <h3 className="font-bold text-gray-800 text-[16px] mb-1.5">{streak.title}</h3>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/70 border border-gray-200 text-gray-600 mb-2">🔥 {streak.days} days</span>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {Array.from({ length: 27 }).map((_, i) => {
                                                const isCompleted = streak.pattern(i);
                                                return (
                                                    <div key={i} className="group relative">
                                                        <div className={`h-3 w-3 rounded-[3px] transition-transform group-hover:scale-125 ${isCompleted ? streak.theme.boxCompleted : streak.theme.boxMissed}`}></div>
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                                                            {isCompleted ? streak.completedText : streak.missedText}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="flex items-center text-xs text-gray-600 font-semibold gap-2 mt-auto">
                                            <span className="text-gray-500 mr-1">{streak.points}</span>
                                            {streak.collaborators && streak.collaborators.length > 0 ? (
                                                <>
                                                    <div className="flex -space-x-1.5 mr-1">
                                                        {streak.collaborators.map((color, idx) => (
                                                            <div key={idx} className={`h-5 w-5 rounded-full ${color} flex items-center justify-center text-white border border-white`}><User size={10} /></div>
                                                        ))}
                                                    </div>
                                                    <span className="text-gray-500 text-[11px] font-bold">Collaborators</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-500 text-[11px] font-bold">Personal Streak</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`pointer-events-none ${streak.mascotClass}`}>
                                        <img
                                            src={streak.mascot}
                                            alt={streak.category}
                                            className="w-full h-full object-contain drop-shadow-xl"
                                            style={{ animation: streak.mascotAnimation }}
                                        />
                                        <div className={`absolute -inset-4 ${streak.theme.mascotBg} blur-2xl rounded-full -z-10`}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}