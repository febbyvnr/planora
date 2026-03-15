import { Bell, Users, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SettingsSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to check if a path is active
    const isActive = (path) => location.pathname === path;

    return (
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E8E8E8] shrink-0 pt-6 md:pt-8 pb-4 flex flex-col items-center bg-[#FBFBFC] md:bg-white">
            <div className="hidden md:block w-full px-8 mb-6 text-left">
                <h2 className="text-[17px] font-extrabold text-black">Setting</h2>
            </div>
            <nav className="flex flex-row md:flex-col overflow-x-auto gap-2 md:gap-2 w-full px-4 pb-2 md:pb-0 scrollbar-hide shrink-0">
                <button 
                    onClick={() => navigate('/settings')}
                    className={`flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 rounded-xl whitespace-nowrap w-auto md:w-full transition ${isActive('/settings') ? 'bg-[#FCF6E9] shadow-sm text-gray-800 font-bold' : 'text-gray-600 font-medium hover:bg-gray-50'}`}>
                    <User size={18} strokeWidth={2} />
                    Olivia's
                </button>
                <button 
                    onClick={() => navigate('/settings/notifications')}
                    className={`flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 rounded-xl whitespace-nowrap w-auto md:w-full transition ${isActive('/settings/notifications') ? 'bg-[#FCF6E9] shadow-sm text-gray-800 font-bold' : 'text-gray-600 font-medium hover:bg-gray-50'}`}>
                    <Bell size={18} strokeWidth={2} />
                    Notifications
                </button>
                <button 
                    onClick={() => navigate('/settings/friends')}
                    className={`flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 rounded-xl whitespace-nowrap w-auto md:w-full transition ${isActive('/settings/friends') ? 'bg-[#FCF6E9] shadow-sm text-gray-800 font-bold' : 'text-gray-600 font-medium hover:bg-gray-50'}`}>
                    <Users size={18} strokeWidth={2} />
                    Friends
                </button>
            </nav>
        </div>
    );
}
