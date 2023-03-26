import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react';
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

      const {
        word: { value: word },
        translation: { value: translation },
        lang: { value: lang },
      } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        word: { value: string };
        translation: { value: string };
        lang: { value: string };
      };

      try {
        await axios.post(`/api/dictionary`, {
          lang,
          word: word.toLowerCase(),
          translation: translation.toLowerCase(),
        });

        confirmCallback && confirmCallback();
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        toast('Создано');
        setLoadingBtn(false);
      }
    },
    [confirmCallback],
  );

  return (
    <form onSubmit={sendForm} className={styles.form}>
      <Input placeholder="Новое слово" name="word" block required />

      <Input placeholder="Перевод" name="translation" block required />

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