import React from 'react';
import { FileText, CheckCircle2, PlayCircle } from 'lucide-react';

export default function SessionRoadmapCard({ session }) {
  const isInProgress = session.status === 'IN PROGRESS';
  const isDone = session.status === 'DONE';
  
  const badgeColors = {
    gray: 'text-gray-500 border-gray-200 bg-white',
    green: 'text-green-600 bg-green-50 border-green-200',
    purple: 'text-purple-600 bg-purple-50 border-purple-200',
  };
  
  // Determine icon based on badge icon or session type
  const iconType = session.badge?.icon || session.type;
  const badgeIcon = iconType === 'file' || iconType === 'reading'
    ? <FileText size={12} />
    : iconType === 'check' || iconType === 'quiz'
    ? <CheckCircle2 size={12} />
    : <PlayCircle size={12} />;

  return (
    <div
      className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 ${
        isInProgress ? 'border-2 border-[#FBA834]'
        : isDone ? 'border border-gray-100 bg-gray-50 opacity-60'
        : 'border border-gray-100 bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 ${
          isInProgress ? 'bg-[#FFE9CC] text-[#FBA834]'
          : isDone ? 'bg-gray-200 text-gray-400'
          : 'bg-gray-700 text-white'
        }`}>
          {isDone ? <CheckCircle2 size={16} className="text-[#5D6BDE] sm:w-[20px] sm:h-[20px]" /> : session.num}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <p className={`font-bold text-[13.5px] sm:text-[15px] pr-2 ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>{session.title}</p>
            <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide ml-1 shrink-0 ${
              isInProgress ? 'text-[#FBA834]'
              : isDone ? 'text-[#5D6BDE]'
              : 'text-gray-500 bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded-full'
            }`}>
              {isDone ? 'COMPLETED' : session.status}
            </span>
          </div>
          
          {isInProgress && session.pct !== undefined && (
            <>
              <div className="flex justify-between text-[11px] sm:text-xs text-gray-500 mt-1 sm:mt-1.5 mb-1.5 sm:mb-2">
                <span>{session.pct}% Completed</span>
                <span className="text-[#FBA834] font-semibold">{session.timeLeft}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-2 sm:mb-3">
                <div className="h-1.5 sm:h-2 rounded-full bg-[#FBA834]" style={{ width: `${session.pct}%` }}></div>
              </div>
            </>
          )}
          
          {!isInProgress && session.estTime && (
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 mb-1.5 sm:mb-2">Est. Time: {session.estTime}</p>
          )}
          
          <span className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold border rounded-md sm:rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 ${badgeColors[session.badgeColor] || badgeColors.gray}`}>
            {React.cloneElement(badgeIcon, { size: 10, className: "sm:w-3 sm:h-3" })}
            {session.badge?.label || 'Material'}
          </span>
        </div>
      </div>
    </div>
  );
}
