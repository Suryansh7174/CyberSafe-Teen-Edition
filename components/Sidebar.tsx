
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  themeColor?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, themeColor }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: '🏠' },
    { id: AppView.SCAM_DETECTOR, label: 'Scam Scanner', icon: '🔍' },
    { id: AppView.GAME, label: 'HackBlitz', icon: '⚡' },
    { id: AppView.PASSWORD_VAULT, label: 'Safe Passwords', icon: '🔐' },
    { id: AppView.AI_COACH, label: 'AI Coach', icon: '🤖' },
    { id: AppView.CHALLENGES, label: 'Quests', icon: '⚔️' },
    { id: AppView.ACHIEVEMENTS, label: 'Trophies', icon: '🏆' },
  ];

  const getColorClass = () => {
    switch (themeColor) {
      case 'purple': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'emerald': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'rose': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
    }
  };

  const getAccentBg = () => {
    switch (themeColor) {
      case 'purple': return 'bg-purple-500';
      case 'emerald': return 'bg-emerald-500';
      case 'rose': return 'bg-rose-500';
      default: return 'bg-cyan-500';
    }
  };

  return (
    <nav className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 shadow-2xl z-20">
      <div className="mb-10">
        <div className="flex flex-col items-center gap-4 px-2 cursor-pointer group" onClick={() => setActiveView(AppView.DASHBOARD)}>
          <div className="w-24 h-24 flex items-center justify-center p-2 rounded-2xl bg-slate-950/50 border border-slate-800 group-hover:border-cyan-500/40 transition-all shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
            <span className="text-4xl group-hover:scale-110 transition-transform relative z-10">🛡️</span>
          </div>
          <div className="text-center">
            <span className="font-black text-2xl tracking-tighter italic block leading-none text-white">CYBERSAFE</span>
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em] block mt-1">Guardian Hub v1.5</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 space-y-2.5">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all relative group ${
              activeView === item.id 
                ? `${getColorClass()} border shadow-lg` 
                : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            {activeView === item.id && (
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full ${getAccentBg()}`}></div>
            )}
            <span className={`text-xl transition-transform group-hover:scale-125 duration-300 ${activeView === item.id ? 'opacity-100' : 'opacity-60'}`}>{item.icon}</span>
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800/50">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 group hover:border-indigo-500/40 transition-all cursor-help">
          <p className="text-[9px] font-black text-indigo-400/80 uppercase mb-2 tracking-[0.3em]">Guardian Status</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <span className="text-xl font-black text-white leading-none block">5 Days</span>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block mt-0.5">Active Streak</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
