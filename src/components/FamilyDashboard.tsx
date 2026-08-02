import React from 'react';
import { Users, AlertCircle, CheckCircle2, PhoneCall, BellRing, Award } from 'lucide-react';
import type { Language, CaregiverAlert } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface FamilyDashboardProps {
  currentLang: Language;
}

export const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const familyAlerts: CaregiverAlert[] = [
    {
      id: 'alert-1',
      timestamp: 'Today, 8:15 AM',
      patientName: 'Sri Satyanarayana Rao (Father)',
      medicationName: 'Metformin 500mg & Telmisartan 40mg',
      timeDue: '8:00 AM',
      type: 'acknowledged',
      message: 'Father marked morning doses as Taken after breakfast.'
    },
    {
      id: 'alert-2',
      timestamp: 'Yesterday, 2:30 PM',
      patientName: 'Sri Satyanarayana Rao (Father)',
      medicationName: 'Ecosprin 75mg',
      timeDue: '1:30 PM',
      type: 'missed',
      message: 'Afternoon dose missed. Automated SMS reminder sent.'
    },
    {
      id: 'alert-3',
      timestamp: '28 July, 2026',
      patientName: 'Sri Satyanarayana Rao (Father)',
      medicationName: 'Paracetamol 650mg 5-Day Course',
      timeDue: 'Course Completed',
      type: 'completed',
      message: 'Fever medication 5-day course completed successfully.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/60 p-6 rounded-2xl border border-rose-500/20 shadow-xl space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Users className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{t.familyDashboard}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-rose-500/20 border border-rose-400/40 text-rose-300 rounded-md">
                Remote Caregiver Monitoring
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Monitor parents' and family members' medication compliance in real-time.
            </p>
          </div>
        </div>

        {/* Call Parent Button */}
        <button
          onClick={() => alert("Simulating direct call to Father's Phone (+91 98480 12345)")}
          className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-rose-500/25 transition-all"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call Father (+91 98480...)</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Parent Card 1 */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-sm">
                SR
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Sri Satyanarayana Rao</h3>
                <p className="text-xs text-slate-400">Father • Age 58</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              88% Adherence
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Today's Doses:</span>
              <span className="text-white font-semibold">2 of 3 Taken</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="w-[66%] h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Parent Card 2 */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-sm">
                SR
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Smt. Sunitha Reddy</h3>
                <p className="text-xs text-slate-400">Mother • Age 52</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
              100% Adherence
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Today's Doses:</span>
              <span className="text-white font-semibold">2 of 2 Taken</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="w-full h-full bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>

        {/* Caregiver Stats */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/80 border border-indigo-500/30 space-y-3 shadow-xl flex flex-col justify-between">
          <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Family Wellness Streak</span>
          </div>
          <div className="text-center py-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">14 Days</span>
            <p className="text-xs text-slate-400 mt-1">Zero critical drug interaction incidents</p>
          </div>
        </div>

      </div>

      {/* Notifications & Alert Log */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <BellRing className="w-4 h-4 text-cyan-400" />
          <span>Real-Time Family Activity Feed</span>
        </h3>

        <div className="space-y-3">
          {familyAlerts.map((alertItem) => (
            <div
              key={alertItem.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between text-xs"
            >
              <div className="flex items-start space-x-3">
                {alertItem.type === 'acknowledged' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : alertItem.type === 'missed' ? (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-white">{alertItem.patientName}</span>
                  <p className="text-slate-300 mt-0.5">{alertItem.message}</p>
                  <span className="text-[10px] text-slate-500 mt-1 block">{alertItem.timestamp}</span>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                alertItem.type === 'acknowledged'
                  ? 'bg-emerald-950 text-emerald-300'
                  : alertItem.type === 'missed'
                  ? 'bg-amber-950 text-amber-300'
                  : 'bg-cyan-950 text-cyan-300'
              }`}>
                {alertItem.timeDue}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
