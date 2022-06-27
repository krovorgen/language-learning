import React from 'react';
import { NextPage } from 'next';

import styles from './ValidInvalidValues.module.scss';
import cn from 'classnames';

type Props = {
  correct: number;
  incorrect: number;
  addClass?: string;
};

export const ValidInvalidValues: NextPage<Props> = ({ correct, incorrect, addClass }) => {
  return (
    <span className={cn(styles.root, addClass)}>
      <mark className={styles.correctAnswer}>{correct}</mark>/
      <mark className={styles.incorrectAnswer}>{incorrect}</mark>
    </span>
  );
};
