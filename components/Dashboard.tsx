
import React from 'react';
import { AppView } from '../types';

interface DashboardProps {
  setActiveView: (view: AppView) => void;
  xp: number;
  userLevel: number;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, xp, userLevel }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* System Status Banner */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-cyan-500/5 opacity-100 transition-opacity"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Environment Status // Neural Proxy Active</p>
        </div>
        <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest hidden sm:flex items-center gap-4">
          <span>Latency: 12ms</span>
          <span className="w-px h-3 bg-slate-800"></span>
          <span>Security Level: Alpha</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-blur p-8 rounded-[2rem] border-slate-800 hover:border-cyan-500/30 transition-all group cursor-default">
          <h3 className="text-slate-500 font-black mb-1 uppercase text-[10px] tracking-[0.2em]">Safety Index</h3>
          <div className="flex items-baseline gap-2 group-hover:scale-105 transition-transform origin-left">
            <span className="text-6xl font-black italic tracking-tighter">92</span>
            <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Secure</span>
          </div>
          <p className="text-slate-600 text-[9px] mt-4 font-bold uppercase tracking-widest">Global Ranking: Top 5%</p>
        </div>
        
        <div className="card-blur p-8 rounded-[2rem] border-slate-800 hover:border-red-500/30 transition-all group cursor-default">
          <h3 className="text-slate-500 font-black mb-1 uppercase text-[10px] tracking-[0.2em]">Personal Risk Assessment</h3>
          <div className="flex items-baseline gap-2 group-hover:scale-105 transition-transform origin-left">
            <span className="text-6xl font-black italic tracking-tighter text-slate-100">Low</span>
          </div>
          <p className="text-slate-600 text-[9px] mt-4 font-bold uppercase tracking-widest">Based on 14 recent scans</p>
        </div>

        <div className="card-blur p-8 rounded-[2rem] bg-gradient-to-br from-cyan-950/20 to-slate-900 border-cyan-500/30 hover:border-cyan-400 transition-all">
          <h3 className="text-cyan-500 font-black mb-1 uppercase text-[10px] tracking-[0.2em]">Live Training</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black italic tracking-tighter text-white">HackBlitz</span>
          </div>
          <button 
            onClick={() => setActiveView(AppView.GAME)}
            className="mt-4 w-full py-3 bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
          >
            Launch Combat Sim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tactical Briefing Section */}
        <div className="lg:col-span-2 card-blur p-10 rounded-[2.5rem] border-slate-800 shadow-2xl relative overflow-hidden">
          <h3 className="text-xl font-black uppercase tracking-widest italic mb-8">Tactical Briefing</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 group cursor-pointer hover:border-cyan-500/20 transition-all">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">🕵️</div>
              <div className="flex-1">
                <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Identity Theft Protection</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Your data footprint shows signs of a recent third party leak. Shield recommends refreshing your security tokens immediately.</p>
                <button className="mt-4 text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors">Apply Defense Strategy :</button>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 group cursor-pointer hover:border-cyan-500/20 transition-all">
              <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">🛰️</div>
              <div className="flex-1">
                <p className="text-sm font-black text-white uppercase tracking-widest mb-1">Network Hygiene Report</p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">All active home network connections are verified: No rogue proxies or unauthorized entry points detected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Threat Feed */}
        <div className="card-blur p-10 rounded-[2.5rem] border-slate-800 shadow-2xl relative">
          <h3 className="text-xl font-black uppercase tracking-widest italic mb-8">Shield Intelligence</h3>
          <div className="space-y-4">
            {[
              { label: 'Critical', title: 'IG Token Stealer Variant', color: 'text-red-500' },
              { label: 'Update', title: 'iOS Security Patch 18.2', color: 'text-emerald-500' },
              { label: 'Alert', title: 'New Phishing Wave: Discord', color: 'text-amber-500' },
              { label: 'Info', title: 'Deepfake Voice Patterns', color: 'text-cyan-500' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/40 transition-all cursor-pointer group/item">
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${item.color} mb-1`}>{item.label}</span>
                <p className="text-xs font-bold text-slate-100 group-hover:translate-x-1 transition-transform">{item.title}</p>
                <span className="text-[8px] text-slate-600 mt-2 font-mono">STATUS: ACTIVE THREAT {idx + 104}</span>
              </div>
            ))}
            <button className="w-full mt-4 py-4 rounded-xl border border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-slate-800 transition-all active:scale-95">
              Access Threat Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
