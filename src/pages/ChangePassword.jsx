import { useState } from 'react';
import { X, User, Bell, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const navigate = useNavigate();
    const [focusedInput, setFocusedInput] = useState(null);
    
    // Form State
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.currentPassword.trim() && !formData.newPassword.trim() && !formData.confirmPassword.trim()) {
            toast.error('Please fill in all fields');
            return false;
        }

        if (formData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return false;
        }

        if (!formData.confirmPassword.trim()) {
            toast.error('Please confirm your new password');
            return false;
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            // Proceed with save logic here
            toast.success('Password successfully updated!');
            // E.g. navigate back to settings upon success
            // setTimeout(() => navigate('/settings'), 1500);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-[24px] border border-gray-200 shadow-sm w-full min-h-[650px] overflow-hidden m-0 p-0">
            {/* Setting Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E8E8E8] shrink-0 pt-6 md:pt-8 pb-4 flex flex-col items-center">
                <div className="hidden md:block w-full px-8 mb-6 text-left">
                    <h2 className="text-[17px] font-extrabold text-black">Setting</h2>
                </div>
                <nav className="flex flex-row md:flex-col overflow-x-auto gap-2 md:gap-2 w-full px-4 pb-2 md:pb-0 scrollbar-hide shrink-0">
                    <button 
                        onClick={() => navigate('/settings')}
                        className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 bg-[#FCF6E9] shadow-sm rounded-xl text-gray-800 font-bold whitespace-nowrap w-auto md:w-full transition hover:bg-[#FBE8C3]"
                    >
                        <User size={18} strokeWidth={2} />
                        Olivia's
                    </button>
                    <button className="flex items-center justify-center md:justify-start gap-3 md:gap-4 px-5 py-3 md:py-3.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl whitespace-nowrap w-auto md:w-full transition">
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
                
                {/* Header with Back Button */}
                <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <button 
                        onClick={() => navigate('/settings')}
                        className="p-2 hover:bg-gray-200 rounded-full transition text-gray-600 shrink-0 self-start sm:self-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <div>
                        <h1 className="text-[24px] md:text-[32px] font-extrabold text-black tracking-tight mb-1 leading-tight w-full break-words">Update Your Password</h1>
                        <p className="text-[#999999] font-medium text-[14px] md:text-[15px]">Enter your current password and new password</p>
                    </div>
                </div>

                    {/* Form Fields container */}
                <div className="flex flex-col gap-8 w-full max-w-[550px] pl-0 md:pl-4">
                    
                    {/* Current Password Field */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-[14px] font-bold text-[#7A7A7A] tracking-widest uppercase">
                            CURRENT PASSWORD <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input 
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedInput('current')}
                            onBlur={() => setFocusedInput(null)} 
                            className={`w-full h-[64px] rounded-[18px] border-[2.5px] outline-none px-6 text-[18px] font-medium transition-all duration-300 ${
                                focusedInput === 'current' 
                                ? 'border-[#6B7AE5] bg-[#F8F9FF] shadow-[0_0_0_4px_rgba(107,122,229,0.15)]' 
                                : 'border-[#D0D4F3] bg-white hover:border-[#9CABF0]'
                            }`}
                        />
                    </div>

                    {/* New Password Field */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-[14px] font-bold text-[#7A7A7A] tracking-widest uppercase">
                            NEW PASSWORD <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input 
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedInput('new')}
                            onBlur={() => setFocusedInput(null)} 
                            className={`w-full h-[64px] rounded-[18px] border-[2.5px] outline-none px-6 text-[18px] font-medium transition-all duration-300 ${
                                focusedInput === 'new' 
                                ? 'border-[#6B7AE5] bg-[#F8F9FF] shadow-[0_0_0_4px_rgba(107,122,229,0.15)]' 
                                : 'border-[#D0D4F3] bg-white hover:border-[#9CABF0]'
                            }`}
                        />
                    </div>

                    {/* Confirm New Password Field */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-[14px] font-bold text-[#7A7A7A] tracking-widest uppercase">
                            CONFIRM NEW PASSWORD <span className="text-[#FF6B6B]">*</span>
                        </label>
                        <input 
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedInput('confirm')}
                            onBlur={() => setFocusedInput(null)} 
                            className={`w-full h-[64px] rounded-[18px] border-[2.5px] outline-none px-6 text-[18px] font-medium transition-all duration-300 ${
                                focusedInput === 'confirm' 
                                ? 'border-[#6B7AE5] bg-[#F8F9FF] shadow-[0_0_0_4px_rgba(107,122,229,0.15)]' 
                                : 'border-[#D0D4F3] bg-white hover:border-[#9CABF0]'
                            }`}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-6">
                        <button 
                            onClick={() => navigate('/settings')}
                            className="text-[#3B3C4A] font-bold text-[16px] hover:text-black transition px-6 py-4 rounded-xl hover:bg-gray-100 text-center w-full sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="bg-[#5966D6] hover:bg-[#4752B3] text-white font-bold text-[16px] px-10 py-4.5 rounded-[14px] shadow-[0_4px_14px_rgba(89,102,214,0.35)] transition-all hover:shadow-[0_6px_20px_rgba(89,102,214,0.45)] hover:-translate-y-0.5 text-center w-full sm:w-auto flex justify-center items-center h-[56px]"
                        >
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
