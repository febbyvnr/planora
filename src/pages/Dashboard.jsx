import { User } from "lucide-react";
import maskotLegendaris from '../assets/images/maskot-streak-legendaris.png';
import maskot50Hari from '../assets/images/maskot-streak-50 hari.png';
import maskot30Hari from '../assets/images/maskot-streak-30 hari.png';
import ProductivityChart from '../components/ProductivityChart';

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8 text-gray-800 pb-10">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-[#4B4E9A]">
                    Welcome back, <span className="text-red-500">Olivia</span>!
                </h1>
                <p className="text-xl text-gray-600 mt-3 font-medium">
                    Let's plan something{' '}
                    <span className="relative z-10">
                        productive
                        <span className="absolute bottom-1 left-0 w-full h-[3px] bg-green-500 -z-10"></span>
                    </span>{' '}
                    today
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">

                {/* Left/Main Column */}
                <div className="xl:col-span-2 flex flex-col gap-6 md:gap-8 overflow-hidden w-full">

                    {/* Productivity Pulse */}
                    <div className="p-0 rounded-2xl w-full">
                        <h2 className="text-xl font-bold mb-2">Productivity Pulse</h2>
                        <p className="text-sm text-gray-500 mb-6 font-medium">
                            Watch your productivity grow! This graph shows how consistent you are with the schedules you create and complete
                        </p>

                        <div className="mt-4">
                            <ProductivityChart />
                        </div>
                    </div>

                    {/* Recently Updates */}
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
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column / Sidebar */}
                <div className="flex flex-col gap-6 w-full xl:max-w-sm xl:ml-auto mt-4 xl:mt-0">
                    <h2 className="text-xl font-bold mb-1">Your Streak</h2>

                    {/* Scheduler Streak */}
                    <div className="w-full relative shadow-[0_8px_20px_rgba(249,115,22,0.15)] hover:shadow-[0_12px_25px_rgba(249,115,22,0.25)] transition duration-300 rounded-b-lg">
                        <div className="bg-orange-400 text-white font-bold px-4 py-1.5 text-sm w-full rounded-t-lg block">Scheduler</div>
                        <div className="bg-gradient-to-r from-white to-orange-50 border-2 border-orange-200 border-t-0 rounded-b-lg p-5 flex justify-between relative overflow-hidden h-[155px]">
                            <div className="w-3/4 z-10">
                                <h3 className="font-bold text-gray-800 text-[16px] mb-3">Event Paskah 2026</h3>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {Array.from({ length: 27 }).map((_, i) => {
                                        const isCompleted = i % 7 !== 0 && i <= 20;
                                        return (
                                            <div key={i} className="group relative">
                                                <div className={`h-3 w-3 rounded-[3px] transition-transform group-hover:scale-125 ${isCompleted ? 'bg-orange-400' : 'bg-orange-100'}`}></div>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                                                    {isCompleted ? '100% Completed' : '0% Activity'}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex items-center text-xs text-gray-600 font-semibold gap-2 mt-auto">
                                    <span className="text-gray-500 mr-1">+20</span>
                                    <div className="flex -space-x-1.5 mr-1">
                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white border border-white"><User size={10} /></div>
                                        <div className="h-5 w-5 rounded-full bg-red-400 flex items-center justify-center text-white border border-white"><User size={10} /></div>
                                    </div>
                                    <span className="text-gray-500 text-[11px]">Collaborators</span>
                                </div>
                            </div>

                            {/* Mascot Icon placeholder (Golden leafy) */}
                            <div className="absolute right-[-10px] bottom-0 w-32 h-32 pointer-events-none">
                                <style>{`@keyframes floatAnimation { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }`}</style>
                                <img 
                                    src={maskotLegendaris} 
                                    alt="Mascot Legendaris" 
                                    className="w-full h-full object-contain drop-shadow-xl" 
                                    style={{ animation: 'floatAnimation 3s ease-in-out infinite' }}
                                />
                                <div className="absolute -inset-4 bg-orange-300/40 blur-2xl rounded-full -z-10 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Task Streak */}
                    <div className="w-full relative shadow-[0_8px_20px_rgba(72,40,184,0.15)] hover:shadow-[0_12px_25px_rgba(72,40,184,0.25)] transition duration-300 rounded-b-lg">
                        <div className="bg-[#4828b8] text-white font-bold px-4 py-1.5 text-sm w-full rounded-t-lg block">Task</div>
                        <div className="bg-gradient-to-r from-white to-indigo-50 border-2 border-indigo-200 border-t-0 rounded-b-lg p-5 flex justify-between relative overflow-hidden h-[155px]">
                            <div className="w-3/4 z-10">
                                <h3 className="font-bold text-gray-800 text-[16px] mb-3">Website Project</h3>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {Array.from({ length: 27 }).map((_, i) => {
                                        const isCompleted = !(i < 9 || i === 11 || i === 12);
                                        return (
                                            <div key={i} className="group relative">
                                                <div className={`h-3 w-3 rounded-[3px] transition-transform group-hover:scale-125 ${isCompleted ? 'bg-indigo-600' : 'bg-indigo-200'}`}></div>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                                                    {isCompleted ? '8 Tasks Done' : '0 Tasks'}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex items-center text-xs text-gray-600 font-semibold gap-2 mt-auto">
                                    <span className="text-gray-500 mr-1">+5</span>
                                    <div className="flex -space-x-1.5 mr-1">
                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white border border-white"><User size={10} /></div>
                                        <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-white border border-white"><User size={10} /></div>
                                    </div>
                                    <span className="text-gray-500 text-[11px]">Collaborators</span>
                                </div>
                            </div>

                            {/* Mascot Icon placeholder (Clover) */}
                            <div className="absolute right-[-10px] bottom-[-5px] w-32 h-32 pointer-events-none">
                                <img 
                                    src={maskot50Hari} 
                                    alt="Mascot 50 Hari" 
                                    className="w-full h-full object-contain drop-shadow-xl" 
                                    style={{ animation: 'floatAnimation 3.5s ease-in-out infinite' }}
                                />
                                <div className="absolute -inset-4 bg-indigo-300/30 blur-2xl rounded-full -z-10"></div>
                            </div>
                        </div>
                    </div>

                    {/* Learning Plan Streak */}
                    <div className="w-full relative shadow-[0_8px_20px_rgba(252,108,104,0.15)] hover:shadow-[0_12px_25px_rgba(252,108,104,0.25)] transition duration-300 rounded-b-lg">
                        <div className="bg-[#fc6c68] text-white font-bold px-4 py-1.5 text-sm w-full rounded-t-lg block">Learning Plan</div>
                        <div className="bg-gradient-to-r from-white to-red-50 border-2 border-red-200 border-t-0 rounded-b-lg p-5 flex justify-between relative overflow-hidden h-[155px]">
                            <div className="w-3/4 z-10">
                                <h3 className="font-bold text-gray-800 text-[16px] mb-3">Mathematics</h3>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {Array.from({ length: 27 }).map((_, i) => {
                                        const isCompleted = !(i < 6 || i > 23);
                                        return (
                                            <div key={i} className="group relative">
                                                <div className={`h-3 w-3 rounded-[3px] transition-transform group-hover:scale-125 ${isCompleted ? 'bg-[#fc6c68]' : 'bg-red-200'}`}></div>
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                                                    {isCompleted ? '100% Focused' : 'Missed'}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="flex items-center text-xs text-gray-600 font-semibold gap-2 mt-auto">
                                    <div className="flex -space-x-1.5 mr-1">
                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center text-white border border-white"><User size={10} /></div>
                                        <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-white border border-white"><User size={10} /></div>
                                    </div>
                                    <span className="text-gray-500 text-[11px]">Collaborators</span>
                                </div>
                            </div>

                            {/* Mascot Icon placeholder (Winking Clover) */}
                            <div className="absolute right-[-10px] bottom-[-5px] w-32 h-32 pointer-events-none">
                                <img 
                                    src={maskot30Hari} 
                                    alt="Mascot 30 Hari" 
                                    className="w-full h-full object-contain drop-shadow-xl" 
                                    style={{ animation: 'floatAnimation 4s ease-in-out infinite' }}
                                />
                                <div className="absolute -inset-4 bg-red-300/30 blur-2xl rounded-full -z-10"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}