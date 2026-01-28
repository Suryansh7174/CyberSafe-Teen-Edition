
import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, setProfile, onLogout }) => {
  const avatars = ['🛡️', '👻', '🤖', '⚡', '🐉', '🎮', '🛸', '💎', '🔥', '👑'];
  const colors = [
    { name: 'cyan', class: 'bg-cyan-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'rose', class: 'bg-rose-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 flex items-center gap-6">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-2xl transition-all ${
          profile.themeColor === 'purple' ? 'bg-purple-500' : 
          profile.themeColor === 'emerald' ? 'bg-emerald-500' : 
          profile.themeColor === 'rose' ? 'bg-rose-500' : 'bg-cyan-500'
        }`}>
          {profile.avatar}
        </div>
        <div>
          <h2 className="text-3xl font-bold">{profile.username}</h2>
          <p className="text-slate-400">Cyber Guardian Level 1</p>
          <button className="text-xs font-bold text-cyan-400 mt-2 uppercase tracking-widest">Edit Rank Badge</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customization */}
        <div className="card-blur p-8 rounded-[2rem] space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎭</span> Avatar Customization
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {avatars.map(av => (
                <button 
                  key={av}
                  onClick={() => setProfile({ ...profile, avatar: av })}
                  className={`w-12 h-12 flex items-center justify-center text-2xl rounded-xl border-2 transition-all ${
                    profile.avatar === av ? 'bg-slate-800 border-cyan-500' : 'bg-slate-900 border-transparent hover:border-slate-700'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>🎨</span> Neon Theme
            </h3>
            <div className="flex gap-4">
              {colors.map(color => (
                <button 
                  key={color.name}
                  onClick={() => setProfile({ ...profile, themeColor: color.name })}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${color.class} ${
                    profile.themeColor === color.name ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="card-blur p-8 rounded-[2rem] space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span>⚙️</span> App Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl">
                <div>
                  <p className="font-bold text-sm">Stealth Mode</p>
                  <p className="text-xs text-slate-500">Hide online status in challenges</p>
                </div>
                <div className="w-12 h-6 bg-slate-700 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-slate-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl">
                <div>
                  <p className="font-bold text-sm">Haptic Feedback</p>
                  <p className="text-xs text-slate-500">Vibrate on scam detection</p>
                </div>
                <div className="w-12 h-6 bg-cyan-500/50 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl">
                <div>
                  <p className="font-bold text-sm">Critical Alerts</p>
                  <p className="text-xs text-slate-500">Always notify for high risk threats</p>
                </div>
                <div className="w-12 h-6 bg-cyan-500/50 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full py-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            Terminate Session (Logout)
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 card-blur rounded-[2rem] flex items-center justify-between border-slate-800">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">ℹ️</div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">App Version</p>
            <p className="text-sm font-mono">v1.2.4-stable-shield</p>
          </div>
        </div>
        <button className="text-xs font-bold text-slate-500 hover:text-slate-300">Terms of Service</button>
      </div>
    </div>
  );
};

export default Profile;
