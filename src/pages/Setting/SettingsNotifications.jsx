import { useState } from 'react';
import { User, Bell, Users, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import SettingsSidebar from '../../components/SettingsSidebar';

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
            className={`relative inline-flex w-12 h-6 shrink-0 rounded-full transition-colors duration-300 focus:outline-none ${enabled ? 'bg-[#4D63E6]' : 'bg-gray-200'
                }`}
        >
            <span
                className={`inline-block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 m-0.5 ${enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
            />
        </button>
    );
}

export default function SettingsNotifications() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState(notificationSettings);

    const [toast, setToast] = useState(null);
    const [errorToast, setErrorToast] = useState(null);

    const showErrorToast = (message) => {
        setErrorToast(message);
        setTimeout(() => {
            setErrorToast(null);
        }, 2000);
    };

    const showToast = (message, conf) => {
        setToast(message);
        if (conf) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 9999
            });
        }
        setTimeout(() => {
            setToast(null);
        }, 2000);
    };

    const toggleSetting = (id) => {
        setSettings(prev =>
            prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
        );
    };

    const handleSendTest = () => {
        showToast('🔔 Test notification sent!', false);
    };

    const handleSaveAll = () => {
        showToast('Notification preferences saved!', true);
    };

    return (
        <>
        <div className="flex flex-col md:flex-row bg-white rounded-[24px] border border-gray-200 shadow-sm w-full min-h-[650px] overflow-hidden m-0 p-0">
            {/* Setting Sidebar */}
            <SettingsSidebar />

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
                            className={`flex items-center justify-between px-6 py-5 gap-4 transition hover:bg-gray-50/70 ${index !== settings.length - 1 ? 'border-b border-gray-100' : ''
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
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
                    <div className="bg-white border shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20}/>
                        <p className="text-sm font-medium text-gray-700">
                            {toast}
                        </p>
                    </div>
                </div>
            )}

            {errorToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
                    <div className="bg-white border shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3 border-red-100">
                        <XCircle className="text-red-500" size={20}/>
                        <p className="text-sm font-medium text-gray-700">
                            {errorToast}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
