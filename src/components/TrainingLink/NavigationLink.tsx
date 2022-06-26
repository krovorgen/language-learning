import React, { FC, memo } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import BookCheckMIcon from '@alfalab/icons-glyph/BookCheckMIcon';
import NavigationHomeMIcon from '@alfalab/icons-glyph/NavigationHomeMIcon';
import { StatsChartMIcon } from '@alfalab/icons-glyph/StatsChartMIcon';
import { AppRoutes } from '@/helpers/routes';

import styles from './TrainingLink.module.scss';

export enum IconNavigationLinkType {
  home = 'home',
  learning = 'learning',
  statistics = 'statistics',
}

const navigationLinkIcon = {
  home: <NavigationHomeMIcon />,
  learning: <BookCheckMIcon />,
  statistics: <StatsChartMIcon />,
};

type Props = {
  href: AppRoutes;
  icon: IconNavigationLinkType;
};

export const NavigationLink: FC<Props> = memo(({ href, icon }) => {
  return (
    <Link href={href} passHref>
      <a className={cn('link-navigation', styles.root)}>{navigationLinkIcon[icon]}</a>
    </Link>
  );
});

NavigationLink.displayName = 'NavigationLink';
