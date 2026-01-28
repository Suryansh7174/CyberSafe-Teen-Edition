import React, { useState, useEffect } from 'react';
import { AppView, UserProfile } from './types';
import Dashboard from './components/Dashboard';
import ScamDetector from './components/ScamDetector';
import PasswordVault from './components/PasswordVault';
import AICoach from './components/AICoach';
import Challenges from './components/Challenges';
import Achievements from './components/Achievements';
import HackBlitz from './components/Game';
import Login from './components/Login';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Onboarding from './components/Onboarding';
import DailyCheckin from './components/DailyCheckin';

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showDailyCheckin, setShowDailyCheckin] = useState(false);
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [userLevel, setUserLevel] = useState(1);
  const [xp, setXp] = useState(150);
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    username: 'CyberGhost',
    avatar: '🛡️',
    themeColor: 'cyan'
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (xp >= 1000) {
      setUserLevel(prev => prev + 1);
      setXp(prev => prev - 1000);
      showNotification("RANK UP // CLEARANCE LEVEL INCREASED", "success");
    }
  }, [xp]);

  const showNotification = (message: string, type: 'success' | 'info' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (username: string) => {
    setProfile(prev => ({ ...prev, username }));
    setIsAuthenticated(true);
    
    const hasOnboarded = localStorage.getItem('cs_onboarded') === 'true';
    const lastCheckin = localStorage.getItem('cs_last_checkin');
    const today = new Date().toDateString();

    if (!hasOnboarded) {
      setShowOnboarding(true);
    } else if (lastCheckin !== today) {
      setShowDailyCheckin(true);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('cs_onboarded', 'true');
    setShowOnboarding(false);
    setShowDailyCheckin(true);
    showNotification("NEURAL LINK ESTABLISHED", "success");
  };

  const completeCheckin = (bonusXp: number) => {
    setXp(prev => prev + bonusXp);
    localStorage.setItem('cs_last_checkin', new Date().toDateString());
    setShowDailyCheckin(false);
    showNotification(`SYNC COMPLETE // +${bonusXp} XP RECEIVED`, "success");
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,#334155_1px,transparent_0)] bg-[size:40px_40px]"></div>
        <div className="scanline absolute inset-0 z-50 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-cyan-500/30 blur-[60px] animate-pulse rounded-full scale-125"></div>
            <div className="w-64 h-64 rounded-[3.5rem] bg-slate-900/40 backdrop-blur-md flex items-center justify-center border border-slate-800 animate-in zoom-in duration-1000 shadow-2xl relative">
                <span className="text-[120px] animate-bounce drop-shadow-[0_0_30px_rgba(6,182,212,0.4)]">🛡️</span>
                <div className="absolute inset-0 scanline-fast pointer-events-none opacity-20"></div>
            </div>
          </div>
          <div className="flex flex-col items-center w-64">
            <h1 className="text-4xl font-black italic text-white tracking-tighter mb-4 flex gap-1">
              <span className="text-cyan-400">CYBER</span>
              <span className="text-emerald-400">SAFE</span>
            </h1>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 shadow-inner">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-loading-bar shadow-[0_0_15px_rgba(34,211,238,0.6)]"></div>
            </div>
            <p className="mt-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] animate-pulse">Initializing Hub...</p>
            <p className="mt-2 text-[8px] font-mono text-slate-700">KERNEL: 1.5.0 // SESSION: NEW</p>
          </div>
        </div>
        <style>{`
          @keyframes loading-bar { 0% { width: 0%; transform: translateX(-100%); } 100% { width: 100%; transform: translateX(0); } }
          .animate-loading-bar { animation: loading-bar 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
          .scanline { background: linear-gradient(to bottom, transparent 50%, rgba(0, 255, 255, 0.05) 51%); background-size: 100% 4px; }
          .scanline-fast { background: linear-gradient(transparent, rgba(6,182,212,0.2), transparent); background-size: 100% 20px; animation: scan 1s linear infinite; }
          @keyframes scan { from { background-position: 0 0; } to { background-position: 0 100%; } }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;
  if (showOnboarding) return <Onboarding onComplete={completeOnboarding} profile={profile} />;
  if (showDailyCheckin) return <DailyCheckin onComplete={completeCheckin} username={profile.username} />;

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD: return <Dashboard setActiveView={setActiveView} xp={xp} userLevel={userLevel} />;
      case AppView.SCAM_DETECTOR: return <ScamDetector onComplete={() => { setXp(prev => prev + 50); showNotification("SCAM DECRYPTED // +50 XP", "success"); }} />;
      case AppView.PASSWORD_VAULT: return <PasswordVault onComplete={() => { setXp(prev => prev + 30); showNotification("VAULT SECURED // +30 XP", "success"); }} />;
      case AppView.AI_COACH: return <AICoach />;
      case AppView.CHALLENGES: return <Challenges />;
      case AppView.ACHIEVEMENTS: return <Achievements profile={profile} />;
      case AppView.GAME: return <HackBlitz onWin={(points) => { setXp(prev => prev + points); showNotification(`MISSION SUCCESS // +${points} XP RECEIVED`, "success"); }} />;
      case AppView.PROFILE: return <Profile profile={profile} setProfile={setProfile} onLogout={() => setIsAuthenticated(false)} />;
      default: return <Dashboard setActiveView={setActiveView} xp={xp} userLevel={userLevel} />;
    }
  };

  const getThemeClass = () => {
    switch (profile.themeColor) {
      case 'purple': return 'from-purple-400 to-indigo-500';
      case 'emerald': return 'from-emerald-400 to-teal-500';
      case 'rose': return 'from-rose-400 to-pink-500';
      default: return 'from-cyan-400 to-blue-500';
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-['Space_Grotesk'] relative">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] scanline"></div>
      
      {/* Global Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 fade-in duration-500">
          <div className={`px-8 py-3 rounded-full border shadow-2xl backdrop-blur-xl flex items-center gap-4 ${
            notification.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
          }`}>
            <span className="text-xl">{notification.type === 'success' ? '✅' : 'ℹ️'}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur border border-slate-800 px-4 py-1.5 rounded-full flex items-center gap-3 shadow-2xl">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Guardian Hub // v1.5.0</span>
        </div>
      </div>

      <Sidebar activeView={activeView} setActiveView={setActiveView} themeColor={profile.themeColor} />
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8 scroll-smooth transition-all duration-500">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveView(AppView.DASHBOARD)}>
             <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/40 transition-all shadow-xl relative overflow-hidden">
               <span className="text-3xl group-hover:rotate-12 transition-transform relative z-10">🛡️</span>
               <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
             </div>
             <div>
               <h1 className={`text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r ${getThemeClass()}`}>CYBERSAFE</h1>
               <div className="flex items-center gap-2">
                 <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">Unit: {profile.username}</p>
                 <span className="text-[7px] font-mono text-slate-700 bg-slate-900 px-1 rounded">BETA</span>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:block">
              <div className="text-[9px] font-black text-right text-slate-500 mb-1.5 uppercase tracking-widest">Sync Quota: {xp}/1000</div>
              <div className="w-40 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className={`h-full transition-all duration-700 ${profile.themeColor === 'purple' ? 'bg-purple-500' : profile.themeColor === 'emerald' ? 'bg-emerald-500' : profile.themeColor === 'rose' ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${(xp % 1000) / 10}%` }}></div>
              </div>
            </div>
            <button onClick={() => setActiveView(AppView.PROFILE)} className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-2xl border-2 border-slate-800 hover:border-cyan-400 transition-all active:scale-90 bg-slate-900 relative">
              {profile.avatar}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950"></div>
            </button>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">{renderView()}</div>
      </main>

      <button 
        onClick={() => setIsDebugOpen(!isDebugOpen)}
        className="fixed bottom-24 right-6 w-12 h-12 bg-slate-900 border border-slate-800 rounded-full hidden md:flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 shadow-2xl z-[100] group transition-all"
        title="Prototype Debug"
      >
        <span className="text-xl group-hover:rotate-180 transition-transform">⚙️</span>
      </button>

      {isDebugOpen && (
        <div className="fixed bottom-40 right-6 w-64 card-blur p-5 rounded-3xl border border-slate-800 shadow-2xl z-[100] animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Diagnostic</p>
            <button onClick={() => setIsDebugOpen(false)} className="text-slate-600 hover:text-white">✕</button>
          </div>
          <div className="space-y-2 font-mono text-[9px] text-slate-500">
            <div className="flex justify-between"><span>Core Temp</span><span className="text-emerald-400">Optimal</span></div>
            <div className="flex justify-between"><span>Mem Reserve</span><span className="text-emerald-400">1.2GB</span></div>
            <div className="flex justify-between"><span>UI FPS</span><span className="text-emerald-400">60.0</span></div>
            <div className="flex justify-between"><span>AI Session</span><span className="text-cyan-400">Stable</span></div>
            <div className="flex justify-between"><span>Sync State</span><span className="text-cyan-400">Active</span></div>
            <div className="mt-4 pt-2 border-t border-slate-800 flex gap-2">
               <button onClick={() => window.location.reload()} className="flex-1 py-1.5 bg-red-500/10 text-red-500 rounded uppercase text-[8px] font-black">Flush Cache</button>
               <button className="flex-1 py-1.5 bg-slate-800 rounded uppercase text-[8px] font-black">Export Logs</button>
            </div>
          </div>
        </div>
      )}

      <MobileNav activeView={activeView} setActiveView={setActiveView} />
    </div>
  );
};

export default App;