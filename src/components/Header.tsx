import React from 'react';
import { Activity, Globe, QrCode } from 'lucide-react';
import type { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEmergencyWallet: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenEmergencyWallet,
  activeTab,
  onTabChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('ocr')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 animate-pulse" />
                <Activity className="w-6 h-6 text-cyan-400 relative z-10" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  MedTwin<span className="text-cyan-400">.AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 rounded-full uppercase">
                  Clinical Safety
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                AI Prescription Intelligence & Multi-Language Assistant
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/60">
            <button
              onClick={() => onTabChange('ocr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'ocr'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Rx Scanner & OCR
            </button>
            <button
              onClick={() => onTabChange('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Dosage Schedule
            </button>
            <button
              onClick={() => onTabChange('voice')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'voice'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Voice Assistant
            </button>
            <button
              onClick={() => onTabChange('family')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'family'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Family Dashboard
            </button>
            <button
              onClick={() => onTabChange('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'timeline'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => onTabChange('pharmacy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'pharmacy'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Pharmacies
            </button>
          </nav>

          {/* Right Action Tools: Language Selector & Emergency Wallet Button */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-900 border border-slate-700/80 rounded-xl px-2.5 py-1.5 shadow-sm">
              <Globe className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Wallet Button */}
            <button
              onClick={onOpenEmergencyWallet}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-red-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 transition-all text-xs font-semibold shadow-sm"
              title="Emergency Health Wallet & QR Code"
            >
              <QrCode className="w-4 h-4 text-rose-400 animate-pulse" />
              <span className="hidden sm:inline">Emergency QR</span>
            </button>

          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden flex items-center overflow-x-auto space-x-2 py-2 border-t border-slate-800/60 no-scrollbar">
          {[
            { id: 'ocr', label: 'Rx OCR' },
            { id: 'schedule', label: 'Schedule' },
            { id: 'voice', label: 'Voice AI' },
            { id: 'pill', label: 'Pill Scanner' },
            { id: 'family', label: 'Family' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'pharmacy', label: 'Pharmacies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
};
