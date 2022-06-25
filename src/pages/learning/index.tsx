import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';
import { NavigationMenu } from '@/components/NavigationMenu';
import { catchHandler } from '@/helpers/catchHandler';
import { DictionaryType } from '@/repositories/dictionary.repository';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { LevelStudy } from '@/components/LevelStudy';

import styles from './Learning.module.scss';

function Learning() {
  const [trainingWord, setTrainingWord] = useState<DictionaryType | null>(null);
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);

  const getTrainingWord = useCallback(async () => {
    try {
      const res = await axios.get(`api/learning`);
      setTrainingWord(res.data);
    } catch ({ response }) {
      catchHandler(response);
    } finally {
    }
  }, []);

  const sendForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!trainingWord) {
        toast('Введите слово');
        return;
      }

      const {
        result: { value: result },
      } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        result: { value: string };
      };

      const answer = result.toLowerCase() === trainingWord.translation.toLowerCase();

      setIsCorrect(answer);

      try {
        await axios.patch(`/api/dictionary/${trainingWord.id}`, {
          point: answer ? trainingWord.point + 1 : trainingWord.point - 1,
        });
        await getTrainingWord();
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        toast('Создано');
      }
    },
    [getTrainingWord, trainingWord],
  );

  useEffect(() => {
    (async () => {
      await getTrainingWord();
    })();
  }, [getTrainingWord]);

  return (
    <div className={styles.root}>
      {trainingWord && (
        <form onSubmit={sendForm} className={styles.form}>
          <Input name="result" block size="s" error={isCorrect !== null && !isCorrect} />
          <p>
            Очки: {trainingWord.point} <LevelStudy point={trainingWord.point} />
          </p>
          <p>Слово: {trainingWord.word}</p>
          <p>Перевод: {trainingWord.translation}</p>
          <Button view="primary" type="submit" size="s" block>
            Проверить
          </Button>
        </form>
      )}
      <NavigationMenu>
        <NavigationLink href={AppRoutes.home} icon={IconNavigationLinkType.home} />
      </NavigationMenu>
    </div>
  );
}

export default Learning;
