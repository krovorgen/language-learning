import React from 'react';
import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';

function Learning() {
  return (
    <div>
      Learning
      <NavigationLink href={AppRoutes.home} icon={IconNavigationLinkType.home} />
    </div>
  );
}

export default Learning;
