import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, GitBranch, CheckCircle2, PlayCircle, FileText,
  BookOpen, Highlighter, ArrowRight, Target, RotateCcw,
  Maximize2, Minimize2, ZoomIn, ZoomOut, ChevronUp, ChevronDown, X, Lock,
  Trophy
} from 'lucide-react';

// ── Mock PDF pages (Reading Mode) ─────────────────────────────────────────────
const PDF_PAGES = [
  {
    page: 1,
    content: (
      <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a1a1a', lineHeight: 1.7 }}>
        <div style={{ textAlign: 'center', marginBottom: 36, borderBottom: '1px solid #ccc', paddingBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6 }}>Market Fundamentals</h1>
          <p style={{ fontSize: 13, color: '#555', margin: 0 }}>Thesis Research – AI in Modern Education</p>
          <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Practice Module · PDF Notes</p>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, marginTop: 28 }}>1. Introduction</h2>
        <p style={{ fontSize: 13, marginBottom: 14, textAlign: 'justify' }}>
          Markets are the foundation of economic activity. A market is any arrangement that enables buyers
          and sellers to get information and do business with each other. Understanding markets requires a
          grasp of supply, demand, and price mechanisms that govern resource allocation in both micro and
          macro contexts.
        </p>
        <p style={{ fontSize: 13, marginBottom: 14, textAlign: 'justify' }}>
          The concept of a market economy depends on the interplay of millions of individual decisions.
          Each consumer maximises their utility, each producer maximises profit, and prices serve as signals
          that coordinate these decisions without any central authority — what Adam Smith called the
          <em> "invisible hand"</em> in <em>The Wealth of Nations</em> (1776).
        </p>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, marginTop: 28 }}>2. The Law of Demand</h2>
        <p style={{ fontSize: 13, marginBottom: 14, textAlign: 'justify' }}>
          The law of demand states that, all else equal, as the price of a good rises, the quantity demanded
          falls. This inverse relationship stems from two effects:
        </p>
        <ul style={{ paddingLeft: 24, fontSize: 13, marginBottom: 14 }}>
          <li style={{ marginBottom: 6 }}><strong>Substitution effect</strong> — consumers switch to cheaper alternatives.</li>
          <li style={{ marginBottom: 6 }}><strong>Income effect</strong> — higher prices reduce consumers' real purchasing power.</li>
        </ul>
        <p style={{ fontSize: 13, marginBottom: 14, textAlign: 'justify' }}>
          Formally, the demand curve is expressed as:
        </p>
        <div style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 6, padding: '10px 16px', fontSize: 13, fontFamily: 'monospace', marginBottom: 14 }}>
          Q<sub>d</sub> = f(P, I, P<sub>r</sub>, T, E)
        </div>
        <p style={{ fontSize: 12, color: '#555', marginBottom: 14 }}>
          where P = price, I = income, P<sub>r</sub> = related goods prices, T = tastes, E = expectations.
        </p>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, marginTop: 28 }}>3. The Law of Supply</h2>
        <p style={{ fontSize: 13, textAlign: 'justify' }}>
          The law of supply dictates that, ceteris paribus, higher prices incentivise producers to increase
          quantity supplied. The supply curve shifts when input costs, technology, number of competing firms,
          or expected future prices change significantly in the market.
        </p>
      </div>
    ),
  },
  {
    page: 2,
    content: (
      <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a1a1a', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>4. Market Equilibrium</h2>
        <p style={{ fontSize: 13, marginBottom: 14, textAlign: 'justify' }}>
          Market equilibrium occurs where Q<sub>d</sub> = Q<sub>s</sub>. At equilibrium price P*, there is
          neither a surplus nor a shortage. The equilibrium is stable because any deviation triggers market
          forces that restore balance automatically.
        </p>

        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <svg width="260" height="180" viewBox="0 0 260 180" style={{ border: '1px solid #eee', borderRadius: 6, background: '#fafafa' }}>
            <line x1="30" y1="20" x2="30" y2="155" stroke="#666" strokeWidth="1.5"/>
            <line x1="30" y1="155" x2="240" y2="155" stroke="#666" strokeWidth="1.5"/>
            <line x1="40" y1="30" x2="220" y2="145" stroke="#5D6BDE" strokeWidth="2"/>
            <text x="222" y="145" fontSize="11" fill="#5D6BDE" fontWeight="bold">D</text>
            <line x1="40" y1="145" x2="220" y2="30" stroke="#E84D4D" strokeWidth="2"/>
            <text x="222" y="35" fontSize="11" fill="#E84D4D" fontWeight="bold">S</text>
            <circle cx="130" cy="87" r="5" fill="#333"/>
            <line x1="130" y1="87" x2="130" y2="155" stroke="#333" strokeWidth="1" strokeDasharray="4"/>
            <line x1="30" y1="87" x2="130" y2="87" stroke="#333" strokeWidth="1" strokeDasharray="4"/>
            <text x="124" y="168" fontSize="10" fill="#333">P*</text>
            <text x="14" y="91" fontSize="10" fill="#333">Q*</text>
            <text x="22" y="15" fontSize="10" fill="#666">P</text>
            <text x="235" y="158" fontSize="10" fill="#666">Q</text>
          </svg>
          <p style={{ fontSize: 11, color: '#888', marginTop: 6 }}>Figure 1. Supply & Demand Equilibrium</p>
        </div>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, marginTop: 28 }}>5. Market Structures</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 16 }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '7px 10px', textAlign: 'left' }}>Structure</th>
              <th style={{ border: '1px solid #ccc', padding: '7px 10px' }}>Sellers</th>
              <th style={{ border: '1px solid #ccc', padding: '7px 10px' }}>Price Control</th>
              <th style={{ border: '1px solid #ccc', padding: '7px 10px' }}>Entry</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Perfect Competition', 'Many', 'None (Price-taker)', 'Free'],
              ['Monopolistic Comp.', 'Many', 'Some', 'Relatively free'],
              ['Oligopoly', 'Few', 'Significant', 'Restricted'],
              ['Monopoly', 'One', 'Full', 'Blocked'],
            ].map(([s, n, p, e], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ border: '1px solid #ddd', padding: '6px 10px', fontWeight: 600 }}>{s}</td>
                <td style={{ border: '1px solid #ddd', padding: '6px 10px', textAlign: 'center' }}>{n}</td>
                <td style={{ border: '1px solid #ddd', padding: '6px 10px', textAlign: 'center' }}>{p}</td>
                <td style={{ border: '1px solid #ddd', padding: '6px 10px', textAlign: 'center' }}>{e}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, marginTop: 20 }}>6. Price Elasticity of Demand</h2>
        <div style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 6, padding: '10px 16px', fontSize: 13, fontFamily: 'monospace', marginBottom: 12 }}>
          PED = (% ΔQ<sub>d</sub>) / (% ΔP)
        </div>
        <ul style={{ paddingLeft: 24, fontSize: 13 }}>
          <li style={{ marginBottom: 5 }}><strong>|PED| &gt; 1</strong>: Elastic demand (luxury goods, many substitutes)</li>
          <li style={{ marginBottom: 5 }}><strong>|PED| &lt; 1</strong>: Inelastic demand (necessities, few substitutes)</li>
          <li style={{ marginBottom: 5 }}><strong>|PED| = 1</strong>: Unit elastic demand</li>
        </ul>
      </div>
    ),
  },
];

