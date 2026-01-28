
import React, { useState } from 'react';
import { Achievement, UserProfile } from '../types';

interface AchievementsProps {
  profile: UserProfile;
}

const Achievements: React.FC<AchievementsProps> = ({ profile }) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const achievements: Achievement[] = [
    { 
      id: '1', 
      title: 'First Contact', 
      description: 'Consulted Shield AI for the first time.', 
      icon: '🛸', 
      unlocked: true,
      rarity: 'common'
    },
    { 
      id: '2', 
      title: 'Password Fortress', 
      description: 'Created a God Tier password.', 
      icon: '🏰', 
      unlocked: true,
      rarity: 'rare'
    },
    { 
      id: '3', 
      title: 'Scam Sensei', 
      description: 'Detected 10 phishing attempts correctly.', 
      icon: '🧠', 
      unlocked: false,
      rarity: 'epic'
    },
    { 
      id: '4', 
      title: 'Unstoppable', 
      description: 'Maintain a 30 day security streak.', 
      icon: '💎', 
      unlocked: false,
      rarity: 'legendary'
    },
    { 
      id: '5', 
      title: 'Shadow Ghost', 
      description: 'Anonymized all social media profiles.', 
      icon: '👻', 
      unlocked: true,
      rarity: 'rare'
    },
    { 
      id: '6', 
      title: 'Code Breaker', 
      description: 'Passed the advanced encryption challenge.', 
      icon: '💻', 
      unlocked: false,
      rarity: 'legendary'
    },
    { 
      id: '7', 
      title: 'Neural Link', 
      description: 'Used Scam Scanner on 50 unique messages.', 
      icon: '🧬', 
      unlocked: false,
      rarity: 'epic'
    },
    { 
      id: '8', 
      title: 'The Architect', 
      description: 'Designed a multi-layered security plan with Shield.', 
      icon: '📐', 
      unlocked: true,
      rarity: 'rare'
    },
    { 
      id: '9', 
      title: 'Void Walker', 
      description: 'Completed HackBlitz Sector 10 without hull damage.', 
      icon: '🌌', 
      unlocked: false,
      rarity: 'legendary'
    }
  ];

  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-slate-400 bg-slate-400/10 border-slate-400/20 shadow-slate-400/5';
      case 'rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/20 shadow-blue-400/5';
      case 'epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/20 shadow-purple-400/10';
      case 'legendary': return 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-amber-400/20 glow-amber';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const handleShare = async (a: Achievement) => {
    const shareData = {
      title: 'CyberSafe Achievement Unlocked!',
      text: `Yo! I just unlocked the "${a.title}" trophy on CyberSafe! 🛡️ ${a.description} Level up your security game with me. #CyberSafe #Guardian #NoCap`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled or failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.text);
        alert('Trophy link copied to clipboard! Share it with your squad. 🚀');
      } catch (err) {
        alert('Sharing failed, but you are still a legend! 🛡️');
      }
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto pb-20 animate-in fade-in duration-1000">
      {/* Dynamic Header */}
      <div className="text-center mb-16 relative">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] animate-pulse rounded-full scale-150"></div>
          <div className="w-44 h-44 rounded-[3.5rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800 flex items-center justify-center text-8xl shadow-2xl relative z-10 overflow-hidden transform hover:scale-110 transition-transform duration-700 cursor-help">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10"></div>
            {profile.avatar}
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black px-6 py-2 rounded-2xl shadow-2xl z-20 whitespace-nowrap text-xs italic tracking-tighter uppercase border-2 border-slate-950">
            Elite Guardian // Rank {Math.floor(unlockedCount / 2) + 1}
          </div>
        </div>
        
        <h2 className="text-5xl font-black italic tracking-tighter mb-4 uppercase text-white mt-12">Trophy Vault</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em] mb-10">Neural Achievement Stream // Active</p>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Completion', value: `${Math.round((unlockedCount / achievements.length) * 100)}%` },
            { label: 'Unlocked', value: unlockedCount },
            { label: 'Rarity Bonus', value: '+450 XP' },
            { label: 'Global Rank', value: '#124' }
          ].map((stat, i) => (
            <div key={i} className="card-blur p-4 rounded-2xl border-slate-800/50">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black text-white italic">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-10">
        {['all', 'unlocked', 'locked'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f ? 'bg-cyan-500 text-slate-950 shadow-lg scale-105' : 'bg-slate-900 text-slate-500 hover:text-slate-300'
            }`}
          >
            {f} Missions
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAchievements.map((a) => (
          <div 
            key={a.id} 
            className={`card-blur p-8 rounded-[3rem] relative flex flex-col items-center text-center group transition-all duration-700 border-2 overflow-hidden ${
              a.unlocked 
                ? 'border-slate-800 bg-slate-900/40 hover:border-cyan-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' 
                : 'opacity-40 grayscale border-transparent bg-slate-950/20 hover:opacity-60'
            }`}
          >
            {/* Rarity Tag */}
            <div className={`absolute top-6 right-6 text-[8px] font-black uppercase px-3 py-1.5 rounded-xl border shadow-2xl z-10 ${getRarityStyles(a.rarity)}`}>
              {a.rarity}
            </div>

            {/* Icon Container */}
            <div className="relative mb-8 mt-4">
              {a.unlocked && a.rarity === 'legendary' && (
                <div className="absolute inset-0 bg-amber-500/20 blur-3xl animate-pulse rounded-full"></div>
              )}
              <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-6xl transition-all duration-700 ${
                a.unlocked 
                  ? 'bg-slate-950 border border-slate-800 shadow-inner group-hover:scale-110 group-hover:rotate-6' 
                  : 'bg-slate-900 border-2 border-dashed border-slate-800'
              }`}>
                {a.unlocked ? a.icon : '🔒'}
              </div>
              {a.unlocked && (
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-cyan-500 border-4 border-slate-950 flex items-center justify-center text-slate-950 text-xs shadow-2xl rotate-12">
                  <span className="font-black">✓</span>
                </div>
              )}
            </div>

            <h3 className="font-black text-2xl mb-3 italic tracking-tighter text-white uppercase group-hover:text-cyan-400 transition-colors">
              {a.unlocked ? a.title : 'SECURED DATA'}
            </h3>
            
            <p className="text-sm text-slate-500 leading-relaxed font-bold mb-10 px-4 min-h-[3rem]">
              {a.unlocked ? a.description : 'Decrypt more missions to reveal this tactical achievement.'}
            </p>

            {a.unlocked ? (
              <button 
                onClick={() => handleShare(a)}
                className="w-full mt-auto py-5 rounded-2xl bg-slate-950 border border-slate-800 hover:bg-white hover:text-slate-950 hover:border-white transition-all font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 group/btn"
              >
                <span className="text-lg group-hover/btn:scale-125 transition-transform">💎</span>
                Sync Clout
              </button>
            ) : (
              <div className="w-full mt-auto py-5 rounded-2xl bg-slate-900/50 border border-slate-800/50 text-[8px] font-black text-slate-700 uppercase tracking-widest">
                Mission Pending...
              </div>
            )}

            {/* Subtle background flair */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      <style>{`
        .glow-amber {
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Achievements;
