import React from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle2, Stethoscope, ArrowRightLeft } from 'lucide-react';
import type { DrugInteraction, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface DrugInteractionProps {
  interactions: DrugInteraction[];
  currentLang: Language;
}

export const DrugInteractionMatrix: React.FC<DrugInteractionProps> = ({
  interactions,
  currentLang,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  return (
    <div className="space-y-6">
      
      {/* Agent Banner */}
      <div className="flex items-center space-x-4 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/60 p-6 rounded-2xl border border-rose-500/20 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>{t.drugInteractions}</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-rose-500/20 border border-rose-400/40 text-rose-300 rounded-md">
              Clinical Risk Agent
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-checks all prescribed medicines and flags potential contraindications or toxicity risks.
          </p>
        </div>
      </div>

      {/* Interactions Grid */}
      {interactions.length === 0 ? (
        <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-300">
              {t.safeCombo}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              No severe contraindications or high-risk drug-drug interaction warnings detected among the currently parsed medications.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {interactions.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all ${
                item.severity === 'high'
                  ? 'bg-rose-950/30 border-rose-500/50 shadow-xl shadow-rose-950/40'
                  : item.severity === 'moderate'
                  ? 'bg-amber-950/30 border-amber-500/50 shadow-xl shadow-amber-950/40'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/80 pb-4 mb-4 space-y-2 sm:space-y-0">
                
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl border ${
                    item.severity === 'high'
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  }`}>
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <span>{item.title}</span>
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                      <span className="font-semibold text-cyan-300">{item.drug1}</span>
                      <ArrowRightLeft className="w-3 h-3 text-slate-500" />
                      <span className="font-semibold text-cyan-300">{item.drug2}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  item.severity === 'high'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-amber-500 text-slate-950'
                }`}>
                  {item.severity === 'high' ? t.highRisk : t.moderateRisk}
                </span>
              </div>

              {/* Interaction Mechanism Description */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-semibold text-slate-300 block mb-1">Clinical Risk Mechanism:</span>
                  <p className="text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start space-x-3 text-cyan-200">
                  <Stethoscope className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-300 block mb-0.5">{t.consultDoctor}:</span>
                    <p className="leading-relaxed">
                      {item.recommendation}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
