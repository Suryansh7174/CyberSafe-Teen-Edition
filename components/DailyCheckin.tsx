
import React, { useState } from 'react';
import { CheckinQuestion } from '../types';

interface DailyCheckinProps {
  onComplete: (xp: number) => void;
  username: string;
}

const QUESTIONS: CheckinQuestion[] = [
  { id: '1', text: "Did you use unique passwords for all your logins today?", impact: "Prevents credential stuffing attacks." },
  { id: '2', text: "Have you enabled 2FA (Two-Factor Authentication) on your main social accounts?", impact: "Stops 99% of automated hacking attempts." },
  { id: '3', text: "Did you click any 'sus' links or DMs today?", impact: "Phishing is the #1 way teens get hacked." },
  { id: '4', text: "Have you updated your phone or app software recently?", impact: "Fixes security holes that hackers exploit." },
  { id: '5', text: "Is your Instagram or Snapchat profile set to Private?", impact: "Keeps creeps and data miners out of your business." }
];

const DailyCheckin: React.FC<DailyCheckinProps> = ({ onComplete, username }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswer = (val: boolean) => {
    setAnswers({ ...answers, [QUESTIONS[currentIdx].id]: val });
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowSummary(true);
    }
  };

  const progress = ((currentIdx + (showSummary ? 1 : 0)) / QUESTIONS.length) * 100;

  if (showSummary) {
    const positiveCount = Object.values(answers).filter(v => v).length;
    const bonusXp = positiveCount * 20;

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-[100px] rounded-full bg-cyan-500 animate-pulse"></div>
        
        <div className="max-w-md w-full card-blur p-10 rounded-[3rem] border border-slate-800 shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-5xl mb-8 mx-auto shadow-inner border border-emerald-500/20">
            📊
          </div>
          
          <h2 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase">Sync Complete</h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Guardian Identity: {username}</p>
          
          <div className="space-y-4 mb-10">
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5">Defense Score</p>
              <p className="text-5xl font-black italic tracking-tighter text-emerald-400">
                {Math.round((positiveCount / QUESTIONS.length) * 100)}%
              </p>
            </div>
            
            <p className="text-sm text-slate-400 font-medium italic">
              "Your digital shield is {positiveCount === QUESTIONS.length ? 'impenetrable' : 'strengthening'}, Guardian. Keep those habits locked."
            </p>
          </div>

          <button 
            onClick={() => onComplete(bonusXp)}
            className="w-full py-5 rounded-2xl bg-cyan-500 text-slate-950 font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all italic tracking-tighter"
          >
            CONFIRM DATA SYNC XP +{bonusXp}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      
      <div className="max-w-lg w-full relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[0.4em]">Daily Habit Sync</h2>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">Stabilizing Neural Shields...</p>
          </div>
          <span className="text-2xl font-black italic tracking-tighter text-slate-700">{currentIdx + 1}/{QUESTIONS.length}</span>
        </div>

        <div className="w-full h-2 bg-slate-900 rounded-full mb-12 overflow-hidden border border-slate-800 shadow-inner">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="card-blur p-12 rounded-[3.5rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
          <p className="text-3xl font-black italic text-white leading-tight mb-8 tracking-tighter">
            "{QUESTIONS[currentIdx].text}"
          </p>
          
          <div className="p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 mb-12">
            <p className="text-[10px] font-black text-cyan-400 uppercase tracking widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Tactical Insight
            </p>
            <p className="text-xs text-slate-500 font-medium italic">{QUESTIONS[currentIdx].impact}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => handleAnswer(true)}
              className="py-6 rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group/btn"
            >
              <span className="text-4xl block mb-2">✅</span>
              <span className="text-[10px] font-black text-slate-500 group-hover/btn:text-emerald-400 uppercase tracking-widest">Confirmed</span>
            </button>
            <button 
              onClick={() => handleAnswer(false)}
              className="py-6 rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-red-500/50 hover:bg-red-500/5 transition-all group/btn"
            >
              <span className="text-4xl block mb-2">❌</span>
              <span className="text-[10px] font-black text-slate-500 group-hover/btn:text-red-400 uppercase tracking-widest">Vulnerable</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckin;
