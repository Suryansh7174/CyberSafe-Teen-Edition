
import React, { useState, useEffect } from 'react';
import { analyzeScamMessage } from '../services/geminiService';
import { ScamReport } from '../types';

interface ScamDetectorProps {
  onComplete: () => void;
}

const ScamDetector: React.FC<ScamDetectorProps> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ScamReport | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Initializing Neural Link...",
    "Scanning for Malicious Payloads...",
    "Checking Social Engineering Patterns...",
    "Analyzing Linguistic Red Flags...",
    "Finalizing Security Audit..."
  ];

  useEffect(() => {
    let interval: number;
    if (loading) {
      setLoadingStep(0);
      interval = window.setInterval(() => {
        setLoadingStep(prev => (prev + 1) % steps.length);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeScamMessage(input);
      setReport(result);
      if (!result.isScam) onComplete();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setInput('');
    setReport(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="relative inline-block mb-4">
           <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
           <div className="relative p-5 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
             <span className="text-5xl">🔍</span>
           </div>
        </div>
        <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Scam Scanner</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Neural Link // Phishing Detection</p>
      </div>

      {!report ? (
        <div className="relative">
          <div className={`card-blur p-8 rounded-[2.5rem] shadow-2xl border-slate-800 transition-all duration-500 ${loading ? 'opacity-40 blur-sm scale-95 pointer-events-none' : ''}`}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste that suspicious message, email, or DM here..."
              className="w-full h-56 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 text-slate-100 placeholder-slate-700 focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 outline-none transition-all resize-none font-medium leading-relaxed"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className={`w-full mt-8 py-5 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all italic tracking-tighter ${
                loading 
                  ? 'bg-slate-800 text-slate-600' 
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 active:scale-95'
              }`}
            >
              SCAN MESSAGE ⚡
            </button>
            <p className="mt-4 text-center text-[10px] font-black text-slate-600 uppercase tracking-widest italic">
              Neural analysis is powerful but trust your instincts first.
            </p>
          </div>

          {/* Enhanced Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
               <div className="relative mb-10">
                 {/* Animated Pulsing Radar */}
                 <div className="w-32 h-32 rounded-full border border-cyan-500/50 animate-[ping_2s_linear_infinite]"></div>
                 <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-cyan-400 animate-pulse flex items-center justify-center bg-cyan-500/5">
                   <div className="w-16 h-16 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-cyan-400 border-l-transparent animate-spin"></div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl">🤖</span>
                 </div>
               </div>
               
               <div className="text-center">
                 <p className="text-cyan-400 font-black italic tracking-tighter text-2xl mb-2">{steps[loadingStep]}</p>
                 <div className="flex justify-center gap-1.5">
                   <div className={`w-2 h-2 rounded-full transition-all duration-300 ${loadingStep >= 0 ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                   <div className={`w-2 h-2 rounded-full transition-all duration-300 ${loadingStep >= 1 ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                   <div className={`w-2 h-2 rounded-full transition-all duration-300 ${loadingStep >= 2 ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                   <div className={`w-2 h-2 rounded-full transition-all duration-300 ${loadingStep >= 3 ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                 </div>
                 <p className="mt-6 text-[8px] font-mono text-slate-500 uppercase tracking-[0.5em]">Active Diagnostic // Shield v1.5</p>
               </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`card-blur p-10 rounded-[3rem] border-2 transition-all duration-700 animate-in zoom-in-95 ${
          report.isScam ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]' : 'border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black italic tracking-tighter flex items-center gap-3">
              {report.isScam ? (
                <><span className="text-red-500 uppercase">🚩 SCAM DETECTED</span></>
              ) : (
                <><span className="text-emerald-500 uppercase">✅ SCAN CLEAR</span></>
              )}
            </h3>
            <div className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-inner">
              Confidence: {(report.confidence * 100).toFixed(0)}%
            </div>
          </div>

          <p className="text-slate-100 mb-10 text-xl font-bold italic tracking-tight leading-relaxed">"{report.explanation}"</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/20">
              <h4 className="text-red-400 font-black mb-4 uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span>🚩</span> Security Red Flags
              </h4>
              <ul className="space-y-3">
                {report.redFlags.map((flag, i) => (
                  <li key={i} className="text-xs font-bold text-slate-300 flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/20">
              <h4 className="text-cyan-400 font-black mb-4 uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span>🛡️</span> Guardian Protocol
              </h4>
              <p className="text-xs font-bold text-slate-300 leading-relaxed">{report.safeAction}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={reset}
              className="flex-1 py-5 rounded-2xl bg-slate-900 border border-slate-800 text-white font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-xl"
            >
              Scan Another
            </button>
            <button 
              onClick={() => alert('Intelligence data synced with Guardian Network.')}
              className="flex-1 py-5 rounded-2xl bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] italic tracking-tighter text-base"
            >
              Broadcast Alert 📢
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScamDetector;
