import React from 'react';
import { NextPage } from 'next';

import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';
import { NavigationMenu } from '@/components/NavigationMenu';
import { dictionaryRepository } from '@/repositories/dictionary.repository';
import { StatisticsType } from '@/repositories/types';

import styles from './Statistics.module.scss';
import { ValidInvalidValues } from '@/components/ValidInvalidValues';

type Props = {
  statistics: StatisticsType;
};

const Statistics: NextPage<Props> = ({ statistics }) => {
  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>Кол-во слов: </td>
            <td>{statistics.countWords}</td>
          </tr>
          <tr>
            <td>Общее кол-во очков:</td>
            <td>{statistics.totalPoint}</td>
          </tr>
          <tr>
            <td>Общее кол-во верных/неверных попыток:</td>
            <td>
              <ValidInvalidValues
                correct={statistics.totalWorkoutsCount.correct}
                incorrect={statistics.totalWorkoutsCount.incorrect}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <NavigationMenu>
        <NavigationLink href={AppRoutes.home} icon={IconNavigationLinkType.home} />
      </NavigationMenu>
    </div>
  );
};

export async function getServerSideProps() {
  const statistics = JSON.parse(JSON.stringify(await dictionaryRepository.getStatistics()));

  return {
    props: {
      statistics,
    },
  };
}

export default Statistics;
