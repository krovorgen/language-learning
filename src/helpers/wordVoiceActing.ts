import { DictionaryLangType } from '@/repositories/types';

enum LangISO {
  eng = 'en-US',
  tr = 'tr-TR',
}

export const wordVoiceActing = (word: string, lang: DictionaryLangType) => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = word;
  msg.rate = 0.8;
  msg.lang = LangISO[lang];
  window.speechSynthesis.speak(msg);
};
