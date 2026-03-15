import { useState } from 'react';
import { Bell, Users, User, Pencil, Lock, Trash2, Camera, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import deleteImage from '../assets/images/materials-delete.png';

export default function Settings() {
    const navigate = useNavigate();
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [profileData, setProfileData] = useState({
        username: 'Olivia_901',
        email: 'olivia@gmail.com',
        phone: '+62 81212121'
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = () => {
        if (!profileData.username.trim() || !profileData.email.trim() || !profileData.phone.trim()) {
            toast.error('Please fill in all profile fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        toast.success('Profile successfully updated!');
        setIsEditingProfile(false);
    };

    const handleCancelProfile = () => {
        if (!profileData.username.trim() || !profileData.email.trim() || !profileData.phone.trim()) {
            toast.error('Please fill in all profile fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsEditingProfile(false);
    };

    return (
        <>
        <div className="flex flex-col md:flex-row bg-white rounded-[24px] border border-gray-200 shadow-sm w-full min-h-[650px] overflow-hidden m-0 p-0">
            {/* Setting Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E8E8E8] shrink-0 pt-6 md:pt-8 pb-4 flex flex-col items-center">
                <div className="hidden md:block w-full px-8 mb-6 text-left">
                    <h2 className="text-[17px] font-extrabold text-black">Setting</h2>
                </div>
                <nav className="flex flex-row md:flex-col overflow-x-auto gap-2 md:gap-2 w-full px-4 pb-2 md:pb-0 scrollbar-hide shrink-0">
                    <button className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 bg-[#FCF6E9] shadow-sm rounded-xl text-gray-800 font-bold whitespace-nowrap w-auto md:w-full transition">
                        <User size={18} strokeWidth={2} />
                        Olivia's
                    </button>
                    <button 
                        onClick={() => navigate('/settings/notifications')}
                        className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl whitespace-nowrap w-auto md:w-full transition">
                        <Bell size={18} strokeWidth={2} />
                        Notifications
                    </button>
                    <button className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl whitespace-nowrap w-auto md:w-full transition">
                        <Users size={18} strokeWidth={2} />
                        Friends
                    </button>
                </nav>
            </div>

            {/* Content Page */}
            <div className="flex-1 bg-[#FBFBFC] pt-8 md:pt-10 px-6 md:px-10 pb-12 overflow-y-auto">
                <h1 className="text-[24px] md:text-[28px] font-extrabold text-black mb-6 md:mb-8">My Account</h1>

                <div className="flex flex-col gap-5 w-full">
                    
                    {/* Profile Section */}
                    <div className="border-[3px] border-[#93918D] rounded-2xl bg-white px-5 md:px-8 py-6 relative">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-[#403B38]">
                                {isEditingProfile ? "Update Profile" : "Profile"}
                            </h2>
                            
                            {!isEditingProfile ? (
                                <button 
                                    onClick={() => setIsEditingProfile(true)}
                                    className="bg-[#4D63E6] hover:bg-[#3C4FB7] w-full sm:w-auto text-white font-semibold px-5 py-2.5 rounded-[10px] flex justify-center items-center gap-2 text-[14px] transition shadow-sm"
                                >
                                    <Pencil size={15} strokeWidth={2.5} />
                                    Edit Profile
                                </button>
                            ) : (
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button 
                                        onClick={handleCancelProfile}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-[10px] flex-1 sm:flex-none flex justify-center items-center gap-2 text-[14px] transition"
                                    >
                                        <X size={15} strokeWidth={2.5} />
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSaveProfile}
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-[10px] flex-1 sm:flex-none flex justify-center items-center gap-2 text-[14px] transition shadow-sm"
                                    >
                                        <Save size={15} strokeWidth={2.5} />
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10 mt-2">
                            {/* Avatar */}
                            <div className="relative shrink-0 w-32 h-32">
                                <div className="w-full h-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-red-100 flex items-end justify-center text-red-500">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[85%] h-[85%] opacity-75">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {isEditingProfile && (
                                    <button className="absolute -bottom-2 -right-3 bg-[#F2BD41] text-white p-1.5 rounded-[10px] border-[3px] border-white shadow-sm flex items-center justify-center hover:bg-[#dca631] transition">
                                        <Camera size={16} strokeWidth={3} />
                                    </button>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-[#716A65] tracking-widest capitalize">Username</label>
                                        <input 
                                            type="text" 
                                            name="username"
                                            value={profileData.username} 
                                            onChange={handleProfileChange}
                                            className={`w-full px-4 py-3 border border-[#DEAC44] text-[#63553C] text-[15px] font-medium rounded-md outline-none transition ${isEditingProfile ? 'bg-[#FFF9EE] focus:ring-2 focus:ring-[#DEAC44]/50' : 'bg-[#FCF6E9]'}`} 
                                            readOnly={!isEditingProfile}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-[#716A65] tracking-widest capitalize">Email</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={profileData.email} 
                                            onChange={handleProfileChange}
                                            className={`w-full px-4 py-3 border border-[#DEAC44] text-[#63553C] text-[15px] font-medium rounded-md outline-none transition ${isEditingProfile ? 'bg-[#FFF9EE] focus:ring-2 focus:ring-[#DEAC44]/50' : 'bg-[#FCF6E9]'}`} 
                                            readOnly={!isEditingProfile}
                                        />
                                    </div>
                                    <div className="space-y-1.5 md:col-span-1">
                                        <label className="text-[13px] font-bold text-[#716A65] tracking-widest capitalize">Phone Number</label>
                                        <input 
                                            type="text" 
                                            name="phone"
                                            value={profileData.phone} 
                                            onChange={handleProfileChange}
                                            className={`w-full px-4 py-3 border border-[#DEAC44] text-[#63553C] text-[15px] font-medium rounded-md outline-none transition ${isEditingProfile ? 'bg-[#FFF9EE] focus:ring-2 focus:ring-[#DEAC44]/50' : 'bg-[#FCF6E9]'}`} 
                                            readOnly={!isEditingProfile}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="border-[3px] border-[#93918D] rounded-2xl bg-white px-5 md:px-8 py-6 flex flex-col items-start w-full overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-bold text-[#403B38] mb-5">Password</h2>
                        <button onClick={() => navigate('/settings/change-password')} className="bg-[#4D63E6] hover:bg-[#3C4FB7] text-white font-semibold flex-1 w-full sm:w-auto sm:px-5 py-3 sm:py-2.5 rounded-[10px] flex justify-center items-center gap-2 text-[14px] transition shadow-sm">
                            <Lock size={15} strokeWidth={2.5} />
                            Change Password
                        </button>
                    </div>

                    {/* Account Removal Section */}
                    <div className="border-[3px] border-[#93918D] rounded-2xl bg-white px-5 md:px-8 py-6 flex flex-col items-start w-full overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-bold text-[#403B38] mb-5">Account Removal</h2>
                        <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-[#ED5856] hover:bg-[#C83E3D] text-white font-semibold flex-1 w-full sm:w-auto sm:px-5 py-3 sm:py-2.5 rounded-[10px] flex justify-center items-center gap-2 text-[14px] transition shadow-sm"
                        >
                            <Trash2 size={15} strokeWidth={2.5} />
                            Delete My Account
                        </button>
                    </div>

                </div>
            </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}>
                <div 
                    className="bg-white rounded-[32px] shadow-2xl w-full max-w-[420px] p-8 flex flex-col items-center text-center relative"
                    onClick={e => e.stopPropagation()}
                    style={{ animation: 'fadeInScale 0.25s ease-out' }}
                >
                    <style>{`@keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>

                    <div className="w-48 h-48 mb-4 flex items-center justify-center">
                        <img 
                            src={deleteImage} 
                            alt="Delete Account" 
                            className="w-full h-full object-contain drop-shadow-md"
                            style={{ animation: 'floatAnimation 3s ease-in-out infinite' }}
                        />
                        <style>{`@keyframes floatAnimation { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`}</style>
                    </div>

                    <h2 className="text-3xl font-extrabold text-black mb-3 tracking-tight">Delete Confirmation</h2>
                    <p className="text-gray-500 text-[15px] font-medium mb-1">Are you sure want to delete account?</p>
                    <p className="text-[#ED5856] font-bold text-[15px] mb-8">This action cannot be undone</p>

                    <div className="flex gap-4 w-full">
                        <button 
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[16px] transition"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                setShowDeleteModal(false);
                                toast.success('Account deleted.');
                            }}
                            className="flex-1 py-4 rounded-2xl bg-[#ED5856] hover:bg-[#C83E3D] text-white font-bold text-[16px] transition shadow-[0_4px_14px_rgba(237,88,86,0.4)] hover:shadow-[0_6px_20px_rgba(237,88,86,0.5)] hover:-translate-y-0.5"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
