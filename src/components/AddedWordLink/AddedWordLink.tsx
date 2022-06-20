import React, { FC, memo } from 'react';
import cn from 'classnames';

import { ModalResponsive } from '@alfalab/core-components/modal/Component.responsive';

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
      <ModalResponsive open={open} onClose={handleModalOpen} fixedPosition={true}>
        <ModalResponsive.Header />
        <ModalResponsive.Content>
          <p>hello world</p>
        </ModalResponsive.Content>
        <ModalResponsive.Footer></ModalResponsive.Footer>
      </ModalResponsive>
    </>
  );
});

AddedWordLink.displayName = 'AddedWordLink';