// ── Mock Quiz Data ─────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    type: 'multiple_choice',
    question: 'If the price of a substitute good increases, the demand for the original good will:',
    options: ['Increase', 'Decrease', 'Remain unchanged', 'Become perfectly elastic'],
    correct: 0
  },
  {
    type: 'fill_in_the_blank',
    question: 'Market equilibrium occurs at the point where Quantity Demanded equals Quantity _____.',
    correct: 'Supplied'
  },
  {
    type: 'multiple_choice',
    question: 'Which market structure is characterized by a single seller?',
    options: ['Perfect Competition', 'Monopolistic Competition', 'Oligopoly', 'Monopoly'],
    correct: 3
  }
];

// ── Mock Video Data ────────────────────────────────────────────────────────────
const VIDEO_DATA = {
  title: 'Elasticity of Demand & Supply',
  src: 'https://www.w3schools.com/html/mov_bbb.mp4', // placeholder video
  duration: '10:45',
  description: 'In this lesson, we explore the concept of price elasticity, how to calculate it, and its policy implications inside real-world markets.'
};

// ── Highlight colours ─────────────────────────────────────────────────────────
const HIGHLIGHT_COLORS = [
  { label: 'Yellow', value: '#FEF9A1', ring: '#EAD700' },
  { label: 'Green',  value: '#B8F5C8', ring: '#22C55E' },
  { label: 'Blue',   value: '#BAE3FF', ring: '#38BDF8' },
  { label: 'Pink',   value: '#FFC6DA', ring: '#F472B6' },
  { label: 'Orange', value: '#FFD9A0', ring: '#FB923C' },
  { label: 'Purple', value: '#DDD0FF', ring: '#A78BFA' },
];

