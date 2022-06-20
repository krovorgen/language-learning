import React from 'react';
import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';
import { NavigationMenu } from '@/components/NavigationMenu';

function Learning() {
  return (
    <div>
      Learning
      <NavigationMenu>
        <NavigationLink href={AppRoutes.home} icon={IconNavigationLinkType.home} />
      </NavigationMenu>
    </div>
  );
}

export default Learning;
