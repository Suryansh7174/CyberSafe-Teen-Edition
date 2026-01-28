
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      setTimeout(() => {
        onLogin(username);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-cyan-600/10 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-12 animate-in fade-in zoom-in duration-1000">
          <div className="relative inline-block mb-16 group">
            <div className="absolute inset-0 bg-cyan-400/20 blur-[50px] rounded-full"></div>
            <div className="w-48 h-48 rounded-[3.5rem] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6 border border-slate-800 shadow-2xl relative z-10 overflow-hidden group-hover:border-cyan-500/50 transition-all">
              <span className="text-8xl">🛡️</span>
            </div>
            {/* Repositioned tag to avoid overlap with the main title */}
            <div className="absolute -bottom-4 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-lg shadow-2xl rotate-6 uppercase tracking-tighter z-20 border-2 border-slate-950">
              Teen Edition
            </div>
          </div>
          
          <h1 className="text-6xl font-black tracking-tighter text-white italic mb-2 relative z-10">
            <span className="text-cyan-400">CYBER</span>SAFE
          </h1>
          <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase opacity-80 mb-2">Guardian Hub Control</p>
        </div>

        <div className="card-blur p-10 rounded-[3rem] shadow-2xl border border-slate-800/50 relative overflow-hidden">
          <div className="flex bg-slate-900/60 p-2 rounded-2xl mb-10 border border-slate-800/50">
            <button 
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all uppercase ${!isSignup ? 'bg-cyan-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Log Session
            </button>
            <button 
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-3.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all uppercase ${isSignup ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Initialize Hub
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Guardian Identity</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-cyan-400 transition-colors font-mono">@</span>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="enter handle"
                  className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl pl-11 pr-5 py-4 text-white placeholder-slate-800 focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Access Cipher</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-cyan-400 transition-colors text-xs">🔐</span>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/40 border border-slate-800 rounded-2xl pl-11 pr-5 py-4 text-white placeholder-slate-800 focus:border-cyan-500/50 outline-none transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-5 rounded-2xl font-black text-lg shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 italic tracking-tighter ${
                loading 
                ? 'bg-slate-800 text-slate-600' 
                : isSignup ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-[3px] border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  Stabilizing...
                </>
              ) : (
                <>{isSignup ? 'DEPLOY GUARDIAN' : 'AUTHORIZE ENTRY'}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
