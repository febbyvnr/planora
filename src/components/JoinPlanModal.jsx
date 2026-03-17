import React, { useState, useRef, useEffect } from 'react';
import { X, Users, ArrowRight, Hash, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const CODE_LENGTH = 6;

export default function JoinPlanModal({ isOpen, onClose }) {
  const [codeDigits, setCodeDigits] = useState(Array(CODE_LENGTH).fill(''));
  const inputRefs = useRef([]);

  const [toast, setToast] = useState(null);
  const [errorToast, setErrorToast] = useState(null);

  const showErrorToast = (message) => {
    setErrorToast(message);
    setTimeout(() => {
      setErrorToast(null);
    }, 2000);
  };
  
    const showToast = (message, conf) => {
      setToast(message);
  
      if (conf) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999
        });
      }
  
      setTimeout(() => {
        setToast(null);
      }, 2000);
    };

  // Focus first input on open
  useEffect(() => {
    if (isOpen) {
      setCodeDigits(Array(CODE_LENGTH).fill(''));
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    }
  }, [isOpen]);

  const handleChange = (idx, value) => {
    // Allow only alphanumeric
    const char = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(-1);
    const updated = [...codeDigits];
    updated[idx] = char;
    setCodeDigits(updated);

    // Auto-focus next
    if (char && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !codeDigits[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'Enter') {
      handleJoin();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, CODE_LENGTH);
    const updated = [...codeDigits];
    for (let i = 0; i < pasted.length; i++) {
      updated[i] = pasted[i];
    }
    setCodeDigits(updated);
    const focusIdx = Math.min(pasted.length, CODE_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const code = codeDigits.join('');
  const isComplete = code.length === CODE_LENGTH && codeDigits.every(d => d !== '');

  const handleJoin = () => {
    if (!isComplete) {
      showErrorToast('Please enter a complete 6-character code.');
      return;
    }
    showToast(`Successfully sent join request for code: ${code} 🎉`, true);
    setTimeout(() => {
      setCodeDigits(Array(CODE_LENGTH).fill(''));
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white w-[90%] max-w-[440px] rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">

        <div className="h-1.5 bg-gradient-to-r from-[#5D6BDE] via-[#8A98F7] to-[#5D6BDE]" />

        <div className="p-6 sm:p-8 pt-5 sm:pt-6">
         <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-200"
                            onClick={onClose}
                        >
                            <X size={20} />
                        </button>


          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5D6BDE] to-[#8A98F7] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-[#5D6BDE]/25">
              <Users size={24} className="text-white sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-gray-900 leading-tight mb-1.5">Join a Learning Plan</h2>
            <p className="text-gray-400 text-[13px] px-2 leading-relaxed">
              Enter the 6-character invite code shared by the plan owner
            </p>
          </div>

          {/* Code Input */}
          <div className="mb-5 sm:mb-6">
            <label className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3 block text-center">
              INVITE CODE
            </label>
            <div className="flex justify-center gap-1.5 sm:gap-2.5" onPaste={handlePaste}>
              {codeDigits.map((digit, idx) => (
                <React.Fragment key={idx}>
                  {idx === 3 && (
                    <div className="flex items-center px-0 sm:px-0.5">
                      <div className="w-1.5 sm:w-2.5 h-[3px] bg-gray-300 rounded-full" />
                    </div>
                  )}
                  <input
                    ref={el => inputRefs.current[idx] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(idx, e.target.value)}
                    onKeyDown={e => handleKeyDown(idx, e)}
                    className={`w-9 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono rounded-xl border-2 outline-none transition-all duration-200 
                      ${digit 
                        ? 'border-[#5D6BDE] bg-[#F5F7FF] text-[#5D6BDE] shadow-sm shadow-[#5D6BDE]/10' 
                        : 'border-gray-200 bg-gray-50 text-gray-700 focus:border-[#5D6BDE] focus:bg-white focus:shadow-sm focus:shadow-[#5D6BDE]/10'
                      }`}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Join Button */}
          <button 
            onClick={handleJoin}
            disabled={!isComplete}
            className={`w-full flex items-center justify-center gap-2.5 py-3.5 font-bold rounded-2xl transition-all duration-300 text-[15px] ${
              isComplete 
                ? 'bg-[#5D6BDE] hover:bg-[#4C5AC7] text-white shadow-lg shadow-[#5D6BDE]/25 hover:shadow-xl hover:shadow-[#5D6BDE]/30' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Join Learning Plan <ArrowRight size={18} />
          </button>

          <p className="text-center text-gray-400 text-[11px] mt-3">
            Ask the plan owner for the code if you don't have one
          </p>
        </div>
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
          <div className="bg-white border shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3">
            <CheckCircle className="text-green-500" size={20}/>
            <p className="text-sm font-medium text-gray-700">
              {toast}
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
    </div>
  );
}