const TOTAL_SECONDS = 1; // Changed for quick testing

const upcomingSessions = [
  { num: '01', type: 'reading', title: 'Reading : Market Fundamentals', estTime: '12 Mins', badge: { icon: 'file', label: 'PDF NOTES' }, badgeColor: 'gray' },
  { num: '02', type: 'quiz', title: 'Concept Quiz : Supply & Demand', estTime: '20 Mins', badge: { icon: 'check', label: '15 Questions' }, badgeColor: 'green' },
  { num: '03', type: 'video', title: 'Video Lesson : Elasticity', estTime: '60 Mins', badge: { icon: 'video', label: 'Elasticity.mp4' }, badgeColor: 'purple' },
];

export default function StudySession() {
  const navigate = useNavigate();
  const location = useLocation();
  const colorPickerRef = useRef(null);

  // Dynamic plan data
  const planData = location.state?.plan;
  const sessions = planData?.sessionRoadmap || upcomingSessions; // fallback

  // Find the initial session to show based on status
  const defaultIdx = sessions.findIndex(s => s.status === 'IN PROGRESS');
  const nextIdx = sessions.findIndex(s => s.status === 'NEXT UP');
  const initialIdx = defaultIdx !== -1 ? defaultIdx : (nextIdx !== -1 ? nextIdx : Math.max(0, sessions.length - 1));

  const [currentSessionIdx, setCurrentSessionIdx] = useState(initialIdx);
  const [highestUnlockedIdx, setHighestUnlockedIdx] = useState(initialIdx); // Tracks which sessions have been unlocked
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const activeSession = sessions[currentSessionIdx];

  // ── Reading State
  const [pageNum, setPageNum] = useState(1);
  const [scale,   setScale]   = useState(1);
  const [activeHighlight, setActiveHighlight] = useState(false);
  const [highlightColor,  setHighlightColor]  = useState(HIGHLIGHT_COLORS[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [savedSelection,  setSavedSelection]  = useState(null);
  const numPages = PDF_PAGES.length;

  // ── Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ── Common Layout
  const [fullDocView,     setFullDocView]     = useState(false);
  const [seconds,      setSeconds]      = useState(TOTAL_SECONDS);
  const [timerRunning, setTimerRunning] = useState(true);
  const intervalRef = useRef(null);
  const [progress, setProgress] = useState(45); // Reading progress

  // Common: Check if the *active* session is completed based on its type
  const isCurrentSessionComplete = () => {
    // If time is up, it unlocks regardless of mode
    if (progress >= 100) return true;

    // For quiz, it can also unlock early if they score 100%
    if (activeSession.type === 'quiz') {
      if (!quizSubmitted) return false;
      const score = Object.keys(quizAnswers).filter(k => 
        QUIZ_QUESTIONS[k].type === 'multiple_choice' 
          ? quizAnswers[k] === QUIZ_QUESTIONS[k].correct
          : String(quizAnswers[k]).toLowerCase().trim() === String(QUIZ_QUESTIONS[k].correct).toLowerCase().trim()
      ).length;
      return score === QUIZ_QUESTIONS.length;
    }
    
    return false;
  };

  const formatTime = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
  const toggleTimer = () => setTimerRunning(p => !p);
  const resetTimer  = () => { clearInterval(intervalRef.current); setSeconds(TOTAL_SECONDS); setTimerRunning(false); setProgress(45); };
  
  const sessionComplete = isCurrentSessionComplete();

  const badgeIcon  = i => i==='check'?<CheckCircle2 size={11}/>:i==='video'?<PlayCircle size={11}/>:<FileText size={11}/>;
  const badgeClass = c => c==='green'?'text-green-600 bg-green-50 border-green-200':c==='purple'?'text-purple-600 bg-purple-50 border-purple-200':'text-gray-500 bg-white border-gray-200';

  // Unlock the next session immediately when the current one is complete
  useEffect(() => {
    if (sessionComplete && currentSessionIdx === highestUnlockedIdx) {
      setHighestUnlockedIdx(prev => Math.min(upcomingSessions.length - 1, prev + 1));
    }
  }, [sessionComplete, currentSessionIdx, highestUnlockedIdx]);

  // Timer logic (runs for ALL modes)
  useEffect(() => {
    clearInterval(intervalRef.current);

    if (timerRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { 
            clearInterval(intervalRef.current); 
            setTimerRunning(false); 
            setProgress(100); // Force to 100% when timer ends
            return 0; 
          }
          // Increase progress proportionally from 45% (where it started) to 100%
          setProgress(p => Math.min(100, p + (55 / TOTAL_SECONDS)));
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerRunning, activeSession.type]);

  useEffect(() => {
    const handler = e => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target))
        setShowColorPicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input (though there are no inputs right now)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        setPageNum(p => Math.max(1, p - 1));
      } else if (e.key === 'ArrowRight') {
        setPageNum(p => Math.min(numPages, p + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) setSavedSelection(sel.getRangeAt(0).cloneRange());
  };
  const restoreAndExec = (cmd, val) => {
    if (!savedSelection) return;
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(savedSelection);
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, val);
    sel.removeAllRanges(); setSavedSelection(null);
  };

  const submitQuiz = () => setQuizSubmitted(true);

  const currentPage = PDF_PAGES[pageNum - 1];

  const handleQuizAnswer = (qIndex, answer) => {
    if (!quizSubmitted) {
      setQuizAnswers(prev => ({ ...prev, [qIndex]: answer }));
    }
  };

  // Switch session handler
  const handleSwitchSession = (idx) => {
    if (idx <= highestUnlockedIdx) {
      setCurrentSessionIdx(idx);
      // Reset common states when switching
      setTimerRunning(true);
      setSeconds(TOTAL_SECONDS);
      setProgress(idx < highestUnlockedIdx ? 100 : 45); // if going back, assume already complete
    }
  };

  // ── Render PDF / Reading Mode
  const renderReadingMode = () => (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="bg-[#2A2B35] border-b border-white/10 px-4 py-2.5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/learning-plan')} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition text-sm font-medium">
            <ChevronLeft size={17}/> Back
          </button>
          <div className="w-px h-4 bg-white/10"/>
          <BookOpen size={14} className="text-[#7C8CF8]"/>
          <span className="text-sm text-gray-300 font-medium">Practice_Modul_Matrix.pdf</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={() => setPageNum(p => Math.max(1, p-1))} disabled={pageNum <= 1} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition disabled:opacity-30"><ChevronLeft size={15}/></button>
          <div className="flex items-center gap-1 bg-[#1E1F26] rounded-lg px-2 py-1 border border-white/10">
            <span className="text-sm text-white font-mono">{pageNum}</span>
            <span className="text-gray-500 text-sm">/ {numPages}</span>
          </div>
          <button onClick={() => setPageNum(p => Math.min(numPages, p+1))} disabled={pageNum >= numPages} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition disabled:opacity-30"><ChevronRight size={15}/></button>
          <div className="w-px h-4 bg-white/10 mx-1"/>
          <button onClick={() => setScale(s => Math.max(0.6, +(s-0.15).toFixed(2)))} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"><ZoomOut size={15}/></button>
          <span className="text-xs text-gray-400 w-10 text-center font-mono">{Math.round(scale*100)}%</span>
          <button onClick={() => setScale(s => Math.min(2, +(s+0.15).toFixed(2)))} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"><ZoomIn size={15}/></button>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative" ref={colorPickerRef}>
            <div className="flex items-center rounded-lg border border-white/10 overflow-hidden">
              <button onMouseDown={e => e.preventDefault()} onClick={() => { if (!activeHighlight) { setActiveHighlight(true); setShowColorPicker(true); } else setShowColorPicker(p => !p); }} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition ${activeHighlight ? 'bg-yellow-500/20 text-yellow-300' : 'hover:bg-white/10 text-gray-400'}`}>
                <Highlighter size={14}/> Highlight {activeHighlight && <span className="w-3 h-3 rounded-full border border-white/30" style={{ background: highlightColor.value }}/>}
              </button>
              {activeHighlight && <button onMouseDown={e => e.preventDefault()} onClick={() => { setActiveHighlight(false); setShowColorPicker(false); setSavedSelection(null); }} className="px-2 py-1.5 border-l border-white/10 hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition"><X size={12}/></button>}
            </div>

            {showColorPicker && (
              <div className="absolute top-full right-0 mt-2 bg-[#2A2B35] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 w-[215px]">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Highlight Color</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {HIGHLIGHT_COLORS.map(c => (
                    <button key={c.value} onMouseDown={e => { e.preventDefault(); setHighlightColor(c); restoreAndExec('backColor', c.value); setShowColorPicker(false); }} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition hover:bg-white/5 ${highlightColor.value===c.value?'ring-2':''}`} style={{'--tw-ring-color': c.ring}}>
                      <span className="w-8 h-8 rounded-lg border-2" style={{ background: c.value, borderColor: c.ring+'99' }}/>
                      <span className="text-[10px] text-gray-400 font-medium">{c.label}</span>
                    </button>
                  ))}
                </div>
                <button onMouseDown={e => { e.preventDefault(); restoreAndExec('backColor', 'transparent'); setShowColorPicker(false); }} className="w-full py-1.5 text-[11px] font-semibold text-red-400 hover:bg-red-500/10 rounded-lg transition border border-red-400/20">Remove Highlight</button>
              </div>
            )}
          </div>
          <button onClick={() => setFullDocView(p => !p)} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition">
            {fullDocView ? <Minimize2 size={15}/> : <Maximize2 size={15}/>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto flex flex-col items-center py-8 px-6 gap-4" onMouseUp={() => activeHighlight && saveSelection()}>
        <div className="bg-white shadow-2xl rounded-sm select-text" style={{ width: `${595 * scale}px`, minHeight: `${842 * scale}px`, padding: `${48 * scale}px`, transformOrigin: 'top center', fontSize: `${scale}em`, boxSizing: 'border-box' }}>
          {currentPage.content}
        </div>
        <div className="text-gray-600 text-xs font-mono">— {pageNum} —</div>
      </div>
    </div>
  );

  // ── Render Quiz Mode
  const renderQuizMode = () => (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F5F6FA]">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/learning-plan')} className="flex items-center gap-1.5 text-gray-500 hover:text-[#5D6BDE] transition text-sm font-medium">
            <ChevronLeft size={18}/> Back
          </button>
          <div className="w-px h-5 bg-gray-200"/>
          <Target size={18} className="text-[#2BB67D]"/>
          <div>
            <span className="text-sm font-bold text-gray-900 block">{activeSession.title}</span>
            <span className="text-[11px] text-gray-500">{QUIZ_QUESTIONS.length} Questions</span>
          </div>
        </div>
        <button onClick={() => setFullDocView(p => !p)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition">
          {fullDocView ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
        </button>
      </div>

      <div className="flex-1 overflow-auto px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {QUIZ_QUESTIONS.map((q, idx) => {
            const isCorrect = q.type === 'multiple_choice' 
              ? quizAnswers[idx] === q.correct
              : String(quizAnswers[idx]).toLowerCase().trim() === String(q.correct).toLowerCase().trim();
            const answered = quizAnswers[idx] !== undefined;

            return (
              <div key={idx} className={`bg-white rounded-2xl p-6 mb-6 border-2 transition-colors ${quizSubmitted ? (isCorrect ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30') : 'border-transparent shadow-sm'}`}>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EBF0FF] text-[#5D6BDE] font-bold text-sm shrink-0">{idx + 1}</span>
                  <p className="text-[15px] font-semibold text-gray-900 leading-relaxed">{q.question}</p>
                </div>

                {q.type === 'multiple_choice' ? (
                  <div className="space-y-3 pl-11">
                    {q.options.map((opt, oIdx) => {
                      const selected = quizAnswers[idx] === oIdx;
                      let optionClass = "border-gray-200 hover:border-[#5D6BDE] hover:bg-[#F5F7FF] text-gray-700";
                      
                      if (quizSubmitted) {
                        if (oIdx === q.correct) optionClass = "border-green-500 bg-green-50 text-green-800 font-medium";
                        else if (selected && !isCorrect) optionClass = "border-red-500 bg-red-50 text-red-800 line-through";
                        else optionClass = "border-gray-200 text-gray-400 opacity-50";
                      } else if (selected) {
                        optionClass = "border-[#5D6BDE] bg-[#EEF0FD] text-[#5D6BDE] font-semibold shadow-sm";
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizAnswer(idx, oIdx)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 ${optionClass}`}
                        >
                          <div className="flex flex-row items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-[#5D6BDE]' : 'border-gray-300'}`}>
                              {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#5D6BDE]"/>}
                            </div>
                            <span>{opt}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="pl-11 mt-2">
                    <input
                      type="text"
                      disabled={quizSubmitted}
                      placeholder="Type your answer here..."
                      value={quizAnswers[idx] || ''}
                      onChange={(e) => handleQuizAnswer(idx, e.target.value)}
                      className={`w-full max-w-sm px-4 py-3 rounded-xl border-2 outline-none font-medium transition-colors ${quizSubmitted ? (isCorrect ? 'border-green-500 bg-green-50 text-green-800' : 'border-red-500 bg-red-50 text-red-800') : 'border-gray-200 focus:border-[#5D6BDE] bg-gray-50 focus:bg-white text-gray-900'}`}
                    />
                    {quizSubmitted && !isCorrect && (
                      <p className="text-sm font-semibold text-red-500 mt-2 flex items-center gap-1.5"><X size={14}/> Correct answer: {q.correct}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-end mt-8 mb-12">
            {!quizSubmitted ? (
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                className="px-8 py-3.5 bg-[#2BB67D] hover:bg-[#239968] text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Score</p>
                  <p className="text-2xl font-extrabold text-[#5D6BDE]">
                    {Object.keys(quizAnswers).filter(k => 
                      QUIZ_QUESTIONS[k].type === 'multiple_choice' 
                        ? quizAnswers[k] === QUIZ_QUESTIONS[k].correct
                        : String(quizAnswers[k]).toLowerCase().trim() === String(QUIZ_QUESTIONS[k].correct).toLowerCase().trim()
                    ).length} / {QUIZ_QUESTIONS.length}
                  </p>
                </div>
                <button
                  onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={16}/> Reset Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ── Render Video Mode
  const renderVideoMode = () => (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0F1015]">
      <div className="bg-[#181920] border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/learning-plan')} className="flex items-center gap-1.5 text-gray-400 hover:text-white transition text-sm font-medium">
            <ChevronLeft size={18}/> Back
          </button>
          <div className="w-px h-5 bg-white/10"/>
          <PlayCircle size={18} className="text-[#5D6BDE]"/>
          <span className="text-sm font-bold text-gray-200 block">{VIDEO_DATA.title}</span>
        </div>
        <button onClick={() => setFullDocView(p => !p)} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 transition">
          {fullDocView ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
        </button>
      </div>

      <div className="flex-1 overflow-auto p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl mb-6 group border border-white/10">
            {/* Native video element */}
            <video 
              controls 
              className="w-full h-full object-contain"
              poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            >
              <source src={VIDEO_DATA.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="bg-[#181920] p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold text-white tracking-wide">{VIDEO_DATA.title}</h2>
              <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-mono rounded-lg">{VIDEO_DATA.duration}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
              {VIDEO_DATA.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-[#1E1F26] overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 -my-4 sm:-my-6 lg:-my-8" style={{ height: 'calc(100vh - 80px)' }}>

      {activeSession.type === 'reading' && renderReadingMode()}
      {activeSession.type === 'quiz' && renderQuizMode()}
      {activeSession.type === 'video' && renderVideoMode()}

      {!fullDocView && (
        <div className="w-[272px] shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span className="font-semibold">Plan Progress</span><span>20%</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#E84D4D] to-[#FF8C42]" style={{ width: '20%' }}/>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={15} className="text-[#5D6BDE]"/>
                <span className="text-[11px] font-extrabold text-[#5D6BDE] uppercase tracking-widest">Session Roadmap</span>
              </div>
              <div className="space-y-2">
                {sessions.map((s, idx) => {
                  const isActive = idx === currentSessionIdx;
                  const isUnlocked = idx <= highestUnlockedIdx;
                  const isLocked = !isUnlocked;
                  const isCompleted = idx < highestUnlockedIdx;

                  return (
                    <button 
                      key={s.num} 
                      onClick={() => handleSwitchSession(idx)} 
                      disabled={isLocked}
                      className={`w-full text-left border rounded-2xl p-3 transition-colors ${
                        isActive ? 'border-[#5D6BDE] bg-[#EEF0FD] shadow-sm' : 
                        isLocked ? 'border-[#E8EBFF]/60 bg-[#FAFBFF]/50 opacity-60 cursor-not-allowed' :
                        'border-[#E8EBFF] bg-[#FAFBFF] hover:border-[#A6B2F5]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                          isActive ? 'bg-[#5D6BDE] text-white' : 
                          isCompleted ? 'bg-[#2BB67D] text-white' :
                          'bg-gray-700 text-white'
                        }`}>
                          {isCompleted && !isActive ? <CheckCircle2 size={16}/> : s.num}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-1">
                            <p className={`font-bold text-[13px] leading-tight ${
                              isActive ? 'text-[#5D6BDE]' : 
                              isLocked ? 'text-gray-400' : 'text-gray-900'
                            }`}>{s.title}</p>
                            <span className={`flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                              isActive ? 'text-[#5D6BDE] bg-[#D4DBF9]' : 
                              isLocked ? 'text-gray-400 bg-gray-100/50' : 
                              isCompleted ? 'text-[#2BB67D] bg-green-100' : 'text-gray-500 bg-gray-100'
                            }`}>
                              {isLocked && <Lock size={10} className="mb-0.5"/>}
                              {isActive ? 'CURRENT' : isLocked ? 'LOCKED' : isCompleted ? 'DONE' : 'NEXT UP'}
                            </span>
                          </div>
                          <p className={`text-[11px] mt-0.5 mb-1.5 ${isActive ? 'text-[#5D6BDE]/80' : isLocked ? 'text-gray-300' : 'text-gray-400'}`}>Est. Time: {s.estTime}</p>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold border rounded-lg px-2 py-0.5 ${badgeClass(s.badgeColor)} ${isLocked ? 'opacity-50 grayscale' : ''}`}>
                            {badgeIcon(s.badge.icon)} {s.badge.label}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-[#F6F7FF] rounded-2xl p-4 border border-[#E0E4F8]">
              <div className="flex items-center gap-2 mb-3">
                <Target size={14} className="text-[#5D6BDE] animate-pulse"/>
                <span className="text-[11px] font-extrabold text-[#5D6BDE] uppercase tracking-widest">Deep Focus Active</span>
              </div>
              <div className="bg-white rounded-xl p-3 mb-3 text-center border border-[#E8EBFF]">
                <p className="text-[11px] text-gray-400 mb-0.5">Time Remaining</p>
                <p className="text-3xl font-extrabold text-gray-900 font-mono tracking-wide">{formatTime(seconds)}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={toggleTimer} className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${timerRunning?'bg-orange-100 text-orange-600 hover:bg-orange-200':'bg-[#5D6BDE] text-white hover:bg-[#4C5AC7]'}`}>
                  {timerRunning?<><span className="w-3 h-3 border-2 border-orange-500 rounded-sm"/> Pause</>:<><PlayCircle size={13}/> Resume</>}
                </button>
                <button onClick={resetTimer} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition"><RotateCcw size={13}/></button>
              </div>
            </div>

            {activeSession.type !== 'quiz' && (
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-bold text-gray-700">Session Progress</span>
                  <span className="font-bold text-gray-700">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${sessionComplete?'bg-gradient-to-r from-green-400 to-emerald-500':'bg-gradient-to-r from-[#E84D4D] to-[#FF8C42]'}`} style={{ width:`${Math.round(progress)}%` }}/>
                </div>
                {sessionComplete && <p className="text-xs text-green-600 font-semibold mt-1.5 flex items-center gap-1"><CheckCircle2 size={12}/> Session complete!</p>}
              </div>
            )}

            {activeSession.type === 'quiz' && (
              <div className="bg-[#EBF0FF] rounded-xl p-4 border border-[#D4DBF9] text-center">
                <Target size={24} className="mx-auto text-[#5D6BDE] mb-2" />
                <p className="font-bold text-[#5D6BDE] text-sm mb-1">{sessionComplete ? 'Quiz Passed!' : 'Pass the Quiz'}</p>
                <p className="text-[11px] text-[#5D6BDE]/80 leading-relaxed">
                  {sessionComplete 
                    ? 'Excellent job. You have unlocked the next session.' 
                    : 'Wait for the timer to finish or answer all questions correctly to unlock the next session.'}
                </p>
                {sessionComplete && <CheckCircle2 size={20} className="mx-auto text-green-500 mt-2" />}
              </div>
            )}

            <div>
              <button disabled={!sessionComplete} onClick={() => {
                  if (sessionComplete && currentSessionIdx < sessions.length - 1) {
                    handleSwitchSession(currentSessionIdx + 1);
                  } else if (sessionComplete) {
                    setShowCongratsModal(true);
                  }
                }}
                className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all duration-300 ${sessionComplete?'bg-[#5D6BDE] text-white hover:bg-[#4C5AC7] shadow-md':'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                {currentSessionIdx < sessions.length - 1 ? 'Go to Next Session' : 'Finish All Sessions'} <ArrowRight size={16}/>
              </button>
              {!sessionComplete && <p className="text-[10px] text-gray-400 text-center mt-1.5">Complete the session to unlock the next one</p>}
            </div>
          </div>
        </div>
      )}

      {showCongratsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
            
            <div className="w-20 h-20 bg-gradient-to-tr from-[#5D6BDE] to-[#8A98F7] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
              <Trophy size={40} className="text-white fill-white/20" />
            </div>

            <h2 className="text-2xl font-black text-gray-900 mb-2">Awesome Work!</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              You've successfully completed all study sessions in this learning plan. Keep up the great momentum!
            </p>

            <button
              onClick={() => navigate('/learning-plan')}
              className="w-full bg-[#5D6BDE] hover:bg-[#4C5AC7] text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md shadow-[#5D6BDE]/20"
            >
              Return to Plan
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
