import React, { FC, memo } from 'react';
import cn from 'classnames';

import { AddedWordModal } from '@/components/AddedWordModal';

import styles from './AdminTools.module.scss';

type Props = {
  handleModalOpen: () => void;
  open: boolean;
};

export const AddedWordLink: FC<Props> = memo(({ handleModalOpen, open }) => {
  return (
    <>
      <button className={cn('link-navigation', styles.root)} onClick={handleModalOpen}>
        A
      </button>
      <AddedWordModal open={open} handleModalOpen={handleModalOpen} />
    </>
  );
});

AddedWordLink.displayName = 'AddedWordLink';
