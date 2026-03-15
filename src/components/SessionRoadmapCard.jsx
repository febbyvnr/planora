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
      className={`rounded-2xl p-4 ${
        isInProgress ? 'border-2 border-[#FBA834]'
        : isDone ? 'border border-gray-100 bg-gray-50 opacity-60'
        : 'border border-gray-100 bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
          isInProgress ? 'bg-[#FFE9CC] text-[#FBA834]'
          : isDone ? 'bg-gray-200 text-gray-400'
          : 'bg-gray-700 text-white'
        }`}>
          {isDone ? <CheckCircle2 size={20} className="text-[#5D6BDE]" /> : session.num}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className={`font-bold text-[15px] ${isDone ? 'line-through text-gray-400' : 'text-gray-900'}`}>{session.title}</p>
            <span className={`text-[10px] font-extrabold uppercase tracking-wide ml-2 shrink-0 ${
              isInProgress ? 'text-[#FBA834]'
              : isDone ? 'text-[#5D6BDE]'
              : 'text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full'
            }`}>
              {isDone ? 'COMPLETED' : session.status}
            </span>
          </div>
          
          {isInProgress && session.pct !== undefined && (
            <>
              <div className="flex justify-between text-xs text-gray-500 mt-1.5 mb-2">
                <span>{session.pct}% Completed</span>
                <span className="text-[#FBA834] font-semibold">{session.timeLeft}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="h-2 rounded-full bg-[#FBA834]" style={{ width: `${session.pct}%` }}></div>
              </div>
            </>
          )}
          
          {!isInProgress && session.estTime && (
            <p className="text-xs text-gray-400 mt-1 mb-2">Est. Time: {session.estTime}</p>
          )}
          
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold border rounded-lg px-2.5 py-1 ${badgeColors[session.badgeColor] || badgeColors.gray}`}>
            {badgeIcon}
            {session.badge?.label || 'Material'}
          </span>
        </div>
      </div>
    </div>
  );
}
