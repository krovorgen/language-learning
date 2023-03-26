import React, { ChangeEvent, FC, memo, SyntheticEvent, useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { FieldProps, Select } from '@alfalab/core-components/select';
import { catchHandler } from '@/helpers/catchHandler';
import { Field } from '@alfalab/core-components/select/';
import { FlagsIcon } from '@/helpers/FlagsIcon';
import { DictionaryLangType } from '@/repositories/types';

import styles from './AddedWordBlock.module.scss';

export type OptionsStatus = {
  key: string;
  content: string;
  icon: JSX.Element;
};

type Props = {
  confirmCallback?: () => void;
};

export const AddedWordBlock: FC<Props> = memo(({ confirmCallback }) => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [wordValue, setWordValue] = useState('');
  const [translationValue, setTranslationValue] = useState('');

  const onChangeWordValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWordValue(e.currentTarget.value);
  }, []);
  const onChangeTranslationValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTranslationValue(e.currentTarget.value);
  }, []);

  const optionsStatus: OptionsStatus[] = [
    {
      key: DictionaryLangType.tr,
      content: 'Турецкий',
      icon: FlagsIcon[DictionaryLangType.tr],
    },
    {
      key: DictionaryLangType.eng,
      content: 'Английский',
      icon: FlagsIcon[DictionaryLangType.eng],
    },
  ];

  const CustomField = useCallback(
    (props: FieldProps) => (
      <Field {...props} leftAddons={props.selected && (props.selected as OptionsStatus).icon} />
    ),
    [],
  );

  const [selectedStatus, setSelectedStatus] = useState([optionsStatus[0]]);
  const handleChangeStatus = useCallback(({ selectedMultiple }: any) => {
    setSelectedStatus(selectedMultiple);
  }, []);

  const sendForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingBtn(true);

      try {
        await axios.post(`/api/dictionary`, {
          lang: selectedStatus[0].key,
          word: wordValue.toLowerCase(),
          translation: translationValue.toLowerCase(),
        });

        confirmCallback && confirmCallback();
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        toast('Создано');
        setLoadingBtn(false);
        setWordValue('');
        setTranslationValue('');
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }
    },
    [confirmCallback, selectedStatus, translationValue, wordValue],
  );

  return (
    <form onSubmit={sendForm} className={styles.form}>
      <Input
        value={wordValue}
        onChange={onChangeWordValue}
        label="Новое слово"
        name="word"
        block
        required
        autoComplete="off"
        ref={firstInputRef}
      />

      <Input
        value={translationValue}
        onChange={onChangeTranslationValue}
        label="Перевод"
        name="translation"
        block
        required
        autoComplete="off"
      />

      <Select
        label="Язык"
        options={optionsStatus}
        name="lang"
        Field={CustomField}
        onChange={handleChangeStatus}
        selected={selectedStatus}
        block
      />

      <Button block view="primary" size="s" type="submit" loading={loadingBtn}>
        Сохранить
      </Button>
    </form>
  );
});

AddedWordBlock.displayName = 'AddedWordBlock';
