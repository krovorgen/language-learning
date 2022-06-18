import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './LevelStudy.module.scss';

type Props = {
  point: number;
};

export const LevelStudy: FC<Props> = memo(({ point }) => {
  const classView = {
    [styles.low]: point < 10,
    [styles.medium]: point >= 10 && point < 20,
    [styles.high]: point >= 20 && point < 30,
    [styles.perfect]: point >= 30,
  };
  return <span className={cn(styles.root, classView)} />;
});

LevelStudy.displayName = 'LevelStudy';
