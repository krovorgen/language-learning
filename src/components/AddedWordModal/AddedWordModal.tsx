import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react';
import axios from 'axios';

import { ModalResponsive } from '@alfalab/core-components/modal/Component.responsive';

import { Input } from '@alfalab/core-components/input';
import { Button } from '@alfalab/core-components/button';
import { toast } from 'react-toastify';
import { catchHandler } from '@/helpers/catchHandler';

import styles from './AddedWordModal.module.scss';

type Props = {
  handleModalOpen: () => void;
  open: boolean;
};

export const AddedWordModal: FC<Props> = memo(({ handleModalOpen, open }) => {
  const [loadingBtn, setLoadingBtn] = useState(false);

  const sendForm = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingBtn(true);

      let {
        word: { value: word },
        translation: { value: translation },
      } = e.currentTarget.elements as typeof e.currentTarget.elements & {
        word: { value: string };
        translation: { value: string };
      };

      try {
        await axios.post(`/api/dictionary`, { lang: 'eng', word, translation });

        handleModalOpen();
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        toast('Создано');
        setLoadingBtn(false);
      }
    },
    [handleModalOpen],
  );
  return (
    <ModalResponsive open={open} onClose={handleModalOpen} fixedPosition={true}>
      <ModalResponsive.Header />
      <ModalResponsive.Content>
        <form onSubmit={sendForm} className={styles.form}>
          <Input placeholder="Новое слово" name="word" block required />
          <Input placeholder="Перевод" name="translation" block required />
          <Button block view="primary" size="s" type="submit" loading={loadingBtn}>
            Сохранить
          </Button>
        </form>
      </ModalResponsive.Content>
    </ModalResponsive>
  );
});

AddedWordModal.displayName = 'AddedWordModal';
