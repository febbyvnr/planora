import { useState } from 'react';
import { Bell, Users, User, Search, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SettingsSidebar from '../../components/SettingsSidebar';
import sticker1 from '../../assets/images/sticker_1.png'; // Assuming this path based on previous patterns

const mockFriends = [
    { id: 1, name: 'PausKayang', status: 'online' },
    { id: 2, name: 'PausTerbang', status: 'online' },
    { id: 3, name: 'Tempuralkan', status: 'online' },
    { id: 4, name: 'Sushi', status: 'online' },
    { id: 5, name: 'KucingGarong', status: 'offline' },
    { id: 6, name: 'NasiGoreng', status: 'offline' },
];

const mockPending = [
    { id: 7, name: 'PausKayang', status: 'pending' },
    { id: 8, name: 'PausTerbang', status: 'pending' },
];

export default function SettingsFriends() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Pending'); // Keeping existing state
    const [searchQuery, setSearchQuery] = useState('');
    const [addFriendUsername, setAddFriendUsername] = useState('');

    let displayedFriends = [];
    let badgeText = '';

    if (activeTab === 'Online') {
        displayedFriends = mockFriends.filter(f => f.status === 'online');
        badgeText = `ONLINE - ${displayedFriends.length}`;
    } else if (activeTab === 'All') {
        displayedFriends = mockFriends;
        badgeText = `ALL - ${displayedFriends.length}`;
    } else if (activeTab === 'Pending') {
        displayedFriends = mockPending;
        badgeText = `Request - ${displayedFriends.length}`;
    }

    if (searchQuery && activeTab !== 'AddFriend') {
        displayedFriends = displayedFriends.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
        badgeText = `SEARCH - ${displayedFriends.length}`;
    }

    return (
        <div className="flex flex-col md:flex-row bg-white rounded-[24px] border border-gray-200 shadow-sm w-full min-h-[650px] overflow-hidden m-0 p-0">
            {/* Setting Sidebar */}
            <SettingsSidebar />

            {/* Content Page */}
            <div className="flex-1 bg-[#FBFBFC] pt-8 md:pt-10 px-4 md:px-8 pb-12 overflow-y-auto">
                <div className="flex flex-col gap-5 max-w-4xl mx-auto w-full">

                    {/* Header: Tabs & Action */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="flex items-center gap-4 text-gray-800">
                            <button
                                onClick={() => setActiveTab('Online')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'Online' ? 'bg-[#E3EFFF] text-[#4D63E6]' : 'hover:bg-gray-100'}`}
                            >
                                Online
                            </button>
                            <button
                                onClick={() => setActiveTab('All')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'All' ? 'bg-[#E3EFFF] text-[#4D63E6]' : 'hover:bg-gray-100'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTab('Pending')}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'Pending' ? 'bg-[#E3EFFF] text-[#4D63E6]' : 'hover:bg-gray-100'}`}
                            >
                                Pending
                            </button>
                        </div>
                        <button 
                            onClick={() => setActiveTab('AddFriend')}
                            className={`font-semibold px-4 py-2.5 rounded-[10px] flex justify-center items-center text-[14px] transition shadow-sm w-full sm:w-auto ${activeTab === 'AddFriend' ? 'bg-[#4d61c6] text-white' : 'bg-[#596fe6] hover:bg-[#4d61c6] text-white'}`}
                        >
                            Add Friend
                        </button>
                    </div>

                    {activeTab === 'AddFriend' ? (
                        /* Add Friend View */
                        <div className="w-full border border-[#E6E8F0] rounded-2xl bg-white overflow-hidden mt-2 p-8 md:p-10 relative">
                            {/* Decorative element (Sticker) */}
                            <div className="absolute top-8 right-12 hidden sm:block animate-[bounce_3s_ease-in-out_infinite]">
                                <img src={sticker1} alt="Sticker" className="w-20 object-contain drop-shadow-sm" />
                            </div>

                            <div className="max-w-xl">
                                <h3 className="text-[17px] font-medium text-black mb-6">
                                    You can add friends with their username
                                </h3>
                                
                                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={addFriendUsername}
                                        onChange={(e) => setAddFriendUsername(e.target.value)}
                                        className="flex-1 h-[56px] px-5 bg-white border border-[#B3BCEE] rounded-[14px] text-[16px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#596fe6]/40 focus:border-[#596fe6] transition placeholder-gray-300"
                                    />
                                    <button 
                                        className="h-[56px] px-6 bg-[#596fe6] hover:bg-[#4d61c6] text-white font-medium rounded-[12px] whitespace-nowrap transition shadow-sm"
                                        onClick={() => {
                                            // Add friend logic here
                                            setAddFriendUsername('');
                                        }}
                                    >
                                        Send Friend Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Standard View (Online/All/Pending) */
                        <>
                            {/* Search Bar */}
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search materials, courses, or files..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-400 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
                                />
                            </div>

                            {/* Content Area - Friend List */}
                            <div className="w-full border border-gray-200 rounded-xl bg-white overflow-hidden mt-2">
                                {/* List Header */}
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <span className="bg-[#00915B] text-white text-xs font-bold px-3 py-1.5 rounded-[6px] tracking-wide">
                                        {activeTab === 'Pending' ? badgeText : badgeText.toUpperCase()}
                                    </span>
                                </div>

                                {/* List Items */}
                                <div className="flex flex-col">
                                    {displayedFriends.length > 0 ? (
                                        displayedFriends.map((friend, index) => (
                                            <div 
                                                key={friend.id} 
                                                className={`flex items-center gap-4 px-6 py-4 transition ${index % 2 === 0 ? 'bg-[#FBF9FF] ' : 'bg-white '}`}
                                            >
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-red-200 border-2 border-red-300 flex items-center justify-center text-red-500 overflow-hidden">
                                                        <User size={20} className="fill-current text-red-400" />
                                                    </div>
                                                    {friend.status === 'online' && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-gray-800">{friend.name}</span>
                                                
                                                {activeTab === 'Pending' && (
                                                    <div className="ml-auto flex gap-3">
                                                        <button className="w-9 h-9 flex items-center justify-center bg-[#00915B] hover:bg-[#007a4c] text-white rounded-full transition shadow-sm">
                                                            <Check size={20} strokeWidth={2.5} />
                                                        </button>
                                                        <button className="w-9 h-9 flex items-center justify-center bg-[#ED5856] hover:bg-[#d64a48] text-white rounded-full transition shadow-sm">
                                                            <X size={20} strokeWidth={2.5} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-6 py-8 text-center text-gray-400 font-medium">
                                            No friends found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
