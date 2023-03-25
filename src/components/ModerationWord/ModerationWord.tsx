import React, { FC } from 'react';
import styles from './ModerationWord.module.scss';

type Props = {
  id: number;
  word: string;
  translation: string;
};

export const ModerationWord: FC<Props> = ({ id, word, translation }) => {
  return <li></li>;
};
