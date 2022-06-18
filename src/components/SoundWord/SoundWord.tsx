import React, { FC, memo, useCallback } from 'react';

import styles from './SoundWord.module.scss';

type Props = {
  word: string;
  lang: 'tr' | 'eng';
};

enum LangISO {
  eng = 'en-US',
  tr = 'tr-TR',
}

export const SoundWord: FC<Props> = memo(({ word, lang }) => {
  const voiceHandler = useCallback(() => {
    if (typeof window !== 'undefined') {
      const msg = new SpeechSynthesisUtterance();
      msg.text = word;
      msg.lang = LangISO[lang];
      window.speechSynthesis.speak(msg);
    }
  }, [lang, word]);
  return <span className={styles.root} onClick={voiceHandler} />;
});

SoundWord.displayName = 'SoundWord';
