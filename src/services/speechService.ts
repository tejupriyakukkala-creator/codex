import type { Language } from '../types';

const LANGUAGE_SPEECH_CODES: Record<Language, string> = {
  en: 'en-IN',
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
};

export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  public static speak(text: string, lang: Language, onEnd?: () => void): boolean {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser environment.');
      if (onEnd) onEnd();
      return false;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_SPEECH_CODES[lang] || 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = this.synth.getVoices();
    const targetLangPrefix = LANGUAGE_SPEECH_CODES[lang].split('-')[0];
    const matchingVoice = voices.find(v => v.lang.startsWith(targetLangPrefix) || v.lang.includes(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    this.synth.speak(utterance);
    return true;
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}
