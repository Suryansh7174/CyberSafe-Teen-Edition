
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GameProps {
  onWin: (xp: number) => void;
}

interface ThreatRock {
  id: number;
  word: string;
  definition: string;
  x: number;
  y: number;
  speed: number;
  isHit?: boolean;
}

interface Projectile {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  progress: number;
}

const CYBER_TERMS = [
  { word: "PHISHING", def: "Fake emails used to steal info.", level: 1 },
  { word: "MALWARE", def: "Software designed to hack devices.", level: 1 },
  { word: "DDOS", def: "Crashing sites with too much traffic.", level: 1 },
  { word: "FIREWALL", def: "Digital barrier blocking access.", level: 1 },
  { word: "SPOOFING", def: "Faking identity to trick users.", level: 2 },
  { word: "ENCRYPTION", def: "Scrambling data for privacy.", level: 2 },
  { word: "BOTNET", def: "Network of hijacked computers.", level: 2 },
  { word: "RANSOMWARE", def: "Locking files for money.", level: 3 },
  { word: "SPYWARE", def: "Software that watches you secretly.", level: 3 },
  { word: "ZERO DAY", def: "A newly discovered unpatched bug.", level: 3 }
];

const HackBlitz: React.FC<GameProps> = ({ onWin }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'level-up' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [shield, setShield] = useState(100);
  const [level, setLevel] = useState(1);
  const [levelProgress, setLevelProgress] = useState(0);
  const [rocks, setRocks] = useState<ThreatRock[]>([]);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastDecrypted, setLastDecrypted] = useState<{ word: string, def: string } | null>(null);
  
  const targetProgress = 5 + (level * 2); // Objective per level
  const gameLoopRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const spawnRock = useCallback(() => {
    // Filter terms based on level (roughly)
    const availableTerms = CYBER_TERMS.filter(t => t.level <= level);
    const term = availableTerms[Math.floor(Math.random() * availableTerms.length)];
    
    // Deliberate, slower tactical speed (Level 1 starts very slow)
    const baseSpeed = 0.05 + (level * 0.015);
    
    const newRock: ThreatRock = {
      id: Date.now() + Math.random(),
      word: term.word,
      definition: term.def,
      x: Math.random() * 80 + 10,
      y: -10,
      speed: baseSpeed
    };
    setRocks(prev => [...prev, newRock]);
  }, [level]);

  useEffect(() => {
    if (gameState === 'playing') {
      const update = (time: number) => {
        setRocks(prev => {
          const updated = prev.map(rock => rock.isHit ? rock : { ...rock, y: rock.y + rock.speed });
          const hitBottom = updated.filter(rock => rock.y > 90 && !rock.isHit);
          
          if (hitBottom.length > 0) {
            setShield(s => {
              const newShield = Math.max(0, s - (hitBottom.length * 15));
              if (newShield <= 0) {
                setGameState('end');
                onWin(score);
              }
              return newShield;
            });
            return updated.filter(rock => rock.y <= 90 || rock.isHit);
          }
          return updated;
        });

        setProjectiles(prev => {
          return prev
            .map(p => ({ ...p, progress: p.progress + 0.12 }))
            .filter(p => p.progress < 1.1);
        });

        if (Date.now() > spawnTimerRef.current) {
          spawnRock();
          // Slower spawn rate for tactical feel
          spawnTimerRef.current = Date.now() + Math.max(2000, 4000 - (level * 300));
        }

        gameLoopRef.current = requestAnimationFrame(update);
      };

      gameLoopRef.current = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(gameLoopRef.current);
    }

    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameState, spawnRock, level, score, onWin]);

  // Level Progression Check
  useEffect(() => {
    if (levelProgress >= targetProgress && gameState === 'playing') {
      setGameState('level-up');
      setRocks([]); // Clear screen for transition
    }
  }, [levelProgress, targetProgress, gameState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setInputValue(value);

    const targetRock = rocks.find(r => r.word === value && !r.isHit);
    if (targetRock) {
      const newProjectile: Projectile = {
        id: Date.now(),
        startX: 50,
        startY: 95,
        targetX: targetRock.x,
        targetY: targetRock.y,
        progress: 0
      };
      
      setProjectiles(prev => [...prev, newProjectile]);
      setInputValue('');
      
      setTimeout(() => {
        setRocks(prev => prev.map(r => r.id === targetRock.id ? { ...r, isHit: true } : r));
        setScore(s => s + (level * 50));
        setLevelProgress(p => p + 1);
        setLastDecrypted({ word: targetRock.word, def: targetRock.definition });
        
        setTimeout(() => {
          setRocks(prev => prev.filter(r => r.id !== targetRock.id));
        }, 300);
      }, 120);
    }
  };

  const startNextLevel = () => {
    setLevel(l => l + 1);
    setLevelProgress(0);
    setShield(s => Math.min(100, s + 20)); // Shield repair bonus
    setGameState('playing');
    spawnTimerRef.current = Date.now() + 1000;
  };

  if (gameState === 'start') {
    return (
      <div className="max-w-xl mx-auto h-[75vh] flex flex-col items-center justify-center text-center">
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse rounded-full"></div>
          <div className="w-48 h-48 rounded-[3.5rem] bg-slate-900 flex flex-col items-center justify-center border border-slate-800 shadow-2xl relative overflow-hidden">
            <span className="text-7xl mb-2">🚀</span>
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-cyan-500 animate-bounce"></div>
              <div className="w-1 h-3 bg-cyan-400 animate-bounce delay-75"></div>
              <div className="w-1 h-3 bg-cyan-500 animate-bounce delay-150"></div>
            </div>
          </div>
        </div>
        <h2 className="text-6xl font-black italic tracking-tighter mb-4 uppercase">HackBlitz</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-12">Tactical Sector Defense v3.0</p>
        
        <div className="card-blur p-8 rounded-3xl border border-slate-800 mb-12 text-left">
          <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
            Welcome, Guardian. This is a tactical simulation. Neutralize target meteorites by typing their security tags. Complete sector objectives to advance your clearance.
          </p>
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span>Mission: Sector Clear</span>
            <span>Speed: Deliberate</span>
          </div>
        </div>

        <button 
          onClick={() => {
            setGameState('playing');
            setScore(0);
            setShield(100);
            setLevel(1);
            setLevelProgress(0);
            spawnTimerRef.current = Date.now() + 1000;
          }}
          className="px-16 py-6 bg-cyan-500 text-slate-950 font-black rounded-2xl shadow-2xl hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all text-2xl italic tracking-tighter"
        >
          Begin Sector 1
        </button>
      </div>
    );
  }

  if (gameState === 'level-up') {
    return (
      <div className="max-w-xl mx-auto h-[75vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-5xl mb-6 shadow-inner border border-emerald-500/30">
          ✅
        </div>
        <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-emerald-400">Sector {level} Cleared</h2>
        <div className="card-blur p-10 rounded-[3rem] border border-slate-800 w-full mb-10 shadow-2xl relative overflow-hidden">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Mission Summary</p>
          <div className="grid grid-cols-2 gap-6">
             <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
                <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Total XP</p>
                <p className="text-3xl font-black text-white">{score}</p>
             </div>
             <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800">
                <p className="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-1">Hull Integrity</p>
                <p className="text-3xl font-black text-emerald-400">{shield}%</p>
             </div>
          </div>
          <p className="mt-8 text-xs text-slate-400 font-medium italic">"Excellent work. Proceeding to Sector {level + 1} with updated threat data."</p>
        </div>
        <button 
          onClick={startNextLevel}
          className="px-16 py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl shadow-2xl hover:bg-emerald-400 transition-all text-xl italic tracking-tighter"
        >
          Enter Sector {level + 1} →
        </button>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="max-w-xl mx-auto h-[75vh] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
        <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4 text-red-500">Defense Breached</h2>
        <div className="card-blur p-12 rounded-[3.5rem] border border-slate-800 w-full mb-10 shadow-2xl relative overflow-hidden">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Final Sector Reached: {level}</p>
          <p className="text-8xl font-black text-white mb-8">{score}</p>
          <button 
            onClick={() => setGameState('start')}
            className="w-full py-5 bg-slate-900 border border-slate-800 text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-[0.2em] text-[10px]"
          >
            Restart Simulation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[80vh] relative overflow-hidden card-blur rounded-[3.5rem] border border-slate-800 shadow-inner group">
      {/* Background Starfield */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="stars-scroll" style={{ animationDuration: `${120 - (level * 10)}s` }}></div>
      </div>

      {/* Sector HUD Header */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-start z-30 pointer-events-none">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Sector Deployment</p>
          <h3 className="text-3xl font-black italic tracking-tighter text-white">00{level}</h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Mission Objective</p>
          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-800">
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(levelProgress / targetProgress) * 100}%` }}></div>
            </div>
            <span className="text-[10px] font-black text-white">{levelProgress}/{targetProgress}</span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="absolute inset-0 pb-40 p-10 overflow-hidden">
        {projectiles.map(p => (
          <div 
            key={p.id}
            className="absolute w-1.5 h-6 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] z-20"
            style={{ 
              left: `${p.startX + (p.targetX - p.startX) * p.progress}%`, 
              top: `${p.startY + (p.targetY - p.startY) * p.progress}%`, 
              transform: `translateX(-50%) rotate(${Math.atan2(p.targetX - p.startX, p.startY - p.targetY) * (180 / Math.PI)}deg)` 
            }}
          ></div>
        ))}

        {rocks.map(rock => (
          <div
            key={rock.id}
            className={`absolute flex flex-col items-center transition-transform duration-300 ${rock.isHit ? 'scale-0 opacity-0' : ''}`}
            style={{ left: `${rock.x}%`, top: `${rock.y}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl relative">
               <span className="relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">☄️</span>
               <div className="absolute inset-0 bg-red-500/10 blur-xl rounded-full"></div>
            </div>
            <div className="mt-2 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-xl border border-slate-700 shadow-2xl">
              <span className="text-[11px] font-black text-white tracking-[0.2em]">{rock.word}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Intel HUD */}
      {lastDecrypted && (
        <div className="absolute top-28 left-8 right-8 z-50 animate-in slide-in-from-top-10 duration-500">
          <div className="p-5 bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/30 rounded-[2rem] shadow-2xl flex items-center gap-6">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 text-2xl">
              🧠
            </div>
            <div className="flex-1">
              <p className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em] mb-0.5">Decrypted Paylod: {lastDecrypted.word}</p>
              <p className="text-white text-xs font-bold">{lastDecrypted.def}</p>
            </div>
          </div>
        </div>
      )}

      {/* Spaceship */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-24 h-24 flex items-center justify-center">
        <div className="relative group/ship">
          <span className="text-6xl drop-shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-transform group-hover/ship:scale-105">🚀</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
             <div className="w-0.5 h-6 bg-cyan-500/50 animate-pulse"></div>
             <div className="w-0.5 h-6 bg-cyan-500/50 animate-pulse delay-75"></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col items-center">
        <div className="flex justify-between w-full mb-8 max-w-xl">
          <div className="text-left">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Core Hull Integrity</p>
            <div className="w-56 h-3 bg-slate-900 rounded-full border border-slate-800 overflow-hidden shadow-inner p-0.5">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${shield}%` }}></div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Sector XP</p>
            <p className="text-3xl font-black italic tracking-tighter text-white">{score}</p>
          </div>
        </div>

        <div className="w-full max-w-xl relative">
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder="TYPE TO NEUTRALIZE..."
            className="w-full bg-slate-900/60 backdrop-blur-xl border-2 border-slate-800 rounded-[2.5rem] px-10 py-7 text-center text-2xl font-black tracking-[0.5em] text-cyan-400 placeholder-slate-800 focus:border-cyan-500/50 outline-none shadow-2xl transition-all"
          />
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-500 uppercase tracking-[0.6em] whitespace-nowrap">
            Tactical Input Active // Sector Clear Required
          </p>
        </div>
      </div>

      <style>{`
        .stars-scroll {
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          height: 300%;
          width: 100%;
          position: absolute;
          top: 0;
          animation: starsAnim 120s linear infinite;
        }
        @keyframes starsAnim {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
};

export default HackBlitz;
