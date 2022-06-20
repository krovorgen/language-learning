import React, { Children, FC, memo } from 'react';

import styles from './NavigationMenu.module.scss';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const NavigationMenu: FC<Props> = memo(({ children }) => {
  return (
    <ul className={styles.root}>
      {Children.map(children, (child, index) => (
        <li className={styles.item} key={index}>
          {child}
        </li>
      ))}
    </ul>
  );
});

NavigationMenu.displayName = 'NavigationMenu';
