import React, { FC, memo, useCallback } from 'react';

import { DictionaryLangType } from '@/repositories/dictionary.repository';

import styles from './SoundWord.module.scss';
import { wordVoiceActing } from '@/helpers/wordVoiceActing';

type Props = {
  word: string;
  lang: DictionaryLangType;
};

export const SoundWord: FC<Props> = memo(({ word, lang }) => {
  const voiceHandler = useCallback(() => {
    wordVoiceActing(word, lang);
  }, [word, lang]);
  return <span className={styles.root} onClick={voiceHandler} />;
});

SoundWord.displayName = 'SoundWord';
