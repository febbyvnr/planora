import { useState, useRef, useEffect } from "react";
import { Bell, Menu, BookOpen, Users, CheckCircle2, Trophy, Clock, MessageSquare, X } from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'plan_invite',
    icon: <Users size={18} />,
    iconBg: 'bg-[#EEF0FD]',
    iconColor: 'text-[#5D6BDE]',
    title: 'New Plan Invitation',
    message: 'Marcus Chen invited you to join "Calculus Study Group"',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    type: 'session_complete',
    icon: <CheckCircle2 size={18} />,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    title: 'Session Completed',
    message: 'You finished "Reading: Market Fundamentals" — great work!',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    type: 'streak',
    icon: <Trophy size={18} />,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    title: '5-Day Streak! 🔥',
    message: "You've studied 5 days in a row. Keep the momentum going!",
    time: '3 hours ago',
    unread: false,
  },
  {
    id: 4,
    type: 'reminder',
    icon: <Clock size={18} />,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    title: 'Study Reminder',
    message: 'Your "Thesis Research" session starts in 30 minutes',
    time: '5 hours ago',
    unread: false,
  },
  {
    id: 5,
    type: 'comment',
    icon: <MessageSquare size={18} />,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    title: 'New Comment',
    message: 'Antonia commented on your "Organic Chemistry" plan',
    time: 'Yesterday',
    unread: false,
  },
];

export default function Header({ onMenuClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="w-full flex justify-between md:justify-end items-center py-4 px-4 md:px-8 bg-white border-b border-gray-100 h-20 shrink-0 z-20 sticky top-0">

      {/* Mobile Menu Icon */}
      <div 
        className="md:hidden flex items-center text-gray-500 cursor-pointer hover:text-gray-800 transition"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6" />
        <span className="ml-3 font-bold text-lg text-[#4B4E9A]">Planora</span>
      </div>

      <div className="flex items-center">
        {/* Notification Icon + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="relative cursor-pointer text-orange-400 hover:text-orange-500 transition p-2 rounded-xl hover:bg-orange-50"
            onClick={() => setShowNotifications(prev => !prev)}
          >
            <Bell className="fill-current w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center h-[18px] min-w-[18px] px-1 rounded-full bg-orange-500 ring-2 ring-white text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* Dropdown Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[17px] font-extrabold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-orange-100 text-orange-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className="text-[12px] font-semibold text-[#5D6BDE] hover:text-[#4C5AC7] transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-[380px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Bell size={22} className="text-gray-300" />
                    </div>
                    <p className="text-gray-900 font-bold text-sm mb-0.5">All caught up!</p>
                    <p className="text-gray-400 text-xs">No notifications right now</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div 
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`flex items-start gap-3 px-5 py-3.5 cursor-pointer transition-colors group relative ${
                        notif.unread 
                          ? 'bg-[#FAFBFF] hover:bg-[#F0F2FF]' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {/* Unread dot */}
                      {notif.unread && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#5D6BDE]" />
                      )}

                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl ${notif.iconBg} ${notif.iconColor} flex items-center justify-center shrink-0 mt-0.5`}>
                        {notif.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] leading-tight mb-0.5 ${notif.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                          {notif.title}
                        </p>
                        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{notif.message}</p>
                        <p className="text-[11px] text-gray-400 mt-1 font-medium">{notif.time}</p>
                      </div>

                      {/* Dismiss button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeNotification(notif.id); }}
                        className="p-1 rounded-lg text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 shrink-0 mt-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

            
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 border-l border-gray-300 mx-2 md:mx-4 text-gray-400"></div>

        {/* User Profile */}
        <div className="flex items-center ml-2 md:ml-4 cursor-pointer">
          <div className="text-right mr-3 hidden sm:block">
            <p className="text-sm font-bold text-gray-800">Olivia</p>
            <p className="text-xs text-gray-500">olivia123@gmail.com</p>
          </div>
          <div className="h-10 w-10 min-w-[40px] rounded-full bg-red-100 flex items-center justify-center text-red-500 border border-red-200 overflow-hidden">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-75 mt-2">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
