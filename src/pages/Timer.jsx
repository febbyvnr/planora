import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Minimize, CheckCircle, ArrowLeft, Plus, Brain, BookOpen, Clock, Code, Music, ListOrdered } from "lucide-react";
import CreateTimerSessionModal from "../components/CreateTimerSessionModal";

// ---- AUDIO CONSTANTS ----
const AMBIENCE_SOURCES = {
    'none': '',
    'lofi': 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3', // Example royalty free lofi
    'rain': 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_349d799e07.mp3?filename=heavy-rain-nature-sounds-8186.mp3', // Rain
    'forest': 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_b282ca808a.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3' // Forest
};

// Mock initial predefined sessions
const defaultSessions = [
  {
    id: 1,
    title: 'Deep Work',
    subtitle: 'High Focus Programming',
    icon: <Code size={24} />,
    iconColor: 'text-[#4A72FF]',
    iconBg: 'bg-[#EBF0FF]',
    duration: '25 Min Total',
    ambience: 'none',
    phases: [{ id: 1, type: 'Focus', minutes: 25 }]
  },
  {
    id: 2,
    title: 'Pomodoro Classic',
    subtitle: '25m Focus, 5m Break',
    icon: <BookOpen size={24} />,
    iconColor: 'text-[#00915B]',
    iconBg: 'bg-[#E5F4EE]',
    duration: '30 Min Total',
    ambience: 'lofi',
    phases: [
        { id: 1, type: 'Focus', minutes: 25 },
        { id: 2, type: 'Short Break', minutes: 5 }
    ]
  },
  {
    id: 3,
    title: 'Marathon Study',
    subtitle: 'Intense Session',
    icon: <Brain size={24} />,
    iconColor: 'text-[#6D42A5]',
    iconBg: 'bg-[#F0EBF6]',
    duration: '1h 55m Total',
    ambience: 'forest',
    phases: [
        { id: 1, type: 'Focus', minutes: 50 },
        { id: 2, type: 'Short Break', minutes: 10 },
        { id: 3, type: 'Focus', minutes: 55 }
    ]
  }
];

