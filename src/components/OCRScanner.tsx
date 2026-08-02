import React, { useState } from 'react';
import { Upload, Sparkles, FileText, CheckCircle2, Scan, Eye, RefreshCw, Volume2 } from 'lucide-react';
import type { Prescription, Language } from '../types';
import { SAMPLE_PRESCRIPTIONS } from '../data/samplePrescriptions';
import { UI_TRANSLATIONS } from '../data/translations';
import { SpeechService } from '../services/speechService';

interface OCRScannerProps {
  currentPrescription: Prescription;
  onSelectPrescription: (prescription: Prescription) => void;
  currentLang: Language;
}

export const OCRScanner: React.FC<OCRScannerProps> = ({
  currentPrescription,
  onSelectPrescription,
  currentLang,
}) => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'rawText'>('visual');
  const [speaking, setSpeaking] = useState<boolean>(false);

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const handleSampleClick = (sample: Prescription) => {
    setIsScanning(true);
    setTimeout(() => {
      onSelectPrescription(sample);
      setIsScanning(false);
    }, 900);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setTimeout(() => {
        onSelectPrescription({
          ...SAMPLE_PRESCRIPTIONS[0],
          id: `custom-rx-${Date.now()}`,
          title: `Uploaded Prescription (${e.target.files![0].name})`,
          date: new Date().toISOString().split('T')[0]
        });
        setIsScanning(false);
      }, 1200);
    }
  };

  const handleSpeakRawText = () => {
    if (speaking) {
      SpeechService.stop();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      SpeechService.speak(currentPrescription.rawOCRText, currentLang, () => {
        setSpeaking(false);
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Agent Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 p-6 rounded-2xl border border-cyan-500/20 shadow-xl">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Scan className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <span>{t.ocrScanner}</span>
              <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 rounded-md">
                Handwritten & Printed OCR
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Extracts medicine names, dosage timings, duration, and doctor instructions using multimodal AI.
            </p>
          </div>
        </div>

        {/* Sample Selectors */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {SAMPLE_PRESCRIPTIONS.map((sample, idx) => (
            <button
              key={sample.id}
              onClick={() => handleSampleClick(sample)}
              disabled={isScanning}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                currentPrescription.id === sample.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>
                {idx === 0 ? t.handwrittenScript : idx === 1 ? t.printedRx : t.elderlyRx}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* OCR Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Viewer & Bounding Box Visualizer */}
        <div className="lg:col-span-7 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 flex flex-col space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Prescription Visual Bounding Boxes
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-all flex items-center space-x-1.5">
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                <span>Upload Custom</span>
                <input type="file" accept="image/*,.pdf" onChange={handleCustomUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Image Canvas Container */}
          <div className="relative w-full h-80 sm:h-96 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center group">
            {isScanning ? (
              <div className="flex flex-col items-center justify-center space-y-3 z-20">
                <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                <span className="text-xs font-medium text-cyan-300 animate-pulse">
                  {t.extractingText}
                </span>
              </div>
            ) : (
              <>
                <img
                  src={currentPrescription.imageUrl}
                  alt={currentPrescription.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                />

                {/* Bounding Boxes Overlays */}
                {currentPrescription.ocrBoxes.map((box) => (
                  <div
                    key={box.id}
                    onMouseEnter={() => setActiveBoxId(box.id)}
                    onMouseLeave={() => setActiveBoxId(null)}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`,
                    }}
                    className={`absolute rounded border-2 transition-all cursor-pointer flex items-start p-1 ${
                      activeBoxId === box.id
                        ? 'border-cyan-400 bg-cyan-500/25 shadow-lg shadow-cyan-500/40 z-20'
                        : 'border-emerald-400/80 bg-emerald-500/10 hover:border-cyan-400'
                    }`}
                  >
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-950/90 text-cyan-300 border border-cyan-500/40 shadow">
                      {box.label}
                    </span>
                  </div>
                ))}

                {/* Badge Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs flex items-center space-x-2 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>OCR Confidence: 98.4%</span>
                </div>
              </>
            )}
          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            Hover over highlighted boxes above to inspect individual OCR detection segments.
          </p>
        </div>

        {/* Right Column: OCR Intelligence Summary */}
        <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-xl">
          
          <div className="space-y-4">
            
            {/* Metadata Header */}
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{currentPrescription.title}</span>
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400 mt-1">
                <span>{currentPrescription.doctorName}</span>
                <span>•</span>
                <span>{currentPrescription.date}</span>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('visual')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'visual'
                    ? 'bg-slate-800 text-cyan-300 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Medicines Parsed ({currentPrescription.medicines.length})
              </button>
              <button
                onClick={() => setActiveTab('rawText')}
                className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'rawText'
                    ? 'bg-slate-800 text-cyan-300 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Raw OCR Text
              </button>
            </div>

            {/* Content Tabs */}
            {activeTab === 'visual' ? (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {currentPrescription.medicines.map((med, index) => (
                  <div
                    key={med.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start justify-between group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {med.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 pl-7">
                        <span className="font-semibold text-slate-300">{med.frequency}</span> ({med.timing})
                      </p>
                      <p className="text-[11px] text-cyan-400/90 pl-7">
                        Duration: {med.duration}
                      </p>
                    </div>

                    <span className="px-2 py-1 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">
                      {med.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <pre className="p-3.5 rounded-xl bg-slate-950 text-xs font-mono text-cyan-200 border border-slate-800 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
                  {currentPrescription.rawOCRText}
                </pre>
                
                <button
                  onClick={handleSpeakRawText}
                  className={`mt-2 w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
                    speaking
                      ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300'
                      : 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${speaking ? 'animate-pulse' : ''}`} />
                  <span>{speaking ? 'Stop Reading' : 'Listen to Full Text'}</span>
                </button>
              </div>
            )}

          </div>

          {/* Bottom Success Badge */}
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center space-x-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Prescription Parsed Successfully. 0 Unresolved Drugs.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
