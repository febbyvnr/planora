import { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, CheckSquare, BookOpen } from "lucide-react";

const productivityData = {
    months: {
        title: "Year 2025",
        data: [
            { name: 'Jan', total: 30, scheduler: 12, task: 10, learning: 8 },
            { name: 'Feb', total: 15, scheduler: 5, task: 6, learning: 4 },
            { name: 'Mar', total: 45, scheduler: 15, task: 20, learning: 10 },
            { name: 'Apr', total: 80, scheduler: 30, task: 35, learning: 15 },
            { name: 'May', total: 50, scheduler: 20, task: 15, learning: 15 },
            { name: 'Jun', total: 90, scheduler: 35, task: 35, learning: 20 },
        ]
    },
    weeks: {
        title: "January 2025",
        data: [
            { name: 'Week 1', total: 20, scheduler: 8, task: 7, learning: 5 },
            { name: 'Week 2', total: 35, scheduler: 15, task: 12, learning: 8 },
            { name: 'Week 3', total: 25, scheduler: 10, task: 10, learning: 5 },
            { name: 'Week 4', total: 40, scheduler: 15, task: 15, learning: 10 },
        ]
    },
    days: {
        title: "Jan 2025, Week 1",
        data: [
            { name: 'Mon', total: 10, scheduler: 4, task: 4, learning: 2 },
            { name: 'Tue', total: 15, scheduler: 5, task: 6, learning: 4 },
            { name: 'Wed', total: 5, scheduler: 2, task: 2, learning: 1 },
            { name: 'Thu', total: 20, scheduler: 8, task: 8, learning: 4 },
            { name: 'Fri', total: 12, scheduler: 4, task: 5, learning: 3 },
            { name: 'Sat', total: 8, scheduler: 2, task: 4, learning: 2 },
            { name: 'Sun', total: 25, scheduler: 10, task: 10, learning: 5 },
        ]
    }
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-lg flex flex-col gap-3 min-w-[180px]">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                    <p className="text-gray-700 font-bold">{label}</p>
                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs">
                        {data.total} Total
                    </span>
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Calendar size={12} className="text-orange-400" />
                            <span>Scheduler</span>
                        </div>
                        <span className="font-semibold text-gray-700">{data.scheduler}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <CheckSquare size={12} className="text-indigo-500" />
                            <span>Task</span>
                        </div>
                        <span className="font-semibold text-gray-700">{data.task}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <BookOpen size={12} className="text-red-400" />
                            <span>Learning Plan</span>
                        </div>
                        <span className="font-semibold text-gray-700">{data.learning}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default function ProductivityChart() {
    const [viewMode, setViewMode] = useState('months'); // 'months', 'weeks', 'days'

    const currentData = productivityData[viewMode];

    return (
        <div className="relative border border-blue-100 rounded-xl p-5 shadow-[0_8px_30px_rgba(79,138,255,0.15)] bg-white h-[320px] flex flex-col justify-between overflow-hidden">
            {/* Chart Header */}
            <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 z-10 w-full mb-4">
                <div className="flex flex-wrap gap-2 font-bold text-sm text-gray-400">
                    <button 
                        onClick={() => setViewMode('months')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'months' ? 'text-blue-500 bg-blue-50' : 'hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        Months
                    </button>
                    <button 
                        onClick={() => setViewMode('weeks')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'weeks' ? 'text-blue-500 bg-blue-50' : 'hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        Weeks
                    </button>
                    <button 
                        onClick={() => setViewMode('days')}
                        className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'days' ? 'text-blue-500 bg-blue-50' : 'hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        Day
                    </button>
                </div>
                <div className="text-blue-500 font-bold text-xl">{currentData.title}</div>
            </div>

            {/* Chart Display */}
            <div className="relative w-full flex-1 min-h-0 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData.data} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F8AFF" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4F8AFF" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                            padding={{ left: 20, right: 20 }}
                            interval={0}
                        />
                        <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ stroke: '#93C5FD', strokeWidth: 1, strokeDasharray: '4 4' }} 
                            isAnimationActive={false} // Disable to prevent tooltip jittering sometimes
                        />
                        <Area 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#4F8AFF" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorTotal)" 
                            activeDot={{ r: 7, fill: '#fff', stroke: '#000', strokeWidth: 3 }}
                            dot={{ r: 5, fill: '#fff', stroke: '#000', strokeWidth: 3 }}
                            animationDuration={800}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
