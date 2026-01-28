import React from 'react';

const Challenges: React.FC = () => {
  const quests = [
    { id: 1, title: 'Password Purge', reward: '50 XP', icon: '🔑', desc: 'Secure 3 different app accounts.', status: 'in-progress', progress: 66 },
    { id: 2, title: 'Scam Slayer', reward: '100 XP', icon: '⚔️', desc: 'Identify 5 scam messages correctly.', status: 'locked', progress: 0 },
    { id: 3, title: 'Privacy Shield', reward: '40 XP', icon: '🕵️', desc: 'Audit your Instagram privacy settings.', status: 'completed', progress: 100 },
    { id: 4, title: 'MFA Master', reward: '75 XP', icon: '📱', desc: 'Enable 2FA on your main email.', status: 'in-progress', progress: 0 },
    { id: 5, title: 'Social Guard', reward: '60 XP', icon: '👥', desc: 'Check your IG followers for bots.', status: 'locked', progress: 0 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 uppercase italic tracking-tighter">Cyber Quests</h2>
        <p className="text-slate-400">Complete missions to level up your security and earn clout.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((q) => (
          <div 
            key={q.id} 
            className={`card-blur p-6 rounded-[2rem] relative overflow-hidden transition-all duration-500 border-2 ${
              q.status === 'completed' 
                ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                : q.status === 'locked' ? 'opacity-40 grayscale border-transparent' 
                : 'border-slate-800 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform ${q.status === 'completed' ? 'scale-110 rotate-12 bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  {q.status === 'locked' ? '🔒' : (q.status === 'completed' ? '✅' : q.icon)}
                </div>
                <div>
                  <h3 className={`font-black text-lg italic tracking-tight uppercase ${q.status === 'completed' ? 'text-emerald-400 line-through opacity-60' : 'text-white'}`}>
                    {q.title}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{q.desc}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                q.status === 'completed' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'bg-slate-900 text-cyan-400 border-slate-800'
              }`}>
                {q.status === 'completed' ? 'REDEEMED' : q.reward}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <span>Neural Sync Progress</span>
                <span>{q.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                <div 
                  className={`h-full transition-all duration-1000 ${q.status === 'completed' ? 'bg-emerald-500' : 'bg-cyan-500'}`}
                  style={{ width: `${q.progress}%` }}
                />
              </div>
            </div>

            {q.status === 'locked' && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                <div className="px-6 py-2 bg-slate-900 border border-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl text-slate-400">
                  CLEARANCE LEVEL 3 REQUIRED
                </div>
              </div>
            )}
            
            {q.status === 'completed' && (
              <div className="absolute -bottom-2 -right-2 opacity-10 text-8xl pointer-events-none select-none italic font-black">
                DONE
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-10 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
          <span className="text-9xl">🏆</span>
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.4em] mb-2">Global Event Active</p>
          <h3 className="text-4xl font-black italic tracking-tighter text-white mb-4 uppercase">Guardian Tournament</h3>
          <p className="text-indigo-100 mb-8 max-w-md font-medium leading-relaxed">Join the weekly leaderboard and win exclusive badges and profile icons. Are you the most secure in your squad?</p>
          <button className="px-10 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase tracking-widest text-xs italic">
            Initialize Entry Protocol
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenges;