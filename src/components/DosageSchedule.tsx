import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertTriangle, Bell, Sparkles, Sun, SunMoon, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ScheduleItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface DosageScheduleProps {
  schedule: ScheduleItem[];
  onUpdateStatus: (id: string, newStatus: 'taken' | 'pending' | 'missed') => void;
  currentLang: Language;
}

export const DosageSchedule: React.FC<DosageScheduleProps> = ({
  schedule,
  onUpdateStatus,
  currentLang,
}) => {
  const [showMissedModal, setShowMissedModal] = useState<boolean>(false);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const handleTakeDose = (id: string) => {
    onUpdateStatus(id, 'taken');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const getTimeIcon = (period: string) => {
    switch (period) {
      case 'Morning':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Afternoon':
        return <SunMoon className="w-4 h-4 text-orange-400" />;
      case 'Evening':
      case 'Night':
        return <Moon className="w-4 h-4 text-indigo-400" />;
      default:
        return <Clock className="w-4 h-4 text-cyan-400" />;
    }
  };

  const takenCount = schedule.filter(s => s.status === 'taken').length;
  const progressPercent = Math.round((takenCount / schedule.length) * 100) || 0;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 p-6 rounded-2xl border border-emerald-500/20 shadow-xl space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Calendar className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{t.dosageSchedule}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-md">
                Smart Reminder Agent
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized dosage timeline with automated meal intake guidance.
            </p>
          </div>
        </div>

        {/* Missed Dose Simulator Button */}
        <button
          onClick={() => setShowMissedModal(!showMissedModal)}
          className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-xs font-semibold flex items-center space-x-2 transition-all shadow-sm"
        >
          <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>{t.simMissedDose}</span>
        </button>
      </div>

      {/* Progress Adherence Bar */}
      <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 shadow-lg">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-300">Daily Compliance Progress</span>
          <span className="font-semibold text-emerald-400">{progressPercent}% Completed ({takenCount}/{schedule.length} Doses)</span>
        </div>
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-400 transition-all duration-500"
          />
        </div>
      </div>

      {/* Missed Dose Smart Advisory Banner */}
      {showMissedModal && (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/60 shadow-xl text-xs space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Smart Reminder Protocol: Missed Dose Advisory</span>
            </div>
            <button onClick={() => setShowMissedModal(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <p className="text-slate-200 leading-relaxed">
            "You missed your afternoon medicine (<span className="font-semibold text-amber-300">Ecosprin 75mg</span>). 
            General clinical guidance: If it is close to your next scheduled dose, skip the missed dose and resume your regular schedule. <strong className="text-amber-300">NEVER double up doses to make up for a missed tablet.</strong> Contact your doctor if you're unsure."
          </p>
        </div>
      )}

      {/* Schedule Items List */}
      <div className="space-y-4">
        {schedule.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 ${
              item.status === 'taken'
                ? 'bg-slate-900/40 border-emerald-500/40 opacity-90'
                : item.status === 'missed'
                ? 'bg-amber-950/20 border-amber-500/40'
                : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
            }`}
          >
            {/* Left: Time & Medicine Info */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center min-w-[70px] text-center">
                <span className="text-xs font-bold text-cyan-300">{item.time}</span>
                <div className="flex items-center space-x-1 mt-1">
                  {getTimeIcon(item.timePeriod)}
                  <span className="text-[10px] text-slate-400">{item.timePeriod}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>{item.medicineName}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
                    {item.dosage}
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  <span className="font-semibold text-emerald-400">{item.instructions}</span> • Drink 250ml water • {item.duration}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div>
              {item.status === 'taken' ? (
                <span className="px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center space-x-1.5 shadow-inner">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.taken}</span>
                </span>
              ) : item.status === 'missed' ? (
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold">
                    {t.missed}
                  </span>
                  <button
                    onClick={() => handleTakeDose(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500 text-white text-xs font-semibold hover:bg-cyan-400 transition-all"
                  >
                    Take Now
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleTakeDose(item.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.markTaken}</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
