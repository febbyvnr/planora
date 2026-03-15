import { useState } from 'react';
import { User, Bell, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const notificationSettings = [
    {
        id: 'task_reminders',
        title: 'Task Reminders',
        description: 'Get notified before your tasks are due',
        enabled: true,
    },
    {
        id: 'schedule_updates',
        title: 'Schedule Updates',
        description: 'Receive alerts when your schedule changes',
        enabled: true,
    },
    {
        id: 'learning_progress',
        title: 'Learning Progress',
        description: 'Weekly summary of your learning plan progress',
        enabled: false,
    },
    {
        id: 'streak_alerts',
        title: 'Streak Alerts',
        description: 'Don\'t break your streak! Get reminded to stay consistent',
        enabled: true,
    },
    {
        id: 'friend_activity',
        title: 'Friend Activity',
        description: 'See when friends complete tasks or update their plans',
        enabled: false,
    },
    {
        id: 'system_announcements',
        title: 'System Announcements',
        description: 'Important updates and announcements from Planora',
        enabled: true,
    },
];

function Toggle({ enabled, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className={`relative inline-flex w-12 h-6 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${
                enabled ? 'bg-[#4D63E6]' : 'bg-gray-200'
            }`}
        >
            <span
                className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 m-0.5 ${
                    enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
        </button>
    );
}

export default function SettingsNotifications() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(notificationSettings);

    const toggleSetting = (id) => {
        setSettings(prev =>
            prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
        );
    };

    const handleSendTest = () => {
        toast.info('🔔 Test notification sent!', { icon: false });
    };

    const handleSaveAll = () => {
        toast.success('Notification preferences saved!');
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-[24px] border border-gray-200 shadow-sm w-full min-h-[650px] overflow-hidden m-0 p-0">
            {/* Setting Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E8E8E8] shrink-0 pt-6 md:pt-8 pb-4 flex flex-col items-center">
                <div className="hidden md:block w-full px-8 mb-6 text-left">
                    <h2 className="text-[17px] font-extrabold text-black">Setting</h2>
                </div>
                <nav className="flex flex-row md:flex-col overflow-x-auto gap-2 w-full px-4 pb-2 md:pb-0 shrink-0">
                    <button
                        onClick={() => navigate('/settings')}
                        className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl whitespace-nowrap w-auto md:w-full transition"
                    >
                        <User size={18} strokeWidth={2} />
                        Olivia's
                    </button>
                    <button className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 bg-[#EEF1FD] text-[#4D63E6] font-bold rounded-xl whitespace-nowrap w-auto md:w-full transition">
                        <Bell size={18} strokeWidth={2} />
                        Notifications
                    </button>
                    <button
                        onClick={() => navigate('/settings/friends')}
                        className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl whitespace-nowrap w-auto md:w-full transition"
                    >
                        <Users size={18} strokeWidth={2} />
                        Friends
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 bg-[#FBFBFC] pt-8 md:pt-10 px-6 md:px-10 pb-12 overflow-y-auto">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-[24px] md:text-[28px] font-extrabold text-black">Notifications</h1>
                        <p className="text-gray-400 text-[14px] font-medium mt-1">Manage how and when you want to be notified</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSendTest}
                            className="bg-[#EEF1FD] hover:bg-[#D8DDFA] text-[#4D63E6] font-semibold px-5 py-2.5 rounded-[12px] text-[14px] transition"
                        >
                            Send Test Notification
                        </button>
                    </div>
                </div>

                {/* Notification Toggles */}
                <div className="border-[3px] border-[#93918D] rounded-2xl bg-white overflow-hidden">
                    {settings.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between px-6 py-5 gap-4 transition hover:bg-gray-50/70 ${
                                index !== settings.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                        >
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-[15px] text-[#3B3B3B]">{item.title}</p>
                                <p className="text-gray-400 text-[13px] font-medium mt-0.5">{item.description}</p>
                            </div>
                            <Toggle enabled={item.enabled} onToggle={() => toggleSetting(item.id)} />
                        </div>
                    ))}
                </div>

                {/* Save button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSaveAll}
                        className="bg-[#4D63E6] hover:bg-[#3C4FB7] text-white font-bold px-8 py-3 rounded-[12px] text-[15px] transition shadow-[0_4px_12px_rgba(77,99,230,0.3)] hover:shadow-[0_6px_18px_rgba(77,99,230,0.4)] hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
}
