import React, { ChangeEvent, FC, SyntheticEvent, useCallback, useState } from 'react';
import styles from './ModerationWord.module.scss';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { OkLWhiteIcon } from '@alfalab/icons-classic/OkLWhiteIcon';
import axios from 'axios';
import { catchHandler } from '@/helpers/catchHandler';
import { ArrowBackXxlWhiteIcon } from '@alfalab/icons-classic/ArrowBackXxlWhiteIcon';
import { UpdateDictionaryDtoType } from '@/repositories/types';

type Props = {
  id: number;
  word: string;
  translation: string;
};

export const ModerationWord: FC<Props> = ({ id, word, translation }) => {
  const [isSendForm, setIsSendForm] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [wordValue, setWordValue] = useState(word);
  const [translationValue, setTranslationValue] = useState(translation);

  const onChangeWordValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWordValue(e.currentTarget.value);
  }, []);

  const onChangeTranslationValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslationValue(e.currentTarget.value);
  }, []);

  const sendForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingBtn(true);

      try {
        await axios.patch(`/api/dictionary/${id}`, {
          isModerated: true,
          word: wordValue,
          translation: translationValue,
        } as UpdateDictionaryDtoType);
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        setLoadingBtn(false);
        setIsSendForm(true);
      }
    },
    [id, translationValue, wordValue],
  );
  return (
    <form onSubmit={sendForm} className={styles.inner}>
      <Input label="Слово" value={wordValue} onChange={onChangeWordValue} size="m" />
      <Input
        label="Перевод"
        value={translationValue}
        onChange={onChangeTranslationValue}
        size="m"
      />
      <Button
        leftAddons={
          isSendForm ? (
            <OkLWhiteIcon />
          ) : (
            <ArrowBackXxlWhiteIcon style={{ transform: 'rotate(180deg)' }} />
          )
        }
        type="submit"
        loading={loadingBtn}
        disabled={loadingBtn}
        view="primary"></Button>
    </form>
  );
};