export default function Timer() {
    // ---- APP STATE ----
    const [savedSessions, setSavedSessions] = useState(defaultSessions);
    const [hasSelectedSession, setHasSelectedSession] = useState(false);
    const [activeSession, setActiveSession] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // ---- TIMER STATE ----
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    
    // Sequential phases state
    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0); 
    const [activeMode, setActiveMode] = useState("Focus"); // Display mode based on current phase

    // ---- UI STATE ----
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);

    // ---- REFS ----
    const tickAudioRef = useRef(null);
    const alarmAudioRef = useRef(null);
    const ambienceAudioRef = useRef(null);

    // ---- CONSTANTS ----
    const MODES = {
        "Focus": { theme: "from-red-400/90 to-rose-500/90", msg: "Time to focus!" },
        "Short Break": { theme: "from-blue-400/90 to-cyan-500/90", msg: "Take a short break." },
        "Long Break": { theme: "from-emerald-400/90 to-teal-500/90", msg: "You earned a long break." }
    };

    const backgroundUrl = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop"; 

    // ---- EFFECTS ----

    // Timer logic
    useEffect(() => {
        let interval = null;

        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            handlePhaseComplete();
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, timeLeft, activeMode, isMuted, currentPhaseIndex, activeSession]);

    // Handle Ambience playback
    useEffect(() => {
        if (ambienceAudioRef.current) {
            if (isRunning && !isMuted && activeSession?.ambience && activeSession.ambience !== 'none' && activeSession.ambience !== 'custom') {
                 ambienceAudioRef.current.play().catch(e => console.log('Audio play blocked:', e));
            } else {
                 ambienceAudioRef.current.pause();
            }
        }
    }, [isRunning, isMuted, activeSession]);

    // ---- HANDLERS ----

    const handlePhaseComplete = () => {
        setIsRunning(false);
        if (!isMuted && alarmAudioRef.current) {
            alarmAudioRef.current.play().catch(e => console.log(e));
        }
        if (activeMode === "Focus") {
            setCycleCount(prev => prev + 1);
        }

        const phases = activeSession?.phases || [];
        const nextIndex = currentPhaseIndex + 1;

        if (nextIndex < phases.length) {
            // Move to next phase automatically
            const nextPhase = phases[nextIndex];
            setCurrentPhaseIndex(nextIndex);
            setActiveMode(nextPhase.type);
            setTimeLeft(nextPhase.minutes * 60);
            
            // Optionally auto-start the next phase after a short delay
            setTimeout(() => {
                setIsRunning(true);
            }, 1500);
            
            // notify user
            if ("Notification" in window && Notification.permission === "granted") {
                new Notification(`Phase Complete! Up next: ${nextPhase.type}`);
            }

        } else {
            // Session over
            alert(`Session "${activeSession?.title}" complete! Great job.`);
            handleExitTimer();
        }
    };

    const handleStartSession = (sessionData) => {
        setActiveSession(sessionData);
        setHasSelectedSession(true);
        setCurrentPhaseIndex(0);
        
        // Initialize first phase
        if (sessionData.phases && sessionData.phases.length > 0) {
            const firstPhase = sessionData.phases[0];
            setActiveMode(firstPhase.type);
            setTimeLeft(firstPhase.minutes * 60);
        } else {
            // Fallback just in case
            setActiveMode('Focus');
            setTimeLeft(25 * 60); 
        }

        setIsRunning(false);
    };

    const handleSaveNewSession = (newSession) => {
        setSavedSessions([newSession, ...savedSessions]);
        setIsCreateModalOpen(false);
    };

    const handleExitTimer = () => {
        setIsRunning(false);
        setHasSelectedSession(false);
        setActiveSession(null);
        if (isFullscreen && document.exitFullscreen) {
            document.exitFullscreen().catch(e => console.error(e));
            setIsFullscreen(false);
        }
    };

    // Manual mode override during a session
    const handleModeSwitch = (mode) => {
        setActiveMode(mode);
        // If clicking manually, just set standard defaults instead of phase logic
        const defaultTimes = { "Focus": 25, "Short Break": 5, "Long Break": 15 };
        setTimeLeft(defaultTimes[mode] * 60);
        setIsRunning(false);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
        if (!isRunning && !isMuted && tickAudioRef.current) {
             tickAudioRef.current.play().catch(e => console.log(e));
        }

        // Request notification permissions
        if (!isRunning && "Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        
        // Reset to current phase's full time
        const phases = activeSession?.phases || [];
        if (phases.length > 0 && phases[currentPhaseIndex]) {
            setTimeLeft(phases[currentPhaseIndex].minutes * 60);
        } else {
            // Fallback manual mode reset
            const defaultTimes = { "Focus": 25, "Short Break": 5, "Long Break": 15 };
            setTimeLeft(defaultTimes[activeMode] * 60);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // ---- RENDER HELPERS ----
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    // Calculate Progress
    let progressPercent = 0;
    const phases = activeSession?.phases || [];
    if (phases.length > 0 && phases[currentPhaseIndex]) {
        const totalTimeForMode = phases[currentPhaseIndex].minutes * 60;
        progressPercent = ((totalTimeForMode - timeLeft) / totalTimeForMode) * 100;
    } else {
        // Fallback for manual mode clicks
        const defaultTimes = { "Focus": 25 * 60, "Short Break": 5 * 60, "Long Break": 15 * 60 };
        const totalTimeForMode = defaultTimes[activeMode] || 25 * 60;
        progressPercent = ((totalTimeForMode - timeLeft) / totalTimeForMode) * 100;
    }


    // ==========================================
    // RENDER 1: SETUP SCREEN
    // ==========================================
    if (!hasSelectedSession) {
        return (
            <div className="flex flex-col gap-8 pb-10 text-gray-800 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex justify-between items-end mb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Timer Sessions</h1>
                        <p className="text-gray-500 text-[15px]">
                            Choose a saved session or create a new one to start focusing.
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Pre-defined Session Cards */}
                    {savedSessions.map((session) => (
                        <div
                            key={session.id}
                            className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col min-h-[220px] transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] hover:-translate-y-1.5"
                        >
                            {/* Card Header */}
                            <div className="flex gap-4">
                                <div className={`w-12 h-12 rounded-[14px] ${session.iconBg || 'bg-gray-100'} ${session.iconColor || 'text-gray-500'} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0`}>
                                   {session.icon || <Play size={24} />}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-gray-900 font-bold text-[17px] leading-tight mb-1 truncate">{session.title}</h3>
                                    <p className="text-gray-500 text-[13px] truncate">{session.subtitle || 'Custom Timer'}</p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="mt-4 mb-5 flex flex-wrap gap-2">
                                <span className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    <Clock size={13} className="text-[#3b5166]" />
                                    <span className="text-[11px] font-bold text-[#3b5166]">{session.duration}</span>
                                </span>
                                {(session.phases?.length || 0) > 1 && (
                                    <span className="flex items-center gap-1 text-gray-500 bg-[#F5F7FF] px-3 py-1.5 rounded-xl border border-[#D4DBF9]">
                                        <ListOrdered size={13} className="text-[#5D6BDE]" />
                                        <span className="text-[11px] font-bold text-[#5D6BDE]">{session.phases.length} Phases</span>
                                    </span>
                                )}
                                {session.ambience && session.ambience !== 'none' && (
                                    <span className="flex items-center gap-1 text-gray-500 bg-[#FFF8EC] px-3 py-1.5 rounded-xl border border-[#FDECD4]">
                                        <Music size={13} className="text-[#FBA834]" />
                                        <span className="text-[11px] font-bold text-[#FBA834] capitalize">{session.ambience}</span>
                                    </span>
                                )}
                            </div>

                            {/* Start Action */}
                            <button
                                onClick={() => handleStartSession(session)}
                                className="mt-auto w-full py-3 rounded-xl border-2 border-[#2BB67D] bg-[#E8FAF4] text-[#1FA96A] font-extrabold text-[14px] flex items-center justify-center gap-2 hover:bg-[#d2f5e8] transition-all duration-300"
                            >
                                <Play size={18} fill="currentColor" />
                                Start Session
                            </button>
                        </div>
                    ))}

                    {/* Add New Session Card */}
                    <div 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-white rounded-[24px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 min-h-[220px] cursor-pointer hover:bg-gray-50 hover:border-[#5D6BDE] group transition-all duration-300"
                    >
                        <div className="w-[60px] h-[60px] rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#5D6BDE] group-hover:bg-[#EEF0FD] mb-4 transition-all">
                           <Plus size={30} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-gray-600 group-hover:text-[#5D6BDE] font-bold text-[16px] mb-1 transition-colors">Create New Session</h3>
                        <p className="text-gray-400 text-xs text-center max-w-[150px]">
                           Set custom lengths, breaks & ambience
                        </p>
                    </div>

                </div>

                <CreateTimerSessionModal 
                    isOpen={isCreateModalOpen} 
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleSaveNewSession}
                />
            </div>
        );
    }

    // ==========================================
    // RENDER 2: FOCUS TIMER (LifeAt Style)
    // ==========================================
    return (
        <div className="flex flex-col w-full min-h-[calc(100vh-120px)] text-gray-800 animate-in fade-in zoom-in-95 duration-500 rounded-3xl pb-10">
            {/* HEADER */}
            <header className="relative z-10 w-full flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    {/* Back to Setup Button */}
                    <button 
                        onClick={handleExitTimer}
                        className="group flex items-center gap-2 px-4 py-2 hover:px-5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-600 font-semibold text-sm transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                        <span>Sessions</span>
                    </button>
                    
                    <div className="hidden sm:flex items-center gap-3 ml-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${MODES[activeMode]?.theme || MODES['Focus'].theme} flex items-center justify-center shadow-md animate-pulse`}>
                            {activeSession?.icon ? (
                                <span className="text-white scale-[0.9]">
                                    {activeSession.icon}
                                </span>
                            ) : (
                                <CheckCircle size={22} className="text-white" />
                            )}
                        </div>
                        
                        <div>
                            <h1 className="text-xl font-black tracking-wider text-gray-900 drop-shadow-sm line-clamp-1">
                                {activeSession?.title || 'Freestyle Focus'}
                            </h1>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{activeMode} SESSION</p>
                        </div>
                    </div>
                </div>

                {/* Top Right Controls */}
                <div className="flex items-center gap-3 sm:gap-4">
                    
                    {/* Custom Spotify/Link Handle (if applicable) */}
                    {activeSession?.ambience === 'custom' && activeSession?.customLink && (
                        <a 
                            href={activeSession.customLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8FAF4] hover:bg-[#d2f5e8] border border-[#2BB67D] shadow-sm transition-colors text-[#1FA96A]"
                        >
                            <Music size={14} />
                            <span className="text-xs font-bold">Open Playlist</span>
                        </a>
                    )}

                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all shadow-sm ${
                            isMuted ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button 
                        onClick={toggleFullscreen}
                        className="w-10 h-10 rounded-xl bg-white hover:bg-gray-50 flex items-center justify-center border border-gray-200 transition-all text-gray-600 shadow-sm"
                        title="Toggle Fullscreen"
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
                        <span className="text-sm font-semibold text-gray-500">Today's Focus:</span>
                        <span className="text-sm font-bold bg-[#F5F7FF] text-[#5D6BDE] px-2 py-0.5 rounded-md">{cycleCount}</span>
                    </div>
                </div>
            </header>

            {/* MAIN TIMER AREA */}
            <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-4">
                
                {/* CLEAN CARD */}
                <div className="w-full max-w-lg relative group">
                    <div className={`absolute -inset-0.5 rounded-[2.5rem] blur-lg opacity-20 transition-all duration-1000 bg-gradient-to-r ${MODES[activeMode]?.theme || MODES['Focus'].theme}`}></div>

                    <div className="relative bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
                        
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100">
                            <div 
                                className={`h-full bg-gradient-to-r ${MODES[activeMode]?.theme || MODES['Focus'].theme} transition-all duration-1000 ease-linear`}
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        {/* MODE SELECTORS - Hidden if using sequential phases, we drive mode auto */}
                        {(!activeSession?.phases || activeSession.phases.length <= 1) && (
                            <div className="flex justify-center">
                                <div className="flex gap-2 mb-10 p-1.5 bg-gray-50 rounded-full border border-gray-100 shrink-0">
                                    {Object.keys(MODES).map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => handleModeSwitch(mode)}
                                            className={`relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 outline-none flex items-center gap-1 ${
                                                activeMode === mode 
                                                    ? "text-white shadow-md scale-105" 
                                                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-200/50"
                                            }`}
                                        >
                                            {activeMode === mode && (
                                                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${MODES[mode].theme} -z-10`}></div>
                                            )}
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SEQUENCE INDICATOR (If multi-phase) */}
                        {activeSession?.phases && activeSession.phases.length > 1 && (
                            <div className="flex justify-center items-center gap-2 mb-10">
                                {activeSession.phases.map((p, idx) => (
                                    <div key={p.id} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                            idx === currentPhaseIndex 
                                            ? `bg-gradient-to-r ${MODES[activeMode]?.theme || MODES['Focus'].theme} text-white border-transparent shadow-md scale-110` 
                                            : idx < currentPhaseIndex
                                            ? 'bg-gray-50 text-gray-400 border-gray-200'
                                            : 'bg-white text-gray-300 border-gray-100'
                                        }`}>
                                            {idx < currentPhaseIndex ? <CheckCircle size={14} /> : idx + 1}
                                        </div>
                                        {idx < activeSession.phases.length - 1 && (
                                            <div className={`w-6 h-0.5 mx-1 ${idx < currentPhaseIndex ? 'bg-gray-200' : 'bg-gray-100'}`}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TIMER DISPLAY */}
                        <div className="flex flex-col items-center justify-center mb-10">
                            <div className="text-[7rem] md:text-[9rem] font-bold leading-none tracking-tighter text-gray-900 drop-shadow-sm select-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {formatTime(timeLeft)}
                            </div>
                            <p className="text-gray-500 font-medium tracking-wide mt-2 text-lg">
                                {isRunning ? (MODES[activeMode]?.msg || "Focus on the task.") : "Ready when you are."}
                            </p>
                        </div>

                        {/* CONTROLS */}
                        <div className="flex items-center justify-center gap-6">
                            <button 
                                onClick={resetTimer}
                                className={`w-14 h-14 rounded-2xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center border border-gray-200 transition-all text-gray-500 hover:text-gray-800 hover:-rotate-45 ${isRunning ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                                title="Reset Timer"
                            >
                                <RotateCcw size={24} />
                            </button>

                            <button 
                                onClick={toggleTimer}
                                className={`group relative w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-[0_15px_35px_rgba(0,0,0,0.1)] active:scale-95`}
                            >
                                <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${MODES[activeMode]?.theme || MODES['Focus'].theme}`}></div>
                                <div className="absolute inset-1.5 rounded-[1.75rem] bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                <span className="relative z-10 text-white drop-shadow-sm">
                                    {isRunning ? <Pause size={36} fill="white" /> : <Play size={36} fill="white" className="ml-2" />}
                                </span>
                            </button>

                            <div className="w-14 h-14 rounded-2xl bg-transparent flex items-center justify-center invisible"></div>
                        </div>

                    </div>
                </div>

                {/* DYNAMIC SESSION WIDGET */}
                <div className="mt-8 relative bg-white border border-gray-100 rounded-2xl px-6 py-4 max-w-sm w-full shadow-md flex items-center justify-between group">
                     <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 line-clamp-1">{activeSession?.title || 'Freestyle Focus'}</p>
                        <p className="font-semibold text-lg text-gray-800 line-clamp-1 capitalize">{activeMode} Phase</p>
                     </div>
                     <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${MODES[activeMode]?.theme || MODES['Focus'].theme} flex items-center justify-center shadow-sm shrink-0`}>
                        {activeSession?.icon ? (
                            <span className="scale-[0.8] text-white">
                                {activeSession.icon}
                            </span>
                        ) : (
                            <Play size={16} fill="white" />
                        )}
                     </div>
                </div>

            </main>

            {/* AUDIO ELEMENTS */}
            {/* Ambient Sound source determined by session config */}
            <audio 
                ref={ambienceAudioRef} 
                src={AMBIENCE_SOURCES[activeSession?.ambience] || ''} 
                loop 
                preload="auto" 
            />
        </div>
    );
}