import React from 'react';

import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';
import { NavigationMenu } from '@/components/NavigationMenu';

import styles from './AddWord.module.scss';
import { AddedWordBlock } from '@/components/AddedWordBlock';

function Learning() {
  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <AddedWordBlock />
      </div>
      <NavigationMenu>
        <NavigationLink href={AppRoutes.statistics} icon={IconNavigationLinkType.statistics} />
        <NavigationLink href={AppRoutes.home} icon={IconNavigationLinkType.home} />
      </NavigationMenu>
    </div>
  );
}

export default Learning;
