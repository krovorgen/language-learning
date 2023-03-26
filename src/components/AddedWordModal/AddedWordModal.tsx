import React, { FC, memo } from 'react';

import { ModalResponsive } from '@alfalab/core-components/modal/Component.responsive';
import { AddedWordBlock } from '@/components/AddedWordBlock';

export type OptionsStatus = {
  key: string;
  content: string;
  icon: JSX.Element;
};

type Props = {
  handleModalOpen: () => void;
  open: boolean;
};

export const AddedWordModal: FC<Props> = memo(({ handleModalOpen, open }) => {
  return (
    <ModalResponsive open={open} onClose={handleModalOpen} fixedPosition={true}>
      <ModalResponsive.Header />
      <ModalResponsive.Content>
        <AddedWordBlock confirmCallback={handleModalOpen} />
      </ModalResponsive.Content>
    </ModalResponsive>
  );
});

AddedWordModal.displayName = 'AddedWordModal';
