import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Plus, Check, Calculator, Brain, BookOpen, Sprout, FlaskConical, Microscope, Trash2, Clock, FileText, ChevronDown, Search, Copy, RefreshCw, CircleUserRound } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreatePlanModal({ isOpen, onClose, onSaveDraft, draftToEdit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [planTitle, setPlanTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('calculator');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sessions, setSessions] = useState([
    { id: 1, title: '', duration: '120 minutes', mode: 'Reading', material: 'Practice_Modul_Matrix.pdf' }
  ]);
  // Step 3 state
  const [friendSearch, setFriendSearch] = useState('');
  const [searchResult, setSearchResult] = useState({ id: 99, name: 'Marcus Chen', email: 'marcus_study@gmail.com' });
  const [teamMembers, setTeamMembers] = useState([
    { id: 2, name: 'Antonia', email: 'antonia@gmail.com', isOwner: false },
    { id: 1, name: 'Olivia', email: 'olivia123@gmail.com', isOwner: true },
  ]);
  const [publicSharing, setPublicSharing] = useState(true);
  const [joinCode, setJoinCode] = useState('');

  const generateJoinCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  };

  const fileInputRef = useRef(null);
  const [activeUploadSessionId, setActiveUploadSessionId] = useState(null);

  // Pre-fill form when editing a draft
  useEffect(() => {
    if (draftToEdit) {
      setPlanTitle(draftToEdit.title || '');
      setDescription(draftToEdit.description || '');
      setSelectedIcon(draftToEdit.icon || 'calculator');
      setCurrentStep(draftToEdit.lastStep || 1);
      if (draftToEdit.sessions && draftToEdit.sessions.length > 0) {
        setSessions(draftToEdit.sessions);
      }
      if (draftToEdit.teamMembers && draftToEdit.teamMembers.length > 0) {
        setTeamMembers(draftToEdit.teamMembers);
      }
      if (draftToEdit.publicSharing !== undefined) {
        setPublicSharing(draftToEdit.publicSharing);
      }
    }
  }, [draftToEdit]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && activeUploadSessionId !== null) {
      handleSessionChange(activeUploadSessionId, 'material', file.name);
      toast.success(`${file.name} attached!`);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveUploadSessionId(null);
    setOpenDropdown(null);
  };
  
  const triggerFileUpload = (sessionId, mode) => {
    setActiveUploadSessionId(sessionId);
    if (fileInputRef.current) {
      if (mode === 'Reading') fileInputRef.current.accept = '.pdf,.doc,.docx,.txt';
      else if (mode === 'Video') fileInputRef.current.accept = 'video/mp4,video/quicktime,.mov';
      else fileInputRef.current.accept = '*/*';
      fileInputRef.current.click();
    }
  };
  
  const handleAddLink = (sessionId) => {
     const link = window.prompt("Enter Video Link (e.g., YouTube URL):");
     if (link && link.trim() !== '') {
       handleSessionChange(sessionId, 'material', link.trim());
       toast.success("Link attached!");
       setOpenDropdown(null);
     }
  };

  const durationOptions = ['30 minutes', '60 minutes', '90 minutes', '120 minutes', '150 minutes', '180 minutes'];
  const modeOptions = ['Reading', 'Quiz', 'Video'];
  
  const materialOptionsByMode = {
    'Reading': ['Practice_Modul_Matrix.pdf', 'Lecture_Notes.pdf', 'Study_Guide.pdf', 'Assignment.pdf'],
    'Quiz': ['Supply & Demand Concept', 'Calculus Multiple Choice', 'Chemistry Essay', 'General Knowledge'],
    'Video': ['Elasticity.mp4', 'Introduction_to_Macroeconomics.mp4', 'Kinematics_Review.mp4', 'Reaction_Mechanisms.mov'],
  };

  const toggleDropdown = (id, field) => {
    setOpenDropdown(prev =>
      prev && prev.id === id && prev.field === field ? null : { id, field }
    );
  };

  const selectOption = (id, field, value) => {
    handleSessionChange(id, field, value);
    setOpenDropdown(null);
  };

  const iconOptions = [
    { id: 'calculator', component: <Calculator size={22} />, label: 'Calculator' },
    { id: 'brain',      component: <Brain size={22} />,      label: 'Brain' },
    { id: 'book',       component: <BookOpen size={22} />,   label: 'Book' },
    { id: 'sprout',     component: <Sprout size={22} />,     label: 'Sprout' },
    { id: 'flask',      component: <FlaskConical size={22} />, label: 'Flask' },
    { id: 'microscope', component: <Microscope size={22} />, label: 'Microscope' },
  ];

  const handleNextStep1 = () => {
    if (!planTitle.trim() || !description.trim()) {
      toast.error('All fields are required!');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    if (sessions.length === 0) {
      toast.error('Please add at least one session!');
      return;
    }
    const emptySession = sessions.find(s => !s.title.trim());
    if (emptySession) {
      const idx = sessions.indexOf(emptySession) + 1;
      toast.error(`Session ${idx}: SESSION TITLE cannot be empty!`);
      return;
    }
    if (!joinCode) setJoinCode(generateJoinCode());
    setCurrentStep(3);
  };

  const handleFinish = () => {
    toast.success('New plan created successfully! 🎉');
    onClose();
    setCurrentStep(1);
    setPlanTitle('');
    setDescription('');
    setSessions([{ id: 1, title: '', duration: '120 minutes', mode: 'Reading', material: 'Practice_Modul_Matrix.pdf' }]);
    setTeamMembers([
      { id: 2, name: 'Antonia', email: 'antonia@gmail.com', isOwner: false },
      { id: 1, name: 'Olivia', email: 'olivia123@gmail.com', isOwner: true },
    ]);
    setFriendSearch('');
    setSearchResult({ id: 99, name: 'Marcus Chen', email: 'marcus_study@gmail.com' });
  };

  const handleSearchFriend = (query) => {
    setFriendSearch(query);
    const q = query.trim().toLowerCase();
    if (q === '' ) {
      setSearchResult(null);
    } else if (q.includes('marcus') || q.includes('marcus_chen')) {
      setSearchResult({ id: 99, name: 'Marcus Chen', email: 'marcus_study@gmail.com' });
    } else if (q.includes('budi') || q.includes('rizky') || q.includes('john')) {
      setSearchResult({ id: 100, name: 'Budi Santoso', email: 'budi_santoso@gmail.com' });
    } else {
      setSearchResult({ notFound: true });
    }
  };

  const handleAddToTeam = (member) => {
    if (teamMembers.find(m => m.id === member.id)) {
      toast.error(`${member.name} is already in your team!`);
      return;
    }
    setTeamMembers(prev => [...prev, member]);
    setSearchResult(null);
    setFriendSearch('');
    toast.success(`${member.name} added to the team!`);
  };

  const handleRemoveFromTeam = (id) => {
    setTeamMembers(prev => prev.filter(m => m.id !== id));
  };

  const handleAddSession = () => {
    const newId = sessions.length > 0 ? Math.max(...sessions.map(s => s.id)) + 1 : 1;
    setSessions([...sessions, { id: newId, title: '', duration: '120 minutes', mode: 'Reading', material: 'Practice_Modul_Matrix.pdf' }]);
  };

  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const handleSessionChange = (id, field, value) => {
    setSessions(sessions.map(s => {
      if (s.id === id) {
        if (field === 'mode') {
           // Reset material when mode changes
           return { ...s, mode: value, material: materialOptionsByMode[value][0] };
        }
        return { ...s, [field]: value };
      }
      return s;
    }));
  };

  const handleSaveDraft = () => {
    if (!planTitle.trim()) {
      toast.error('Save failed! Plan Title cannot be empty.');
      return;
    }
    
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
      + ' · ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const draftData = {
      id: draftToEdit?.id || Date.now(),
      title: planTitle,
      description,
      icon: selectedIcon,
      sessions: sessions.map(s => ({ ...s })),
      teamMembers: teamMembers.map(m => ({ ...m })),
      publicSharing,
      lastStep: currentStep,
      savedAt: timeStr,
    };

    onSaveDraft?.(draftData);
    toast.success('Draft saved successfully! ✏️');
    closeModal();
  };

  const closeModal = () => {
    onClose();
    setCurrentStep(1);
    setPlanTitle('');
    setDescription('');
    setSessions([{ id: 1, title: '', duration: '120 minutes', mode: 'Reading', material: 'Practice_Modul_Matrix.pdf' }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[620px] max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl">
        <h2 className="text-[28px] font-bold text-gray-900 mb-6">Create New Plan</h2>
        
        {/* Top Progress Bars */}
        <div className="flex gap-3 mb-8">
           <div className="h-[6px] flex-1 bg-[#4A72FF] rounded-full"></div>
           <div className={`h-[6px] flex-1 rounded-full ${currentStep >= 2 ? 'bg-[#4A72FF]' : 'bg-gray-200'}`}></div>
           <div className={`h-[6px] flex-1 rounded-full ${currentStep >= 3 ? 'bg-[#4A72FF]' : 'bg-gray-200'}`}></div>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-between px-12 mb-10 relative z-0">
          <div className="absolute top-5 left-[15%] right-[15%] h-[2px] bg-gray-300 z-[-1]"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-white px-4">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center text-xl font-bold text-white ${currentStep > 1 ? 'bg-[#5D6BDE]' : 'bg-[#5D6BDE]'}`}>
              {currentStep > 1 ? <Check size={22} strokeWidth={3} /> : '1'}
            </div>
            <span className="text-[#5D6BDE] text-xs font-bold tracking-wider">PLAN BASICS</span>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-white px-4">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center text-xl font-bold ${currentStep >= 2 ? 'bg-[#5D6BDE] text-white' : 'bg-gray-200 text-gray-500'}`}>
              {currentStep > 2 ? <Check size={22} strokeWidth={3} /> : '2'}
            </div>
            <span className={`text-xs font-bold tracking-wider ${currentStep >= 2 ? 'text-[#5D6BDE]' : 'text-gray-300'}`}>SESSIONS</span>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 bg-white px-4">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center text-xl font-bold ${currentStep >= 3 ? 'bg-[#5D6BDE] text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
            <span className={`text-xs font-bold tracking-wider ${currentStep >= 3 ? 'text-[#5D6BDE]' : 'text-gray-300'}`}>TEAM</span>
          </div>
        </div>

        {/* Step 1: Plan Basics */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">PLAN TITTLE</p>
              <input
                type="text"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                placeholder="e.g., FinalExamPrep"
                className="w-full px-5 py-4 rounded-2xl border border-[#A6B2F5] focus:outline-none focus:ring-2 focus:ring-[#5D6BDE] transition text-gray-700 placeholder-gray-400"
              />
            </div>

            <div>
              <p className="text-gray-500 text-sm font-semibold mb-3 uppercase tracking-wide">SELECT ICON</p>
              <div className="flex gap-3 flex-wrap">
                {iconOptions.map((icon) => (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setSelectedIcon(icon.id)}
                    className={`w-[56px] h-[56px] rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer group relative
                      ${selectedIcon === icon.id
                        ? 'border-[#5D6BDE] text-[#5D6BDE] bg-[#EEF0FD]'
                        : 'border-gray-200 text-gray-500 hover:border-gray-400 bg-white hover:bg-gray-50'
                      }`}
                  >
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-md">
                      {icon.label}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></span>
                    </span>
                    {icon.component}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">DESCRIPTION</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details for study plan"
                rows={4}
                className="w-full px-5 py-4 rounded-2xl border border-[#A6B2F5] focus:outline-none focus:ring-2 focus:ring-[#5D6BDE] transition text-gray-700 placeholder-gray-400 resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {/* Step 2: Sessions */}
        {currentStep === 2 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900">Session Structuring</h3>
              <span className="text-sm bg-[#EEF0FD] text-[#5D6BDE] px-4 py-1 rounded-full font-semibold">
                {sessions.length} Session{sessions.length !== 1 ? 's' : ''} Added
              </span>
            </div>

            <div className="space-y-4 pr-1">
              {sessions.map((session, idx) => (
                <div key={session.id} className="border border-gray-200 rounded-2xl p-5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#5D6BDE] text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                      Session {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSession(session.id)}
                      className="w-9 h-9 rounded-lg bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-2">SESSION TITTLE</p>
                    <input
                      type="text"
                      value={session.title}
                      onChange={(e) => handleSessionChange(session.id, 'title', e.target.value)}
                      placeholder="e.g., FinalExamPrep"
                      className="w-full px-4 py-3 rounded-xl border border-[#A6B2F5] focus:outline-none focus:ring-2 focus:ring-[#5D6BDE] transition text-gray-700 placeholder-gray-400 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-2">DURATION</p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(session.id, 'duration')}
                          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-[#A6B2F5] bg-white text-sm text-gray-700 hover:border-[#5D6BDE] transition text-left"
                        >
                          <Clock size={16} className="text-gray-400 shrink-0" />
                          <span className="flex-1">{session.duration}</span>
                          <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${openDropdown?.id === session.id && openDropdown?.field === 'duration' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown?.id === session.id && openDropdown?.field === 'duration' && (
                          <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                            {durationOptions.map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption(session.id, 'duration', opt)}
                                className={`w-full text-left px-4 py-3 text-sm transition ${
                                  session.duration === opt
                                    ? 'bg-[#5D6BDE] text-white font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-2">MODE</p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(session.id, 'mode')}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#A6B2F5] bg-white text-sm text-gray-700 hover:border-[#5D6BDE] transition text-left"
                        >
                          <span className="flex-1">{session.mode}</span>
                          <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${openDropdown?.id === session.id && openDropdown?.field === 'mode' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown?.id === session.id && openDropdown?.field === 'mode' && (
                          <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                            {modeOptions.map(opt => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => selectOption(session.id, 'mode', opt)}
                                className={`w-full text-left px-4 py-3 text-sm transition ${
                                  session.mode === opt
                                    ? 'bg-[#5D6BDE] text-white font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-2">Material</p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleDropdown(session.id, 'material')}
                          className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-[#A6B2F5] bg-white text-sm text-gray-700 hover:border-[#5D6BDE] transition text-left"
                        >
                          <FileText size={16} className="text-gray-400 shrink-0" />
                          <span className="flex-1 truncate">{session.material}</span>
                          <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${openDropdown?.id === session.id && openDropdown?.field === 'material' ? 'rotate-180' : ''}`} />
                        </button>
                        {openDropdown?.id === session.id && openDropdown?.field === 'material' && (
                          <div className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col overflow-hidden">
                            <div className="max-h-48 overflow-y-auto">
                              {(materialOptionsByMode[session.mode] || []).map(opt => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => selectOption(session.id, 'material', opt)}
                                  className={`w-full text-left px-4 py-3 text-sm transition truncate ${
                                    session.material === opt
                                      ? 'bg-[#5D6BDE] text-white font-semibold'
                                      : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                            <div className="p-1.5 border-t border-gray-100 bg-gray-50 flex flex-col gap-1.5">
                              <button
                                type="button"
                                onClick={() => triggerFileUpload(session.id, session.mode)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold text-[#5D6BDE] bg-white border border-[#E6E9FA] hover:bg-[#EEF0FD] rounded-lg transition"
                              >
                                <Plus size={16} strokeWidth={2.5} />
                                Upload {session.mode} File
                              </button>
                              {session.mode === 'Video' && (
                                <button
                                  type="button"
                                  onClick={() => handleAddLink(session.id)}
                                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold text-[#FBA834] bg-white border border-[#FDECD4] hover:bg-[#FFF8EC] rounded-lg transition"
                                >
                                  <Plus size={16} strokeWidth={2.5} />
                                  Add Video Link
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Session Button */}
            <button
              type="button"
              onClick={handleAddSession}
              className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-2xl py-5 flex items-center justify-center gap-3 text-gray-400 hover:border-[#5D6BDE] hover:text-[#5D6BDE] transition group"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 group-hover:bg-[#EEF0FD] flex items-center justify-center transition">
                <Plus size={20} />
              </div>
              <span className="text-base font-medium">Create New Session</span>
            </button>
          </div>
        )}

        {/* Step 3: Team */}
        {currentStep === 3 && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Collaborators</h3>
                <p className="text-gray-400 text-sm mt-0.5">Invite friends to study together and track progress</p>
              </div>
              <span className="text-[#E89B35] bg-[#FFF8EC] border border-[#F5D99E] px-4 py-1.5 rounded-full text-sm font-semibold">Social Learning</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter username"
                value={friendSearch}
                onChange={(e) => handleSearchFriend(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5D6BDE] transition"
              />
            </div>

            {/* Search Result */}
            {searchResult && !searchResult.notFound && (
              <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl">
                <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0 border-2 border-white">
                  <CircleUserRound size={36} className="text-red-500"/>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{searchResult.name}</p>
                  <p className="text-gray-400 text-xs">{searchResult.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToTeam(searchResult)}
                  className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition"
                >
                  Add Friend
                </button>
              </div>
            )}
            {searchResult?.notFound && (
              <p className="text-red-400 text-xs px-1">No user found with that username.</p>
            )}

            {/* Current Team */}
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">CURRENT TEAM ({teamMembers.length})</p>
              <div className="space-y-2">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-white">
                    <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center shrink-0 border-2 border-white">
                      <CircleUserRound size={36} className="text-red-500"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                        {member.isOwner && (
                          <span className="text-[10px] bg-[#EEF0FD] text-[#5D6BDE] px-2 py-0.5 rounded-full font-bold">Owner</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs">{member.email}</p>
                    </div>
                    {!member.isOwner && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFromTeam(member.id)}
                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Share Join Code */}
            <div className="rounded-2xl border-2 border-dashed border-[#A6B2F5] bg-[#F5F7FF] p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Share Join Code</p>
                  <p className="text-gray-400 text-xs mt-0.5">Share this code so others can join your plan</p>
                </div>
                <button
                  type="button"
                  onClick={() => setJoinCode(generateJoinCode())}
                  className="p-2 rounded-lg hover:bg-white text-gray-400 hover:text-[#5D6BDE] transition-colors"
                  title="Generate new code"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white border-2 border-[#D4DBF9] rounded-xl px-4 py-3 flex items-center justify-center">
                  <span className="text-[22px] font-extrabold font-mono tracking-[0.3em] text-[#5D6BDE] select-all">
                    {joinCode || '------'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (joinCode) {
                      navigator.clipboard.writeText(joinCode);
                      toast.success('Join code copied!');
                    }
                  }}
                  disabled={!joinCode}
                  className="px-4 py-3.5 rounded-xl bg-[#5D6BDE] hover:bg-[#4C5AC7] text-white font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => {
              if (currentStep === 1) closeModal();
              else setCurrentStep(currentStep - 1);
            }}
            className="text-gray-600 font-medium hover:text-gray-900 transition px-2"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>
          
          <div className="flex gap-4">
            <button 
              onClick={handleSaveDraft}
              className="px-6 py-3 rounded-[14px] bg-[#FBA834] hover:bg-[#F29F2B] text-white font-bold transition"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                if (currentStep === 1) handleNextStep1();
                else if (currentStep === 2) handleNextStep2();
                else handleFinish();
              }}
              className="px-6 py-3 rounded-[14px] bg-[#5D6BDE] hover:bg-[#4C5AC7] text-white font-bold transition"
            >
              {currentStep < 3 ? 'Next' : 'Finish & Create'}
            </button>
          </div>
        </div>
        
      </div>
      <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
    </div>
  );
}
