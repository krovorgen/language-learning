import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';
import { NavigationMenu } from '@/components/NavigationMenu';
import { catchHandler } from '@/helpers/catchHandler';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { LevelStudy } from '@/components/LevelStudy';
import { wordVoiceActing } from '@/helpers/wordVoiceActing';
import { GlobalLoader } from '@/components/GlobalLoader';
import { FlagsIcon } from '@/helpers/FlagsIcon';
import { DictionaryType, UpdateDictionaryDtoType } from '@/repositories/types';
import { ValidInvalidValues } from '@/components/ValidInvalidValues';

import styles from './Learning.module.scss';

function Learning() {
  const [trainingWord, setTrainingWord] = useState<DictionaryType | null>(null);
  const [isCorrect, setIsCorrect] = useState<null | boolean>(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changeInputValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

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
      if (!trainingWord) return;
      setIsLoading(true);

      const isAnswerCorrect = inputValue.toLowerCase() === trainingWord.translation.toLowerCase();

      setIsCorrect(isAnswerCorrect);

      try {
        await axios.patch(`/api/dictionary/${trainingWord.id}`, {
          point: isAnswerCorrect ? trainingWord.point + 1 : trainingWord.point - 1,
          lastRepetition: new Date(),
          workoutsCount: {
            correct: isAnswerCorrect
              ? trainingWord.workoutsCount.correct + 1
              : trainingWord.workoutsCount.correct,
            incorrect: !isAnswerCorrect
              ? trainingWord.workoutsCount.incorrect + 1
              : trainingWord.workoutsCount.incorrect,
          },
        } as UpdateDictionaryDtoType);
        setInputValue('');
        isAnswerCorrect ? toast.success('Правильно') : toast.error('Не правильно');

        await getTrainingWord();
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        setIsLoading(false);
      }
    },
    [getTrainingWord, inputValue, trainingWord],
  );

  useEffect(() => {
    (async () => {
      await getTrainingWord();
    })();
  }, [getTrainingWord]);

  useEffect(() => {
    trainingWord && wordVoiceActing(trainingWord.word, trainingWord.lang);
  }, [trainingWord]);

  return (
    <div className={styles.root}>
      {trainingWord ? (
        <form onSubmit={sendForm} className={styles.form}>
          <Input
            value={inputValue}
            onChange={changeInputValue}
            block
            size="s"
            placeholder="Translation"
            required
            error={isCorrect !== null && !isCorrect}
          />
          <p>
            Очки: {trainingWord.point} <LevelStudy point={trainingWord.point} />
          </p>
          <p>Слово: {trainingWord.word}</p>
          {process.env.NODE_ENV === 'development' && <p>Перевод: {trainingWord.translation}</p>}
          <p>Язык: {FlagsIcon[trainingWord.lang]}</p>
          <p>
            Кол-во попыток:{' '}
            <ValidInvalidValues
              correct={trainingWord.workoutsCount.correct}
              incorrect={trainingWord.workoutsCount.incorrect}
            />
          </p>
          <Button view="primary" type="submit" size="s" block loading={isLoading}>
            Проверить
          </Button>
        </form>
      ) : (
        <GlobalLoader />
      )}
      <NavigationMenu>
        <NavigationLink href={AppRoutes.statistics} icon={IconNavigationLinkType.statistics} />
        <NavigationLink href={AppRoutes.home} icon={IconNavigationLinkType.home} />
      </NavigationMenu>
    </div>
  );
}

export default Learning;
