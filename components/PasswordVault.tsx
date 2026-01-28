import React, { useState, useEffect } from 'react';

interface PasswordVaultProps {
  onComplete: () => void;
}

const PasswordVault: React.FC<PasswordVaultProps> = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [isSuccessfullyVaulted, setIsSuccessfullyVaulted] = useState(false);

  useEffect(() => {
    evaluatePassword(password);
  }, [password]);

  const evaluatePassword = (pwd: string) => {
    let score = 0;
    let tips: string[] = [];

    if (!pwd) {
      setStrength(0);
      setFeedback([]);
      return;
    }

    if (pwd.length > 8) score += 20;
    if (pwd.length > 12) score += 20;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20;

    // Red flags
    if (/^[0-9]+$/.test(pwd)) tips.push("Only numbers? That's too easy to guess.");
    if (pwd.toLowerCase().includes('password')) tips.push("Seriously? 'Password' in a password? L.");
    if (pwd.toLowerCase().includes('123')) tips.push("Sequence '123' is a red flag.");
    
    if (pwd.length < 8) tips.push("Make it longer (at least 8 chars).");
    if (!/[A-Z]/.test(pwd)) tips.push("Add some CAPITAL letters.");
    if (!/[^A-Za-z0-9]/.test(pwd)) tips.push("Throw in some symbols like @, #, $.");

    setStrength(score);
    setFeedback(tips);

    if (score >= 90 && password.length > 0 && !isSuccessfullyVaulted) {
      setIsSuccessfullyVaulted(true);
      setTimeout(() => {
        onComplete();
        setPassword('');
        setIsSuccessfullyVaulted(false);
      }, 2500);
    }
  };

  const generatePassphrase = () => {
    const words = ["Cypher", "Ghost", "Volt", "Static", "Neon", "Void", "Pixel", "Circuit", "Pulse", "Shadow", "Rogue", "Logic"];
    const symbols = ["!", "@", "#", "$", "*"];
    const nums = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    
    const w1 = words[Math.floor(Math.random() * words.length)];
    const w2 = words[Math.floor(Math.random() * words.length)];
    const s = symbols[Math.floor(Math.random() * symbols.length)];
    
    const newPwd = `${w1}-${w2}-${nums}${s}`;
    setPassword(newPwd);
  };

  const getStrengthColor = () => {
    if (strength < 40) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
    if (strength < 70) return 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
    return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
  };

  const getStrengthLabel = () => {
    if (strength < 40) return 'Weak / Sus';
    if (strength < 70) return 'Medium / Mid';
    if (strength < 90) return 'Strong / Secure';
    return 'God Tier / Untouchable';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-block p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] mb-6 shadow-2xl transform hover:rotate-6 transition-transform">
          <span className="text-6xl">🔐</span>
        </div>
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Password Audit</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Vault Integrity: {strength}%</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {isSuccessfullyVaulted && (
          <div className="absolute inset-[-20px] z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl rounded-[3.5rem] animate-in zoom-in-95 duration-500 border-2 border-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.2)]">
            <div className="text-center">
              <div className="text-8xl mb-6 animate-bounce drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">💎</div>
              <h3 className="text-4xl font-black italic tracking-tighter text-emerald-400 uppercase mb-2">Vault Secured</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em] animate-pulse">Protocol W // Integrity 100%</p>
            </div>
          </div>
        )}

        <div className="card-blur p-8 rounded-[2.5rem] border-slate-800 space-y-8">
          <div>
            <label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1 mb-3">Target Cipher</label>
            <div className="relative group">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here to test..."
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-800 focus:border-emerald-500/50 outline-none transition-all font-mono"
              />
              {password && (
                <button 
                  onClick={() => setPassword('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
              <span className="text-slate-500">Security Grade</span>
              <span className={strength < 40 ? 'text-red-500' : strength < 70 ? 'text-amber-500' : 'text-emerald-500'}>
                {getStrengthLabel()}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className={`h-full transition-all duration-700 ${getStrengthColor()}`}
                style={{ width: `${strength}%` }}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/50">
            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 mb-6">
               <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Tactical Advice
               </p>
               <p className="text-[10px] text-slate-500 italic leading-relaxed">Pro Tip: Use phrases instead of single words. Harder to crack, easier to remember.</p>
            </div>
            <button 
              onClick={generatePassphrase}
              className="w-full py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Generate God-Tier Passphrase ✨
            </button>
          </div>
        </div>

        <div className="card-blur p-8 rounded-[2.5rem] border-slate-800 relative overflow-hidden">
          <h3 className="text-sm font-black uppercase tracking-widest italic mb-6 flex items-center gap-3">
            <span className="text-cyan-400">🛡️</span> Neural Analysis
          </h3>
          {feedback.length > 0 ? (
            <div className="space-y-3">
              {feedback.map((tip, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-800 animate-in slide-in-from-right-2">
                  <span className="text-xl">⚠️</span>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          ) : password.length > 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <div className="text-7xl mb-6 animate-pulse">🚀</div>
              <p className="font-black italic tracking-tighter text-2xl text-emerald-400 uppercase">Zero Vulnerabilities</p>
              <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-widest">Hackers are crying right now.</p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 p-8 border-2 border-dashed border-slate-800 rounded-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">Awaiting Input Sequence...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordVault;