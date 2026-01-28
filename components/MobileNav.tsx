
import React from 'react';
import { AppView } from '../types';

interface MobileNavProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, icon: '🏠' },
    { id: AppView.SCAM_DETECTOR, icon: '🔍' },
    { id: AppView.PASSWORD_VAULT, icon: '🔐' },
    { id: AppView.AI_COACH, icon: '🤖' },
    { id: AppView.CHALLENGES, icon: '⚔️' },
    { id: AppView.ACHIEVEMENTS, icon: '🏆' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 flex justify-around items-center p-2 z-50">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveView(item.id)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
            activeView === item.id 
              ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
              : 'text-slate-500'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
        </button>
      ))}
    </nav>
  );
};

export default MobileNav;
