import React from 'react';
import { QrCode, ShieldAlert, Phone, Droplet, Copy, Check } from 'lucide-react';
import type { EmergencyWalletData, Language } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

interface EmergencyWalletProps {
  currentLang: Language;
  onClose?: () => void;
}

export const EmergencyWallet: React.FC<EmergencyWalletProps> = ({ currentLang, onClose }) => {
  const [copied, setCopied] = React.useState<boolean>(false);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const walletData: EmergencyWalletData = {
    patientName: 'Sri Satyanarayana Rao',
    age: 58,
    gender: 'Male',
    bloodGroup: 'O Positive (O+)',
    allergies: ['Penicillin', 'Sulfonamides'],
    chronicConditions: ['Type 2 Diabetes Mellitus', 'Essential Hypertension', 'Hyperlipidemia'],
    emergencyContactName: 'Ramesh Rao (Son)',
    emergencyContactRelation: 'Son',
    emergencyContactPhone: '+91 98480 12345',
    activeMedications: [
      'Metformin 500mg BD',
      'Telmisartan 40mg OD',
      'Atorvastatin 10mg HS',
      'Ecosprin 75mg OD'
    ],
    qrCodeUrl: ''
  };

  const handleCopyQRLink = () => {
    navigator.clipboard.writeText("https://medtwin.ai/emergency-wallet/patient-98480");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/70 p-6 rounded-2xl border border-rose-500/30 shadow-xl space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <QrCode className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{t.emergencyWallet}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-rose-500/20 border border-rose-400/40 text-rose-300 rounded-md">
                24/7 Paramedic Access
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Stores critical blood group, drug allergies, emergency contacts, and active prescription records.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyQRLink}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center space-x-1.5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Link Copied' : 'Share QR Link'}</span>
          </button>
          {onClose && (
            <button onClick={onClose} className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold">
              Close
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: QR Code Display Card */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-rose-500/40 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl shadow-rose-950/30">
          
          <div className="p-4 rounded-2xl bg-white shadow-xl border-4 border-slate-800 flex flex-col items-center">
            {/* Embedded SVG QR Code Representation */}
            <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white"/>
              <rect x="5" y="5" width="30" height="30" fill="black"/>
              <rect x="10" y="10" width="20" height="20" fill="white"/>
              <rect x="15" y="15" width="10" height="10" fill="black"/>

              <rect x="65" y="5" width="30" height="30" fill="black"/>
              <rect x="70" y="10" width="20" height="20" fill="white"/>
              <rect x="75" y="15" width="10" height="10" fill="black"/>

              <rect x="5" y="65" width="30" height="30" fill="black"/>
              <rect x="10" y="70" width="20" height="20" fill="white"/>
              <rect x="15" y="75" width="10" height="10" fill="black"/>

              <rect x="40" y="10" width="15" height="5" fill="black"/>
              <rect x="45" y="20" width="10" height="10" fill="black"/>
              <rect x="10" y="40" width="10" height="15" fill="black"/>
              <rect x="25" y="45" width="15" height="10" fill="black"/>
              <rect x="45" y="45" width="10" height="10" fill="#f43f5e"/>
              <rect x="60" y="40" width="20" height="15" fill="black"/>
              <rect x="75" y="60" width="15" height="15" fill="black"/>
              <rect x="40" y="75" width="25" height="10" fill="black"/>
            </svg>
            <span className="text-[10px] font-bold text-slate-800 tracking-widest mt-2 uppercase">
              SCAN FOR PARAMEDIC PROFILE
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">{walletData.patientName}</h3>
            <p className="text-xs text-rose-400 font-semibold">{walletData.bloodGroup} • Age {walletData.age}</p>
          </div>

          <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
            Emergency responders can scan this QR code with any mobile camera to view critical drug allergies and active medications without unlocking device.
          </p>
        </div>

        {/* Right Column: Detailed Health Card Info */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4 shadow-xl">
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Blood Group */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1">
              <span className="text-slate-400 flex items-center space-x-1.5 text-[11px]">
                <Droplet className="w-3.5 h-3.5 text-rose-400" />
                <span>Blood Group:</span>
              </span>
              <span className="text-base font-bold text-rose-300 block">{walletData.bloodGroup}</span>
            </div>

            {/* Emergency Contact */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 flex items-center space-x-1.5 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Emergency Contact:</span>
              </span>
              <span className="font-bold text-white block">{walletData.emergencyContactName}</span>
              <span className="text-cyan-300 font-mono block">{walletData.emergencyContactPhone}</span>
            </div>
          </div>

          {/* Severe Allergies */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2 text-xs">
            <span className="font-bold text-amber-300 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Known Severe Drug Allergies:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {walletData.allergies.map((allergy, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-amber-950 text-amber-200 border border-amber-500/40 font-bold">
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          </div>

          {/* Active Medications List */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-cyan-300 block">Currently Prescribed Active Medications:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {walletData.activeMedications.map((med, i) => (
                <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{med}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
