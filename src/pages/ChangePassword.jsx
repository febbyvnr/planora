import { useState } from 'react';
import { X, User, Bell, Users, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import SettingsSidebar from '../components/SettingsSidebar';

export default function ChangePassword() {
    const navigate = useNavigate();
    const [focusedInput, setFocusedInput] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);
    const [errorToast, setErrorToast] = useState(null);

    const showErrorToast = (message) => {
        setErrorToast(message);
        setTimeout(() => {
            setErrorToast(null);
        }, 2000);
    };

    const showToast = (message, conf) => {
        setToastMsg(message);

        if (conf) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 9999
            });
        }

        setTimeout(() => {
            setToastMsg(null);
        }, 2000);
    };
    
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
            showErrorToast('Please fill in all fields');
            return false;
        }

        if (formData.newPassword.length < 6) {
            showErrorToast('Password must be at least 6 characters');
            return false;
        }

        if (!formData.confirmPassword.trim()) {
            showErrorToast('Please confirm your new password');
            return false;
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
            showErrorToast('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (validateForm()) {
            // Proceed with save logic here
            showToast('Password successfully updated! 🎉', true);
            // E.g. navigate back to settings upon success
            setTimeout(() => navigate('/settings'), 1500);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-[24px] border border-gray-200 shadow-sm w-full min-h-[650px] overflow-hidden m-0 p-0">
            {/* Setting Sidebar */}
            <SettingsSidebar />

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

            {toastMsg && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
                    <div className="bg-white border shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20}/>
                        <p className="text-sm font-medium text-gray-700">
                            {toastMsg}
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
        </div>
    );
}
