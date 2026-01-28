
import React, { useState, useRef, useEffect } from 'react';
import { getSecurityAdvice } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

const QUESTION_CATEGORIES = [
  {
    id: 'socials',
    label: 'Social Media',
    icon: '📱',
    questions: [
      "How do I lock my Instagram profile?",
      "Can strangers see my Snapchat location?",
      "What is a 'Finsta' and is it safer?",
      "How to spot a fake follower bot?",
      "Is TikTok tracking my clipboard data?"
    ]
  },
  {
    id: 'identity',
    label: 'Identity',
    icon: '👤',
    questions: [
      "What is doxxing and how to prevent it?",
      "How do I remove my info from Google?",
      "What should I do if my email is leaked?",
      "How to set up a burner email?",
      "Are public Wi-Fi networks sus?"
    ]
  },
  {
    id: 'scams',
    label: 'Scams & AI',
    icon: '🤖',
    questions: [
      "How to spot a deepfake video?",
      "What is a Discord nitro scam?",
      "Is this crypto giveaway legit?",
      "How to tell if an AI wrote this DM?",
      "Should I trust DM help from 'support'?"
    ]
  },
  {
    id: 'tech',
    label: 'Tech Defense',
    icon: '🛡️',
    questions: [
      "What is 2FA and why do I need it?",
      "Are password managers actually safe?",
      "How to secure my home router?",
      "What is a VPN and do I need one?",
      "How to block trackers on my phone?"
    ]
  }
];

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', text: "Yo! I'm Shield, your tactical AI cyber coach. 🤖\n\nI'm connected to the global threat stream. Whether you're worried about a sus DM, looking to lock down your socials, or just want to learn some elite defense moves: I've got your back. What's the mission today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState(QUESTION_CATEGORIES[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getSecurityAdvice(textToSend);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: response };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: "Signal lost: My neural link is acting up. Try asking again in a sec." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const currentCategory = QUESTION_CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-16rem)] flex flex-col animate-in fade-in duration-700">
      <div className="card-blur flex-1 rounded-[2.5rem] overflow-hidden flex flex-col border-slate-800 shadow-2xl relative">
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transform hover:rotate-12 transition-transform">🤖</div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-black italic text-lg tracking-tighter text-white uppercase">Shield AI</h3>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Neural Proxy v3.1 // Active</p>
            </div>
          </div>
          <div className="hidden sm:block text-[9px] bg-slate-800/80 text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-500/20 font-black uppercase tracking-widest shadow-inner">
            Latency: 14ms
          </div>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] p-5 rounded-3xl whitespace-pre-wrap leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-cyan-600 text-slate-950 rounded-tr-none shadow-2xl font-bold italic tracking-tight' 
                  : 'bg-slate-900/80 text-slate-200 rounded-tl-none border border-slate-800 shadow-xl font-medium'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-slate-900/50 p-5 rounded-3xl rounded-tl-none border border-slate-800 flex gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-slate-900/40 border-t border-slate-800 backdrop-blur-xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query Shield's data banks..."
              className="flex-1 bg-slate-950/60 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-800 focus:border-cyan-500/50 outline-none transition-all shadow-inner font-medium"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-14 h-14 flex items-center justify-center bg-cyan-500 text-slate-950 rounded-2xl hover:bg-cyan-400 active:scale-95 transition-all disabled:opacity-30 shadow-lg group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{isTyping ? '⏳' : '⚡'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categorized Intel Tags */}
      <div className="mt-8 space-y-4">
        <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {QUESTION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                activeCategory === cat.id ? 'bg-white text-slate-950 shadow-xl scale-105' : 'bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800'
              }`}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center px-4">
          {currentCategory?.questions.map((q, idx) => (
            <button 
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[10px] font-bold text-slate-400 bg-slate-900/40 border border-slate-800 px-4 py-2.5 rounded-2xl hover:border-cyan-500/40 hover:text-white hover:bg-slate-800 transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AICoach;
