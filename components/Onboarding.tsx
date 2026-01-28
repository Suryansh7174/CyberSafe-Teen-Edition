
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: () => void;
  profile: UserProfile;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, profile }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome, Guardian",
      desc: `The digital world is sus. CyberSafe is your mission control for staying secured, no cap. Let's initialize your profile.`,
      icon: "🛡️",
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Shield AI",
      desc: "Meet Shield. Your personal cyber coach. Stuck on a setting or spotted a red flag? Shield has your back 24/7.",
      icon: "🤖",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Scam Scanner",
      desc: "Instantly analyze DMs, links, and emails. Our neural engine spots phishing before you click. Stay a step ahead.",
      icon: "🔍",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "HackBlitz Games",
      desc: "Security training shouldn't be boring. Play HackBlitz missions to level up your XP and earn legendary trophies.",
      icon: "🎮",
      color: "from-orange-500 to-rose-500"
    }
  ];

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 opacity-10 blur-[120px] rounded-full transition-all duration-1000 bg-gradient-to-br ${steps[step].color}`}></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="card-blur p-10 rounded-[3.5rem] border border-slate-800 shadow-2xl flex flex-col items-center text-center">
          <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${steps[step].color} flex items-center justify-center text-6xl shadow-2xl mb-8 transform transition-transform duration-500 scale-110`}>
            {steps[step].icon}
          </div>
          
          <h2 className="text-3xl font-black italic tracking-tighter text-white mb-4">
            {steps[step].title}
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
            {steps[step].desc}
          </p>

          <div className="w-full flex flex-col gap-4">
            <button 
              onClick={next}
              className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all bg-gradient-to-r ${steps[step].color} text-slate-950 italic tracking-tighter uppercase`}
            >
              {step === steps.length - 1 ? 'Start Mission ⚡' : 'Next Briefing →'}
            </button>
            
            <div className="flex justify-center gap-2 mt-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === step ? 'w-10 bg-white' : 'w-2 bg-slate-800'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="mt-8 text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-slate-400 transition-colors mx-auto block"
        >
          Skip Introduction
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
