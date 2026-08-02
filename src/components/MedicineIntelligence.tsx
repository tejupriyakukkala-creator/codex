import React, { useState } from 'react';
import { Pill, Info, AlertTriangle, ShieldCheck, Utensils, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import type { Medicine, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { SpeechService } from '../services/speechService';

interface MedicineIntelligenceProps {
  medicines: Medicine[];
  currentLang: Language;
}

export const MedicineIntelligence: React.FC<MedicineIntelligenceProps> = ({
  medicines,
  currentLang,
}) => {
  const [expandedId, setExpandedId] = useState<string>(medicines[0]?.id || '');
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? '' : id);
  };

  const handleSpeakMedicine = (med: Medicine, e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeSpeechId === med.id) {
      SpeechService.stop();
      setActiveSpeechId(null);
    } else {
      setActiveSpeechId(med.id);
      const textToSpeak = `${med.name}. ${med.purpose}. Take ${med.timing}.`;
      SpeechService.speak(textToSpeak, currentLang, () => {
        setActiveSpeechId(null);
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-center space-x-4 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-500/20 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Pill className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>{t.medicineIntel}</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 rounded-md">
              Clinical Knowledge Engine
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Converts medical terms into simple, understandable explanations with food interaction alerts.
          </p>
        </div>
      </div>

      {/* Medicines Accordion List */}
      <div className="space-y-4">
        {medicines.map((med) => {
          const isExpanded = expandedId === med.id;
          const translatedName = med.translations?.[currentLang]?.name || med.name;
          const translatedPurpose = med.translations?.[currentLang]?.purpose || med.purpose;
          const translatedTiming = med.translations?.[currentLang]?.timing || med.timing;

          return (
            <div
              key={med.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-2xl shadow-cyan-950/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Accordion Bar */}
              <div
                onClick={() => toggleExpand(med.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <span>{translatedName}</span>
                      <span className="text-xs font-normal text-slate-400">({med.genericName})</span>
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold">
                        {med.dosage}
                      </span>
                      <span>•</span>
                      <span>{med.frequency}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">{translatedTiming}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => handleSpeakMedicine(med, e)}
                    className={`p-2 rounded-xl border transition-all ${
                      activeSpeechId === med.id
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-cyan-400'
                    }`}
                    title="Listen to Explanation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Accordion Details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Purpose Box */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-center space-x-2 text-cyan-300 font-semibold">
                      <Info className="w-4 h-4 text-cyan-400" />
                      <span>{t.purpose}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {translatedPurpose}
                    </p>
                    {med.mechanism && (
                      <p className="text-[11px] text-slate-400 italic pt-1">
                        Mechanism: {med.mechanism}
                      </p>
                    )}
                  </div>

                  {/* Food & Diet Interactions Box */}
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-300 font-semibold">
                      <Utensils className="w-4 h-4 text-amber-400" />
                      <span>{t.foodInteractions}</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {med.foodInteractions.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Side Effects */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-center space-x-2 text-rose-300 font-semibold">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>{t.sideEffects}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {med.commonSideEffects.map((effect, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-rose-950/40 border border-rose-800/50 text-rose-200 text-[11px]"
                        >
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* General Precautions */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-300 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>{t.precautions}</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {med.precautions.map((prec, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{prec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
