
export enum AppView {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  SCAM_DETECTOR = 'scam_detector',
  PASSWORD_VAULT = 'password_vault',
  AI_COACH = 'ai_coach',
  CHALLENGES = 'challenges',
  ACHIEVEMENTS = 'achievements',
  GAME = 'game',
  PROFILE = 'profile',
  DAILY_CHECKIN = 'daily_checkin'
}

export interface UserProfile {
  username: string;
  avatar: string;
  themeColor: string;
  lastCheckinDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface SecurityNews {
  id: string;
  title: string;
  summary: string;
  riskLevel: 'low' | 'medium' | 'high';
  date: string;
}

export interface ScamReport {
  isScam: boolean;
  confidence: number;
  explanation: string;
  redFlags: string[];
  safeAction: string;
}

export interface CheckinQuestion {
  id: string;
  text: string;
  impact: string;
}
