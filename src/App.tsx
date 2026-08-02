import { useState } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { OCRScanner } from './components/OCRScanner';
import { MedicineIntelligence } from './components/MedicineIntelligence';
import { DrugInteractionMatrix } from './components/DrugInteractionMatrix';
import { DosageSchedule } from './components/DosageSchedule';
import { VoiceAssistant } from './components/VoiceAssistant';
import { PillScanner } from './components/PillScanner';
import { FamilyDashboard } from './components/FamilyDashboard';
import { EmergencyWallet } from './components/EmergencyWallet';
import { MedicalTimeline } from './components/MedicalTimeline';
import { PharmacyFinder } from './components/PharmacyFinder';

import type { Prescription, Language, ScheduleItem } from './types';
import { SAMPLE_PRESCRIPTIONS } from './data/samplePrescriptions';
import { UI_TRANSLATIONS } from './data/translations';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentPrescription, setCurrentPrescription] = useState<Prescription>(SAMPLE_PRESCRIPTIONS[0]);
  const [activeTab, setActiveTab] = useState<string>('ocr');
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);

  // Initial Schedule items generated from prescription
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    {
      id: 'sch-1',
      time: '8:00 AM',
      timePeriod: 'Morning',
      medicineId: 'med-metformin-500',
      medicineName: 'Metformin 500 mg',
      dosage: '500 mg',
      instructions: 'After Breakfast',
      duration: 'Take for 30 days',
      status: 'taken',
      date: 'Today'
    },
    {
      id: 'sch-2',
      time: '8:00 AM',
      timePeriod: 'Morning',
      medicineId: 'med-telmisartan-40',
      medicineName: 'Telmisartan 40 mg',
      dosage: '40 mg',
      instructions: 'After Breakfast',
      duration: 'Take for 30 days',
      status: 'taken',
      date: 'Today'
    },
    {
      id: 'sch-3',
      time: '1:30 PM',
      timePeriod: 'Afternoon',
      medicineId: 'med-aspirin-75',
      medicineName: 'Ecosprin 75 mg',
      dosage: '75 mg',
      instructions: 'After Lunch with Water',
      duration: 'Take for 30 days',
      status: 'pending',
      date: 'Today'
    },
    {
      id: 'sch-4',
      time: '9:00 PM',
      timePeriod: 'Night',
      medicineId: 'med-atorvastatin-10',
      medicineName: 'Atorvastatin 10 mg',
      dosage: '10 mg',
      instructions: 'At Bedtime',
      duration: 'Take for 30 days',
      status: 'pending',
      date: 'Today'
    }
  ]);

  const handleUpdateScheduleStatus = (id: string, newStatus: 'taken' | 'pending' | 'missed') => {
    setSchedule(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleSelectPrescription = (newRx: Prescription) => {
    setCurrentPrescription(newRx);
    // Regenerate schedule items for the selected prescription
    const newScheduleItems: ScheduleItem[] = newRx.medicines.map((med, idx) => ({
      id: `sch-${med.id}-${idx}`,
      time: idx === 0 ? '8:00 AM' : idx === 1 ? '1:30 PM' : '9:00 PM',
      timePeriod: idx === 0 ? 'Morning' : idx === 1 ? 'Afternoon' : 'Night',
      medicineId: med.id,
      medicineName: med.name,
      dosage: med.dosage,
      instructions: med.timing,
      duration: med.duration,
      status: 'pending',
      date: 'Today'
    }));
    setSchedule(newScheduleItems);
  };

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col">
      
      {/* Navigation Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenEmergencyWallet={() => setShowEmergencyModal(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Clinical Medical Disclaimer Banner */}
      <DisclaimerBanner currentLang={currentLang} />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Core AI Pipeline Status Overview Header */}
        <div className="bg-slate-900/40 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-xs text-slate-300">
            <span className="font-bold text-cyan-400">Current Prescription:</span>
            <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-semibold text-white">
              {currentPrescription.title}
            </span>
          </div>

          {/* Core AI Agents Navigation Sub-bar */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ocr', label: t.ocrScanner },
              { id: 'intel', label: t.medicineIntel },
              { id: 'interactions', label: t.drugInteractions },
              { id: 'schedule', label: t.dosageSchedule },
              { id: 'voice', label: t.voiceAssistant },
            ].map(agent => (
              <button
                key={agent.id}
                onClick={() => setActiveTab(agent.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === agent.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {agent.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Active Tab View */}
        {activeTab === 'ocr' && (
          <div className="space-y-8">
            <OCRScanner
              currentPrescription={currentPrescription}
              onSelectPrescription={handleSelectPrescription}
              currentLang={currentLang}
            />
            {/* Inline Medicine Intelligence preview under OCR */}
            <MedicineIntelligence medicines={currentPrescription.medicines} currentLang={currentLang} />
          </div>
        )}

        {activeTab === 'intel' && (
          <MedicineIntelligence medicines={currentPrescription.medicines} currentLang={currentLang} />
        )}

        {activeTab === 'interactions' && (
          <DrugInteractionMatrix interactions={currentPrescription.interactions} currentLang={currentLang} />
        )}

        {activeTab === 'schedule' && (
          <DosageSchedule
            schedule={schedule}
            onUpdateStatus={handleUpdateScheduleStatus}
            currentLang={currentLang}
          />
        )}

        {activeTab === 'voice' && (
          <VoiceAssistant currentPrescription={currentPrescription} currentLang={currentLang} />
        )}

        {activeTab === 'pill' && (
          <PillScanner currentLang={currentLang} />
        )}

        {activeTab === 'family' && (
          <FamilyDashboard currentLang={currentLang} />
        )}

        {activeTab === 'wallet' && (
          <EmergencyWallet currentLang={currentLang} />
        )}

        {activeTab === 'timeline' && (
          <MedicalTimeline currentLang={currentLang} />
        )}

        {activeTab === 'pharmacy' && (
          <PharmacyFinder currentLang={currentLang} />
        )}

      </main>

      {/* Emergency Wallet Modal Overlay */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <EmergencyWallet currentLang={currentLang} onClose={() => setShowEmergencyModal(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500 space-y-2">
        <p>
          <strong className="text-slate-300 font-semibold">MedTwin AI</strong> — Making every prescription understandable, safer, and accessible in every Indian language.
        </p>
        <p className="text-[11px] text-slate-600">
          Powered by Multimodal AI, OCR Processing, Speech Synthesis & Clinical Safety Protocols.
        </p>
      </footer>

    </div>
  );
}

export default App;
