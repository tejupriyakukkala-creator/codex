import React, { useState } from 'react';
import { Mic, Volume2, Play, Send, Bot, User } from 'lucide-react';
import type { Language, ChatMessage, Prescription } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';
import { SpeechService } from '../services/speechService';

interface VoiceAssistantProps {
  currentPrescription: Prescription;
  currentLang: Language;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  currentPrescription,
  currentLang,
}) => {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['en'];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Hello! I am your MedTwin AI Voice Assistant. Ask me anything about ${currentPrescription.title} or your prescribed medicines in your preferred language.`,
      timestamp: 'Just now',
      language: currentLang
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const quickQuestions = [
    "Explain my prescription script in simple words.",
    "What is Metformin and what does it treat?",
    "Can I take Ecosprin on an empty stomach?",
    "What if I miss my evening dose?",
    "Are there any food items I should avoid with Atorvastatin?"
  ];

  const handleAskQuestion = (questionText: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: 'Just now',
      language: currentLang
    };

    let aiResponseText = "";
    if (questionText.toLowerCase().includes("metformin")) {
      aiResponseText = "Metformin 500mg lowers blood sugar levels in Type 2 Diabetes by reducing glucose production in the liver. Take it twice daily strictly after meals with water to avoid stomach upset.";
    } else if (questionText.toLowerCase().includes("empty stomach") || questionText.toLowerCase().includes("ecosprin")) {
      aiResponseText = "No! Do NOT take Ecosprin (Aspirin) on an empty stomach. Always take it immediately after lunch or a meal to protect your stomach lining from irritation.";
    } else if (questionText.toLowerCase().includes("miss")) {
      aiResponseText = "If you miss a dose, take it as soon as you remember. But if it is close to your next scheduled dose, skip the missed dose. Never take two doses together!";
    } else if (questionText.toLowerCase().includes("food") || questionText.toLowerCase().includes("atorvastatin")) {
      aiResponseText = "Avoid Grapefruit (Pampa Panasa) entirely when taking Atorvastatin as it blocks liver enzymes and increases drug toxicity. Take Atorvastatin at bedtime.";
    } else {
      aiResponseText = `Your prescription from ${currentPrescription.doctorName} includes ${currentPrescription.medicines.map(m => m.name).join(', ')}. All dosages are configured in your daily schedule tab.`;
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: aiResponseText,
      timestamp: 'Just now',
      language: currentLang,
      audioAvailable: true
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInputText('');

    // Trigger Speech synthesis
    setIsSpeaking(true);
    setActiveAudioId(aiMsg.id);
    SpeechService.speak(aiResponseText, currentLang, () => {
      setIsSpeaking(false);
      setActiveAudioId(null);
    });
  };

  const toggleSpeakMessage = (msg: ChatMessage) => {
    if (activeAudioId === msg.id && isSpeaking) {
      SpeechService.stop();
      setIsSpeaking(false);
      setActiveAudioId(null);
    } else {
      setIsSpeaking(true);
      setActiveAudioId(msg.id);
      SpeechService.speak(msg.text, currentLang, () => {
        setIsSpeaking(false);
        setActiveAudioId(null);
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex items-center space-x-4 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 p-6 rounded-2xl border border-cyan-500/20 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Mic className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>{t.voiceAssistant}</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 rounded-md">
              Speech Synthesis Engine
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ask questions out loud or listen to prescriptions translated into Indian regional languages.
          </p>
        </div>
      </div>

      {/* Voice Assistant Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Quick Prompts & Speech Waveform */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Animated Audio Waveform Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all ${
              isSpeaking
                ? 'border-cyan-400 bg-cyan-500/20 shadow-xl shadow-cyan-500/30 glow-cyan'
                : 'border-slate-700 bg-slate-950'
            }`}>
              <Mic className={`w-8 h-8 ${isSpeaking ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            </div>

            {/* Equalizer Waveform Bars */}
            <div className="flex items-center space-x-1.5 h-8">
              <span className={`w-1.5 rounded-full bg-cyan-400 ${isSpeaking ? 'waveform-bar-1' : 'h-1.5'}`} />
              <span className={`w-1.5 rounded-full bg-cyan-400 ${isSpeaking ? 'waveform-bar-2' : 'h-1.5'}`} />
              <span className={`w-1.5 rounded-full bg-cyan-400 ${isSpeaking ? 'waveform-bar-3' : 'h-1.5'}`} />
              <span className={`w-1.5 rounded-full bg-cyan-400 ${isSpeaking ? 'waveform-bar-4' : 'h-1.5'}`} />
              <span className={`w-1.5 rounded-full bg-cyan-400 ${isSpeaking ? 'waveform-bar-5' : 'h-1.5'}`} />
            </div>

            <p className="text-xs text-slate-400 font-medium">
              {isSpeaking ? 'MedTwin AI is Speaking...' : 'Voice Assistant Ready'}
            </p>
          </div>

          {/* Quick Voice Questions */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Suggested Voice Queries
            </span>
            <div className="space-y-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuestion(q)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-xs text-slate-300 hover:text-cyan-300 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <Play className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Chat Dialogue */}
        <div className="lg:col-span-8 bg-slate-900/80 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between h-[520px] shadow-xl">
          
          {/* Messages Container */}
          <div className="space-y-4 overflow-y-auto pr-2 flex-1 mb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`p-4 rounded-2xl max-w-xl text-xs space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                  
                  {msg.sender === 'assistant' && (
                    <div className="flex items-center justify-between pt-1 text-[11px] border-t border-slate-800/80">
                      <span className="text-slate-400">{msg.timestamp}</span>
                      <button
                        onClick={() => toggleSpeakMessage(msg)}
                        className={`flex items-center space-x-1 font-semibold ${
                          activeAudioId === msg.id && isSpeaking
                            ? 'text-rose-400 animate-pulse'
                            : 'text-cyan-400 hover:text-cyan-300'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{activeAudioId === msg.id && isSpeaking ? 'Playing...' : 'Listen Audio'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center space-x-2 pt-3 border-t border-slate-800">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inputText && handleAskQuestion(inputText)}
              placeholder="Ask a question about your medicines..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => inputText && handleAskQuestion(inputText)}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
