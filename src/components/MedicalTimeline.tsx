import React from 'react';
import { GitCommit, Calendar, Activity, FileText, CheckCircle2 } from 'lucide-react';
import type { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface MedicalTimelineProps {
  currentLang: Language;
}

export const MedicalTimeline: React.FC<MedicalTimelineProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const timelineSteps = [
    {
      date: '15 Jan 2026',
      title: 'Routine Blood Test & Diagnostic Lab',
      description: 'Fasting Blood Glucose: 168 mg/dL, HbA1c: 7.8%, BP: 145/92 mmHg.',
      status: 'completed',
      icon: Activity,
      tag: 'Diagnostics'
    },
    {
      date: '28 Jan 2026',
      title: 'Doctor Visit - Dr. R. K. Sharma (Cardiology)',
      description: 'Diagnosed with Mild Hypertension and Type 2 Diabetes Mellitus.',
      status: 'completed',
      icon: Calendar,
      tag: 'Clinical Visit'
    },
    {
      date: '28 Jan 2026',
      title: 'Prescription Uploaded to MedTwin AI',
      description: 'AI OCR extracted 4 medications: Metformin 500mg, Telmisartan 40mg, Atorvastatin 10mg, Ecosprin 75mg.',
      status: 'completed',
      icon: FileText,
      tag: 'AI Parsing'
    },
    {
      date: '29 Jan 2026',
      title: '30-Day Medication Course Commenced',
      description: 'Automated morning, afternoon, and night dosage reminders active.',
      status: 'active',
      icon: CheckCircle2,
      tag: 'Active Regimen'
    },
    {
      date: '28 Feb 2026',
      title: 'Upcoming Course Completion & Follow-up',
      description: 'Scheduled re-check for Serum Lipid Profile & Blood Sugar.',
      status: 'upcoming',
      icon: GitCommit,
      tag: 'Future Scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-center space-x-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 p-6 rounded-2xl border border-blue-500/20 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <GitCommit className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>{t.medicalTimeline}</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/20 border border-blue-400/40 text-blue-300 rounded-md">
              Patient Care Journey
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tracks blood test results, doctor consultations, prescription uploads, and medication milestones.
          </p>
        </div>
      </div>

      {/* Timeline Steps Card */}
      <div className="p-8 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl space-y-8 relative">
        <div className="absolute left-12 top-14 bottom-14 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-slate-700 hidden sm:block" />

        {timelineSteps.map((step, idx) => {
          const IconComp = step.icon;

          return (
            <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 group">
              
              {/* Step Icon Badge */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 z-10 transition-all ${
                step.status === 'completed'
                  ? 'bg-slate-950 border-cyan-500/60 text-cyan-400 shadow-lg shadow-cyan-500/20'
                  : step.status === 'active'
                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/30 animate-pulse'
                  : 'bg-slate-950 border-slate-800 text-slate-600'
              }`}>
                <IconComp className="w-6 h-6" />
              </div>

              {/* Step Detail Card */}
              <div className="flex-1 p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-400">{step.date}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    step.status === 'completed'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : step.status === 'active'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {step.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
