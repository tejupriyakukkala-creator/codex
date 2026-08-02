import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface DisclaimerProps {
  currentLang: Language;
}

export const DisclaimerBanner: React.FC<DisclaimerProps> = ({ currentLang }) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  return (
    <div className="bg-gradient-to-r from-amber-950/70 via-amber-900/40 to-amber-950/70 border-y border-amber-500/30 px-4 py-2.5 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center space-x-3 text-amber-200/90 text-xs">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1 font-medium leading-relaxed">
          <span className="font-semibold text-amber-300 mr-1.5">[Clinical Safety Notice]:</span>
          {t.disclaimer}
        </div>
      </div>
    </div>
  );
};
