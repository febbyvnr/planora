import React, { useState } from 'react';
import { Plus, Check, Calculator, Brain, BookOpen, Sprout, FlaskConical, Microscope, Trash2, Clock, Music, X, Link as LinkIcon } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreateTimerSessionModal({ isOpen, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('book');
    const [ambienceType, setAmbienceType] = useState('none'); // 'none', 'lofi', 'rain', 'forest', 'custom'
    const [customLink, setCustomLink] = useState('');

    // Timer Sequence (Sequential Phases)
    const [phases, setPhases] = useState([
        { id: 1, type: 'Focus', minutes: 25 },
        { id: 2, type: 'Short Break', minutes: 5 }
    ]);

    const iconOptions = [
        { id: 'calculator', component: <Calculator size={22} />, label: 'Calculator', color: 'text-[#4A72FF]', bg: 'bg-[#EBF0FF]' },
        { id: 'brain',      component: <Brain size={22} />,      label: 'Brain', color: 'text-[#6D42A5]', bg: 'bg-[#F0EBF6]' },
        { id: 'book',       component: <BookOpen size={22} />,   label: 'Reading', color: 'text-[#00915B]', bg: 'bg-[#E5F4EE]' },
        { id: 'sprout',     component: <Sprout size={22} />,     label: 'Sprout', color: 'text-[#2BB67D]', bg: 'bg-[#E8FAF4]' },
        { id: 'flask',      component: <FlaskConical size={22} />, label: 'Flask', color: 'text-[#FFB340]', bg: 'bg-[#FFF7EB]' },
        { id: 'microscope', component: <Microscope size={22} />, label: 'Microscope', color: 'text-[#E89B35]', bg: 'bg-[#FFF8EC]' },
    ];

    const ambienceOptions = [
        { id: 'none', label: 'None' },
        { id: 'lofi', label: 'Lofi Beats' },
        { id: 'rain', label: 'Rain Sounds' },
        { id: 'forest', label: 'Forest Vibes' },
        { id: 'custom', label: 'Custom Link (Spotify/YT)' }
    ];

    const handleAddPhase = () => {
        const newId = phases.length > 0 ? Math.max(...phases.map(p => p.id)) + 1 : 1;
        // Smart default: alternating Focus / Break
        const lastType = phases.length > 0 ? phases[phases.length - 1].type : 'Short Break';
        const newType = lastType === 'Focus' ? 'Short Break' : 'Focus';
        const newMinutes = newType === 'Focus' ? 25 : 5;
        
        setPhases([...phases, { id: newId, type: newType, minutes: newMinutes }]);
    };

    const handleRemovePhase = (id) => {
        setPhases(phases.filter(p => p.id !== id));
    };

    const updatePhase = (id, field, value) => {
        setPhases(phases.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const calculateTotalDuration = () => {
        const totalMinutes = phases.reduce((acc, curr) => acc + (Number(curr.minutes) || 0), 0);
        const hrs = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        if (hrs > 0) return `${hrs}h ${mins}m Total`;
        return `${mins} Min Total`;
    };

    const handleSave = () => {
        if (!title.trim()) {
            toast.error('Session Title cannot be empty!');
            return;
        }
        if (phases.length === 0) {
            toast.error('Please add at least one timer phase!');
            return;
        }

        const selectedIconData = iconOptions.find(i => i.id === selectedIcon);

        const sessionData = {
            id: Date.now(),
            title,
            icon: selectedIconData.component,
            iconId: selectedIcon,
            iconColor: selectedIconData.color,
            iconBg: selectedIconData.bg,
            ambience: ambienceType,
            customLink: ambienceType === 'custom' ? customLink : null,
            duration: calculateTotalDuration(),
            phases: [...phases]
        };

        toast.success('Timer Session Created! 🎉');
        onSave(sessionData);

        // Reset
        setTitle('');
        setSelectedIcon('book');
        setAmbienceType('none');
        setCustomLink('');
        setPhases([
            { id: 1, type: 'Focus', minutes: 25 },
            { id: 2, type: 'Short Break', minutes: 5 }
        ]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
            <div className="bg-white w-[560px] max-h-[90vh] rounded-3xl shadow-2xl relative flex flex-col">
                
                {/* ── FIXED HEADER ── */}
                <div className="flex items-center justify-between px-8 pt-8 pb-4 shrink-0">
                    <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Create Session</h2>
                   <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-200"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
                </div>

                {/* ── SCROLLABLE BODY (no visible scrollbar) ── */}
                <div
                    className="flex-1 min-h-0 px-8 pb-2 overflow-y-auto space-y-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

                    {/* TITLE */}
                    <div>
                        <p className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wide">SESSION TITLE</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Deep Work Coding"
                            className="w-full px-5 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5D6BDE] transition text-gray-700 placeholder-gray-400 font-medium"
                        />
                    </div>

                    {/* ICON SELECTION */}
                    <div>
                        <p className="text-gray-500 text-xs font-bold mb-3 uppercase tracking-wide">ICON THEME</p>
                        <div className="flex gap-3 flex-wrap">
                            {iconOptions.map((icon) => (
                                <button
                                    key={icon.id}
                                    type="button"
                                    onClick={() => setSelectedIcon(icon.id)}
                                    className={`w-[56px] h-[56px] rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer group relative
                                        ${selectedIcon === icon.id
                                            ? 'border-[#5D6BDE] text-[#5D6BDE] bg-[#EEF0FD]'
                                            : 'border-transparent bg-gray-50 text-gray-500 hover:border-gray-200'
                                        }`}
                                >
                                    {icon.component}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AMBIENCE SOUND */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Music size={18} className="text-[#5D6BDE]" />
                            <p className="text-gray-900 text-sm font-bold uppercase tracking-wide">Ambience & Sound</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {ambienceOptions.map((amb) => (
                                <button
                                    key={amb.id}
                                    type="button"
                                    onClick={() => setAmbienceType(amb.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                                        ambienceType === amb.id 
                                        ? 'bg-[#5D6BDE] text-white border-[#5D6BDE] shadow-sm' 
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {amb.label}
                                </button>
                            ))}
                        </div>

                        {/* Custom Link Input */}
                        {ambienceType === 'custom' && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <p className="text-gray-400 text-xs font-bold mb-1">SPOTIFY / YOUTUBE LINK</p>
                                <div className="relative">
                                    <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={customLink}
                                        onChange={(e) => setCustomLink(e.target.value)}
                                        placeholder="Paste link here..."
                                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5D6BDE] text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* TIMER SEQUENCE */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">SESSION SEQUENCE</p>
                            <span className="text-xs bg-[#EEF0FD] text-[#5D6BDE] px-3 py-1 rounded-full font-bold shadow-sm">
                                {calculateTotalDuration()}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {phases.map((phase, idx) => (
                                <div key={phase.id} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                                        phase.type === 'Focus' ? 'bg-[#FC6C68]' : 
                                        phase.type === 'Short Break' ? 'bg-[#4A72FF]' : 'bg-[#2BB67D]'
                                    } shadow-sm`}>
                                        {idx + 1}
                                    </div>

                                    {/* Type Selector */}
                                    <select
                                        value={phase.type}
                                        onChange={(e) => updatePhase(phase.id, 'type', e.target.value)}
                                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 outline-none focus:border-[#5D6BDE]"
                                    >
                                        <option value="Focus">Focus</option>
                                        <option value="Short Break">Short Break</option>
                                        <option value="Long Break">Long Break</option>
                                    </select>

                                    {/* Minutes Input */}
                                    <div className="relative w-24 shrink-0">
                                        <input
                                            type="number"
                                            value={phase.minutes}
                                            onChange={(e) => updatePhase(phase.id, 'minutes', e.target.value)}
                                            className="w-full pl-3 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 outline-none focus:border-[#5D6BDE] text-center"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 pointer-events-none">
                                            m
                                        </span>
                                    </div>

                                    {/* Remove Phase */}
                                    <button
                                        onClick={() => handleRemovePhase(phase.id)}
                                        className="w-8 h-8 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition shrink-0"
                                        disabled={phases.length === 1}
                                        title={phases.length === 1 ? "Minimum 1 phase required" : "Remove phase"}
                                    >
                                        <Trash2 size={14} className={phases.length === 1 ? 'opacity-30' : ''} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleAddPhase}
                            className="w-full mt-3 py-3 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 font-semibold text-sm hover:border-[#5D6BDE] hover:text-[#5D6BDE] hover:bg-gray-50 transition"
                        >
                            <Plus size={18} />
                            Add Timer Phase
                        </button>
                    </div>
                </div>

                {/* ── FIXED FOOTER ── */}
                <div className="flex justify-end gap-3 px-8 py-5 shrink-0 border-t border-gray-100">
                    
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 rounded-xl bg-[#5D6BDE] hover:bg-[#4C5AC7] text-white font-bold transition flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <Check size={18} />
                        Save Session
                    </button>
                </div>

            </div>
        </div>
    );
}
