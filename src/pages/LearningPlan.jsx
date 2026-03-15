import React, { useState } from 'react';
import { Calendar, Plus, Check, Calculator, Brain, BookOpen, Sprout, FlaskConical, Microscope, Trash2, Clock, FileText, ChevronDown, Search, UserPlus, UserMinus, X, PlayCircle, GitBranch, CheckCircle2, Video, FileDown, Users, CircleUserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePlanModal from '../components/CreatePlanModal';
import SavedDraftsModal from '../components/SavedDraftsModal';
import JoinPlanModal from '../components/JoinPlanModal';
import SessionRoadmapCard from '../components/SessionRoadmapCard';
import footerImage from '../assets/images/learning-plan-footer.png';

const planData = [
  {
    id: 1,
    title: 'UAS Preparation',
    subtitle: 'Integrated Calculus & Physics',
    icon: <Calculator size={24} />,
    iconColor: 'text-[#4A72FF]',
    iconBg: 'bg-[#EBF0FF]',
    headerBg: 'bg-[#EBF0FF]',
    progress: 65,
    progressColor: 'bg-[#4A72FF]',
    collaborators: [1, 2, 3],
    extraCollaborators: 5,
    sessionCount: 2,
    totalTime: '2 hours 30 minutes',
    overallProgress: 65,
    status: 'In Progress',
    sessionRoadmap: [
      { num: '01', type: 'reading', title: 'Calculus : Limits & Derivatives', status: 'DONE', badge: { icon: 'file', label: 'PDF NOTES' }, badgeColor: 'gray' },
      { num: '02', type: 'video', title: 'Physics : Kinematics Equations', status: 'NEXT UP', estTime: '45 Mins', badge: { icon: 'video', label: 'Video Lecture' }, badgeColor: 'purple' },
    ],
  },
  {
    id: 2,
    title: 'Thesis Research',
    subtitle: 'AI in Modern Education',
    icon: <Microscope size={24} />,
    iconColor: 'text-[#00915B]',
    iconBg: 'bg-[#E5F4EE]',
    headerBg: 'bg-[#EAF7F2]',
    progress: 30,
    progressColor: 'bg-[#6D42A5]',
    collaborators: [1, 2, 3],
    extraCollaborators: 10,
    sessionCount: 3,
    totalTime: '1 hours 15 minutes',
    overallProgress: 20,
    status: 'Ready to Start',
    sessionRoadmap: [
      { num: '01', type: 'reading', title: 'Reading : Market Fundamentals', status: 'IN PROGRESS', pct: 60, timeLeft: '12 Mins Left', badge: { icon: 'file', label: 'PDF NOTES' }, badgeColor: 'gray' },
      { num: '02', type: 'quiz', title: 'Concept Quiz : Supply & Demand', status: 'NEXT UP', estTime: '20 Mins', badge: { icon: 'check', label: '15 Questions' }, badgeColor: 'green' },
      { num: '03', type: 'video', title: 'Video Lesson : Elasticity', status: 'NEXT UP', estTime: '60 Mins', badge: { icon: 'video', label: 'Elasticity.mp4' }, badgeColor: 'purple' },
    ],
  },
  {
    id: 3,
    title: 'Macroeconomics 101',
    subtitle: 'Basic Principles and Market',
    icon: <Brain size={24} />,
    iconColor: 'text-[#6D42A5]',
    iconBg: 'bg-[#F0EBF6]',
    headerBg: 'bg-[#F3EEF9]',
    progress: 0,
    progressText: 'Not Started',
    progressTextColor: 'text-[#00B47D]',
    progressColor: 'bg-gray-200',
    collaborators: [1, 2, 3],
    extraCollaborators: 4,
    sessionCount: 2,
    totalTime: '1 hours 40 minutes',
    overallProgress: 0,
    status: 'Not Started',
    sessionRoadmap: [
      { num: '01', type: 'reading', title: 'Intro : Supply & Demand Curves', status: 'NEXT UP', estTime: '30 Mins', badge: { icon: 'file', label: 'PDF NOTES' }, badgeColor: 'gray' },
      { num: '02', type: 'quiz', title: 'Macroeconomic Indicators', status: 'NEXT UP', estTime: '40 Mins', badge: { icon: 'check', label: '10 Questions' }, badgeColor: 'green' },
    ],
  },
  {
    id: 4,
    title: 'Organic Chemistry',
    subtitle: 'Functional Group Review',
    icon: <FlaskConical size={24} />,
    iconColor: 'text-[#FFB340]',
    iconBg: 'bg-[#FFF7EB]',
    headerBg: 'bg-[#FFF7EB]',
    progress: 92,
    progressColor: 'bg-[#FF4A4A]',
    collaborators: [1],
    extraCollaborators: 0,
    sessionCount: 10,
    totalTime: '5 hours 00 minutes',
    overallProgress: 92,
    status: 'Almost Done',
    sessionRoadmap: [
      { num: '01', type: 'quiz', title: 'Functional Groups Overview', status: 'DONE', pct: 100, badge: { icon: 'check', label: 'Completed' }, badgeColor: 'green' },
      { num: '02', type: 'reading', title: 'Reaction Mechanisms', status: 'IN PROGRESS', pct: 80, timeLeft: '5 Mins Left', badge: { icon: 'file', label: 'Lab Notes' }, badgeColor: 'gray' },
      { num: '03', type: 'video', title: 'Stereochemistry Concepts', status: 'NEXT UP', estTime: '30 Mins', badge: { icon: 'video', label: 'Lecture Video' }, badgeColor: 'purple' },
    ],
  },
];

const mockAvatars = [
  { bg: 'bg-red-100', text: 'text-red-500' },
  { bg: 'bg-purple-100', text: 'text-purple-500' },
  { bg: 'bg-blue-100', text: 'text-blue-500' }
];


export default function LearningPlan() {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSavedDraftsModal, setShowSavedDraftsModal] = useState(false);
  const [showJoinPlanModal, setShowJoinPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [draftToEdit, setDraftToEdit] = useState(null);

  // Draft storage
  const [drafts, setDrafts] = useState([
    {
      id: 1001,
      title: 'Calculus Final Exam Prep',
      description: 'Intensive review for calculus exam covering limits, derivatives, and integrals',
      icon: 'calculator',
      sessions: [
        { id: 1, title: 'Limits & Continuity', duration: '120 minutes', mode: 'Reading', material: 'Practice_Modul_Matrix.pdf' },
        { id: 2, title: 'Derivatives Quiz', duration: '60 minutes', mode: 'Quiz', material: 'Calculus Multiple Choice' },
      ],
      teamMembers: [
        { id: 1, name: 'Olivia', email: 'olivia123@gmail.com', isOwner: true },
      ],
      publicSharing: false,
      lastStep: 2,
      savedAt: 'Mar 13, 2026 · 10:34 AM',
    },
    {
      id: 1002,
      title: 'Bioinformatics Basics',
      description: 'Introduction to bioinformatics tools and sequence analysis',
      icon: 'flask',
      sessions: [
        { id: 1, title: 'Intro to BLAST', duration: '90 minutes', mode: 'Video', material: 'Introduction_to_Macroeconomics.mp4' },
      ],
      teamMembers: [
        { id: 1, name: 'Olivia', email: 'olivia123@gmail.com', isOwner: true },
        { id: 2, name: 'Antonia', email: 'antonia@gmail.com', isOwner: false },
      ],
      publicSharing: true,
      lastStep: 1,
      savedAt: 'Mar 8, 2026 · 03:15 PM',
    },
  ]);

  // Draft handlers
  const handleSaveDraft = (draftData) => {
    setDrafts(prev => {
      const existing = prev.findIndex(d => d.id === draftData.id);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing] = draftData;
        return updated;
      }
      return [draftData, ...prev];
    });
  };

  const handleDeleteDraft = (id) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  const handleResumeDraft = (draft) => {
    setDraftToEdit(draft);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setDraftToEdit(null);
  };

  return (
    <div className="flex flex-col gap-8 pb-10 text-gray-800">
      <div className="w-full">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Learning Plan</h1>
            <p className="text-gray-500 text-[15px] flex items-center gap-1.5 flex-wrap">
              Hey Olivia! You have 
              <span className="bg-[#E6F0FF] text-[#4A72FF] px-2.5 py-0.5 rounded-full font-semibold text-[13px]">
                4 active plan
              </span> 
              to finished !
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowSavedDraftsModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#E6E9FA] text-[#5D6BDE] font-bold hover:bg-[#EEF0FD] hover:border-[#5D6BDE] transition-colors bg-white shadow-sm"
            >
              <FileDown size={18} />
              Saved Drafts
            </button>
            <button 
              onClick={() => setShowJoinPlanModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5D6BDE] text-white font-bold hover:bg-[#4C5AC7] transition-colors shadow-md shadow-[#5D6BDE]/20 border-2 border-[#5D6BDE]"
            >
              <Users size={18} />
              Join Plan
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Map through existing plans */}
          {planData.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col h-[220px] transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] hover:-translate-y-1.5 cursor-pointer`}
            >
              
              {/* Card Header (Icon + Titles) */}
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-[14px] ${plan.iconBg} ${plan.iconColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
                   {plan.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-[17px] leading-tight mb-1">{plan.title}</h3>
                  <p className="text-gray-500 text-[13px]">{plan.subtitle}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-auto mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-gray-500 text-xs font-semibold">Progress</span>
                  <span className={`text-xs font-bold ${plan.progressText ? plan.progressTextColor : plan.iconColor}`}>
                    {plan.progressText ? plan.progressText : `${plan.progress}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${plan.progressColor} h-2 rounded-full`} 
                    style={{ width: `${plan.progress > 0 ? plan.progress : 15}%` }} 
                  ></div>
                </div>
              </div>

              {/* Card Footer (Collaborators & Sessions) */}
              <div className="flex justify-between items-center mt-auto">
                <div>
                   <span className="text-gray-900 text-[9px] font-bold uppercase tracking-wider block mb-1.5">Collaborators</span>
                   <div className="flex -space-x-2">
                     {plan.collaborators.map((_, i) => {
                       const avatar = mockAvatars[i % mockAvatars.length];
                       return (
                         <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-white ${avatar.bg}`}>
                           <CircleUserRound size={28} className={avatar.text} />
                         </div>
                       );
                     })}
                     {plan.extraCollaborators > 0 && (
                       <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 z-10">
                         +{plan.extraCollaborators}
                       </div>
                     )}
                   </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-gray-500 self-end mb-1">
                   <Calendar size={14} className="text-[#3b5166]" />
                   <span className="text-[11px] font-semibold text-[#3b5166]">{plan.sessions} Sessions</span>
                </div>
              </div>

            </div>
          ))}

          {/* Add New Plan Card */}
          <div 
            onClick={() => setShowCreateModal(true)}
            className="bg-white rounded-[24px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-[220px] cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] hover:-translate-y-1.5"
          >
             <div className="w-[60px] h-[60px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4 transition hover:bg-gray-300">
               <Plus size={30} strokeWidth={2} />
             </div>
             <h3 className="text-gray-600 font-semibold text-[16px] mb-1">Create New Plan</h3>
             <p className="text-gray-400 text-xs text-center max-w-[120px]">
               Start structing a new study session
             </p>
          </div>

        </div>

        {/* Footer Banner */}
        <div className="rounded-[40px] overflow-hidden mt-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-[#EBE7FA]">
          <img src={footerImage} alt="Maintain your streak" className="w-auto h-auto object-cover object-top mx-auto" />
        </div>

      </div>

      {/* Create New Plan Modal */}
      <CreatePlanModal 
        isOpen={showCreateModal} 
        onClose={handleCloseCreateModal}
        onSaveDraft={handleSaveDraft}
        draftToEdit={draftToEdit}
      />

      {/* Saved Drafts Modal */}
      <SavedDraftsModal
        isOpen={showSavedDraftsModal}
        onClose={() => setShowSavedDraftsModal(false)}
        drafts={drafts}
        onDeleteDraft={handleDeleteDraft}
        onResumeDraft={handleResumeDraft}
      />

      {/* Join Plan Modal */}
      <JoinPlanModal
        isOpen={showJoinPlanModal}
        onClose={() => setShowJoinPlanModal(false)}
      />

      {/* Plan Detail Modal — dynamic for all plans */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[480px] max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">

            {/* Header */}
            <div className={`${selectedPlan.headerBg} px-6 pt-6 pb-5 relative`}>
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-500 transition"
              >
                <X size={18} />
              </button>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">{selectedPlan.status}</p>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-2xl bg-white border border-white/50 flex items-center justify-center ${selectedPlan.iconColor}`}>
                  {selectedPlan.icon}
                </div>
                <h2 className="text-[26px] font-extrabold text-gray-900 leading-tight">{selectedPlan.title}</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600 border border-gray-200">
                <Clock size={12} className="text-yellow-500" />
                Total : {selectedPlan.totalTime}
              </span>
            </div>

            {/* Body — Session Roadmap */}
            <div className="overflow-y-auto flex-1 px-6 pt-5 pb-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch size={20} className="text-blue-500" />
                <h3 className="text-[18px] font-extrabold text-gray-900">Session Roadmap</h3>
              </div>

              {selectedPlan.sessionRoadmap.map((s) => (
                <SessionRoadmapCard key={s.num} session={s} />
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 font-medium">Resume with friends</span>
                  <div className="flex -space-x-2">
                    {(selectedPlan.collaborators || []).slice(0, 2).map((_, i) => {
                      const avatar = mockAvatars[i % mockAvatars.length];
                      return (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white ${avatar.bg}`}>
                          <CircleUserRound size={32} className={avatar.text}/>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">STATUS</p>
                  <p className="text-[#4A72FF] font-extrabold text-[15px]">{selectedPlan.overallProgress}% Overall Progress</p>
                </div>
              </div>

              <button
                onClick={() => {
                  const planToPass = {
                    id: selectedPlan.id,
                    title: selectedPlan.title,
                    sessionRoadmap: selectedPlan.sessionRoadmap
                  };
                  setSelectedPlan(null);
                  navigate('/study-session', { state: { plan: planToPass } });
                }}
                className="w-full py-4 rounded-2xl border-2 border-[#2BB67D] bg-[#E8FAF4] text-[#1FA96A] font-extrabold text-[16px] flex items-center justify-center gap-3 hover:bg-[#d2f5e8] transition-all duration-300"
              >
                <PlayCircle size={22} />
                Continue Study Session
              </button>
              <p className="text-center text-gray-400 text-xs mt-2">Picking up right where you left off!</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
