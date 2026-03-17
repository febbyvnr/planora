import React from 'react';
import { X, FileEdit, Trash2, Clock, PlayCircle, BookOpen, Target, Video, Calculator, Brain, Sprout, FlaskConical, Microscope, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ICON_MAP = {
  calculator: <Calculator size={20} />,
  brain:      <Brain size={20} />,
  book:       <BookOpen size={20} />,
  sprout:     <Sprout size={20} />,
  flask:      <FlaskConical size={20} />,
  microscope: <Microscope size={20} />,
};

const STEP_LABELS = ['Plan Basics', 'Sessions', 'Team'];

const MODE_ICON = {
  Reading: <BookOpen size={12} />,
  Quiz:    <Target size={12} />,
  Video:   <Video size={12} />,
};

const MODE_COLORS = {
  Reading: 'text-blue-600 bg-blue-50 border-blue-200',
  Quiz:    'text-green-600 bg-green-50 border-green-200',
  Video:   'text-purple-600 bg-purple-50 border-purple-200',
};

export default function SavedDraftsModal({ isOpen, onClose, drafts = [], onDeleteDraft, onResumeDraft }) {
  if (!isOpen) return null;

  const handleDelete = (id) => {
    onDeleteDraft?.(id);
    toast.success('Draft deleted successfully');
  };

  const handleResume = (draft) => {
    onResumeDraft?.(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white w-[90%] max-w-[560px] max-h-[85vh] flex flex-col rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-5 border-b border-gray-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-bold text-gray-900 flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FBA834] to-[#F59E0B] flex items-center justify-center shadow-sm shadow-amber-200">
                <FileEdit className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              Saved Drafts
            </h2>
            <p className="text-gray-500 text-[14px] mt-1.5">Continue building your incomplete learning plans</p>
          </div>
         <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-200"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>
        </div>

        {/* Draft Count Badge */}
        {drafts.length > 0 && (
          <div className="px-5 sm:px-8 pt-4 pb-0 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <AlertCircle size={13} />
              {drafts.length} draft{drafts.length !== 1 ? 's' : ''} waiting to be completed
            </span>
          </div>
        )}

        {/* List */}
        <div className="p-5 sm:p-6 px-4 sm:px-8 overflow-y-auto flex-1 rounded-b-3xl">
          {drafts.length === 0 ? (
            <div className="text-center py-14">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-dashed border-gray-200">
                <FileEdit className="text-gray-300" size={28} />
              </div>
              <p className="text-gray-900 font-bold text-[16px] mb-1">No saved drafts yet!</p>
              <p className="text-gray-400 text-sm max-w-[240px] mx-auto leading-relaxed">
                Start creating a learning plan and save it as a draft to continue later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {drafts.map(draft => {
                const stepReached = draft.lastStep || 1;
                const icon = ICON_MAP[draft.icon] || <Calculator size={20} />;

                return (
                  <div 
                    key={draft.id} 
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#5D6BDE]/40 transition-all duration-300 group"
                  >
                    {/* Draft Card Header */}
                    <div className="px-5 pt-5 pb-3">
                      <div className="flex items-start gap-3.5">
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-xl bg-[#EEF0FD] text-[#5D6BDE] flex items-center justify-center shrink-0">
                          {icon}
                        </div>
                        
                        {/* Title & Meta */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold text-gray-900 mb-0.5 truncate">{draft.title || 'Untitled Plan'}</h3>
                          {draft.description && (
                            <p className="text-gray-400 text-[12px] truncate mb-2">{draft.description}</p>
                          )}
                          <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock size={11} className="text-gray-400"/>
                              {draft.savedAt || 'Just now'}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"/>
                            <span className="text-[#5D6BDE] font-semibold">
                              {draft.sessions?.length || 0} Session{(draft.sessions?.length || 0) !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sessions Preview */}
                    {draft.sessions && draft.sessions.length > 0 && (
                      <div className="px-5 pb-3">
                        <div className="flex flex-wrap gap-1.5">
                          {draft.sessions.slice(0, 4).map((s, i) => (
                            <span key={i} className={`inline-flex items-center gap-1 text-[10px] font-semibold border rounded-lg px-2 py-1 ${MODE_COLORS[s.mode] || 'text-gray-500 bg-gray-50 border-gray-200'}`}>
                              {MODE_ICON[s.mode] || <FileText size={10}/>}
                              {s.title ? (s.title.length > 18 ? s.title.substring(0, 18) + '...' : s.title) : s.mode}
                            </span>
                          ))}
                          {draft.sessions.length > 4 && (
                            <span className="text-[10px] font-semibold text-gray-400 px-2 py-1">
                              +{draft.sessions.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step Progress & Actions */}
                    <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                      {/* Step Progress */}
                      <div className="flex items-center gap-1.5">
                        {STEP_LABELS.map((label, idx) => (
                          <React.Fragment key={label}>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-colors ${
                              idx + 1 <= stepReached 
                                ? 'bg-[#EEF0FD] text-[#5D6BDE]' 
                                : 'bg-gray-100 text-gray-300'
                            }`}>
                              {label}
                            </div>
                            {idx < STEP_LABELS.length - 1 && (
                              <div className={`w-3 h-[2px] rounded-full ${idx + 1 < stepReached ? 'bg-[#5D6BDE]' : 'bg-gray-200'}`}/>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1.5 sm:gap-2">
                        <button 
                          onClick={() => handleResume(draft)}
                          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#5D6BDE] hover:bg-[#4C5AC7] text-white text-[10px] sm:text-[11px] font-bold transition-colors shadow-sm"
                        >
                          <PlayCircle size={13} />
                          Continue
                        </button>
                        <button 
                          onClick={() => handleDelete(draft.id)}
                          className="w-8 h-8 rounded-xl bg-white border border-gray-200 hover:bg-red-50 hover:border-red-300 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all"
                          title="Delete Draft"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
