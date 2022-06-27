import { useCallback, useEffect, useMemo, useState } from 'react';
import { NextPage } from 'next';
import { Table } from '@alfalab/core-components/table';
import { LevelStudy } from '@/components/LevelStudy';
import { dictionaryRepository } from '@/repositories/dictionary.repository';
import axios from 'axios';
import { catchHandler } from '@/helpers/catchHandler';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { SoundWord } from '@/components/SoundWord';
import { IconNavigationLinkType, NavigationLink } from '@/components/TrainingLink';
import { AppRoutes } from '@/helpers/routes';
import { AddedWordLink } from '@/components/AddedWordLink';
import { NavigationMenu } from '@/components/NavigationMenu';
import { FlagsIcon } from '@/helpers/FlagsIcon';
import { DictionaryType } from '@/repositories/types';

import styles from './Root.module.scss';

type Props = {
  dictionary: DictionaryType[];
};

enum SortTableValue {
  point = 'point',
  lastTraining = 'lastTraining',
  lang = 'lang',
}

dayjs.extend(relativeTime).locale(ru);

const Home: NextPage<Props> = ({ dictionary }) => {
  const [dictionaryData, setDictionaryData] = useState(dictionary);
  const [sortKey, setSortKey] = useState<SortTableValue | undefined>(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(undefined);
  const [openAddedWordModal, setOpenAddedWordModal] = useState(false);
  const handleAddedWordModalOpen = useCallback(() => {
    setOpenAddedWordModal((v) => !v);
  }, []);

  const handleSort = useCallback(
    (key: SortTableValue) => {
      setSortKey(key);
      if (isSortedDesc !== undefined) {
        setIsSortedDesc(!isSortedDesc ? undefined : false);
      } else {
        setIsSortedDesc(true);
      }
    },
    [isSortedDesc],
  );

  const sortedDictionary = useMemo(() => {
    if (!sortKey || isSortedDesc === undefined) return dictionaryData;
    return [...dictionaryData].sort((a, b) => {
      if (sortKey === SortTableValue.point) {
        return isSortedDesc ? b.point - a.point : a.point - b.point;
      }
      if (sortKey === SortTableValue.lastTraining) {
        return isSortedDesc
          ? b.lastRepetition.toString().localeCompare(a.lastRepetition.toString())
          : a.lastRepetition.toString().localeCompare(b.lastRepetition.toString());
      }
      if (sortKey === SortTableValue.lang) {
        return isSortedDesc ? b.lang.localeCompare(a.lang) : a.lang.localeCompare(b.lang);
      }

      return 0;
    });
  }, [dictionaryData, isSortedDesc, sortKey]);

  useEffect(() => {
    (async () => {
      try {
        if (openAddedWordModal) return;
        const res = await axios.get(`/api/dictionary`);
        setDictionaryData(res.data);
      } catch ({ response }) {
        catchHandler(response);
      } finally {
      }
    })();
  }, [openAddedWordModal]);

  return (
    <>
      <Table className={styles.table}>
        <Table.THead>
          <Table.THeadCell>Слово</Table.THeadCell>
          <Table.THeadCell>Перевод</Table.THeadCell>
          <Table.TSortableHeadCell
            width={100}
            textAlign="center"
            className={styles.sortTh}
            isSortedDesc={sortKey === SortTableValue.point ? isSortedDesc : undefined}
            onSort={() => handleSort(SortTableValue.point)}>
            Владение
          </Table.TSortableHeadCell>
          <Table.TSortableHeadCell
            width={200}
            textAlign="center"
            className={styles.sortTh}
            isSortedDesc={sortKey === SortTableValue.lastTraining ? isSortedDesc : undefined}
            onSort={() => handleSort(SortTableValue.lastTraining)}>
            Последняя тренировка
          </Table.TSortableHeadCell>
          <Table.TSortableHeadCell
            width={100}
            textAlign="center"
            className={styles.sortTh}
            isSortedDesc={sortKey === SortTableValue.lang ? isSortedDesc : undefined}
            onSort={() => handleSort(SortTableValue.lang)}>
            Язык
          </Table.TSortableHeadCell>
        </Table.THead>
        <Table.TBody>
          {sortedDictionary.map((row) => (
            <Table.TRow key={row.id}>
              <Table.TCell>
                {row.word} <SoundWord word={row.word} lang={row.lang} />
              </Table.TCell>
              <Table.TCell>{row.translation}</Table.TCell>
              <Table.TCell>
                <LevelStudy point={row.point} />
              </Table.TCell>
              <Table.TCell>{dayjs(row.lastRepetition).fromNow()}</Table.TCell>
              <Table.TCell className={styles.flag}>{FlagsIcon[row.lang]}</Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>
      <NavigationMenu>
        <NavigationLink href={AppRoutes.statistics} icon={IconNavigationLinkType.statistics} />
        <AddedWordLink handleModalOpen={handleAddedWordModalOpen} open={openAddedWordModal} />
        <NavigationLink href={AppRoutes.learning} icon={IconNavigationLinkType.learning} />
      </NavigationMenu>
    </>
  );
};

export async function getServerSideProps() {
  const dictionary = JSON.parse(JSON.stringify(await dictionaryRepository.getDictionary()));

  return {
    props: {
      dictionary,
    },
  };
}

export default Home;
