import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Star, Search } from 'lucide-react';
import type { Pharmacy, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface PharmacyFinderProps {
  currentLang: Language;
}

export const PharmacyFinder: React.FC<PharmacyFinderProps> = ({ currentLang }) => {
  const [searchCity, setSearchCity] = useState<string>('Hyderabad');

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const pharmacies: Pharmacy[] = [
    {
      id: 'pharm-1',
      name: 'Apollo Pharmacy (Jubilee Hills 24x7)',
      address: 'Road No. 36, Jubilee Hills, Hyderabad',
      city: 'Hyderabad',
      distance: '1.2 km away',
      phone: '+91 40 2360 7777',
      is24x7: true,
      rating: 4.8,
      stockStatus: 'In Stock',
      availableMedicines: ['Metformin 500mg', 'Telmisartan 40mg', 'Atorvastatin 10mg', 'Ecosprin 75mg']
    },
    {
      id: 'pharm-2',
      name: 'MedPlus Pharmacy (Madhapur Branch)',
      address: 'Near HDFC Bank, Main Road, Madhapur, Hyderabad',
      city: 'Hyderabad',
      distance: '2.5 km away',
      phone: '+91 40 6712 3456',
      is24x7: true,
      rating: 4.6,
      stockStatus: 'In Stock',
      availableMedicines: ['Metformin 500mg', 'Telmisartan 40mg', 'Pan 40', 'Dolo 650']
    },
    {
      id: 'pharm-3',
      name: 'Wellness Forever Chemists (Banjara Hills)',
      address: 'Road No. 12, Banjara Hills, Hyderabad',
      city: 'Hyderabad',
      distance: '3.8 km away',
      phone: '+91 40 2335 9999',
      is24x7: false,
      rating: 4.7,
      stockStatus: 'Limited Stock',
      availableMedicines: ['Metformin 500mg', 'Atorvastatin 10mg']
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 p-6 rounded-2xl border border-emerald-500/20 shadow-xl space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <MapPin className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{t.pharmacyFinder}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 rounded-md">
                Verified Indian Stock Locator
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Locate nearby 24x7 pharmacies in India that stock your exact prescribed medications.
            </p>
          </div>
        </div>

        {/* City Filter */}
        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
          >
            <option value="Hyderabad" className="bg-slate-900">Hyderabad</option>
            <option value="Bengaluru" className="bg-slate-900">Bengaluru</option>
            <option value="Delhi NCR" className="bg-slate-900">Delhi NCR</option>
            <option value="Mumbai" className="bg-slate-900">Mumbai</option>
          </select>
        </div>
      </div>

      {/* Pharmacies List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pharmacies.map((pharm) => (
          <div
            key={pharm.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {pharm.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{pharm.address}</p>
                </div>
                <span className="px-2 py-1 rounded bg-slate-950 text-amber-400 border border-slate-800 text-xs font-bold flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{pharm.rating}</span>
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span className="font-semibold text-emerald-400">{pharm.distance}</span>
                <span>•</span>
                {pharm.is24x7 ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold text-[10px]">
                    24x7 Open
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px]">Open till 10 PM</span>
                )}
              </div>

              {/* Prescribed Stock Availability Badge */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Prescription Availability:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">
                    ✓ {pharm.stockStatus}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {pharm.availableMedicines.map((med, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] border border-slate-800">
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-2 border-t border-slate-800 text-xs">
              <a
                href={`tel:${pharm.phone}`}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-center space-x-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Call Store</span>
              </a>
              <button
                onClick={() => alert(`Navigating to ${pharm.name} on Google Maps`)}
                className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
