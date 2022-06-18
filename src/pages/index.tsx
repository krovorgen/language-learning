import { NextPage } from 'next';
import { Table } from '@alfalab/core-components/table';
import { LevelStudy } from '@/components/LevelStudy';
import { DictionaryType, getDictionary } from '@/lib/api/dictionary';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Eng } from '@/components/Flags/Eng';
import { Tr } from '@/components/Flags/Tr';

import styles from './Root.module.scss';

type Props = {
  dictionary: DictionaryType[];
};

const FlagsIcon = {
  eng: <Eng />,
  tr: <Tr />,
};

dayjs.extend(relativeTime).locale(ru);

const Home: NextPage<Props> = ({ dictionary }) => {
  return (
    <>
      <Table className={styles.table}>
        <Table.THead>
          <Table.THeadCell title="Слово">Слово</Table.THeadCell>
          <Table.THeadCell title="Перевод">Перевод</Table.THeadCell>
          <Table.THeadCell title="Владение" width={100} textAlign="center">
            Владение
          </Table.THeadCell>
          <Table.THeadCell title="Последняя тренировка" width={200} textAlign="center">
            Последняя тренировка
          </Table.THeadCell>
          <Table.THeadCell title="Язык" width={100} textAlign="center">
            Язык
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {dictionary.map((row) => (
            <Table.TRow key={row.id}>
              <Table.TCell>{row.word}</Table.TCell>
              <Table.TCell>
                <ul>
                  {row.translation.map((item, index) => (
                    <li key={index}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ul>
              </Table.TCell>
              <Table.TCell>
                <LevelStudy point={row.point} />
              </Table.TCell>
              <Table.TCell>{dayjs(row.lastRepetition).fromNow()}</Table.TCell>
              <Table.TCell className={styles.flag}>{FlagsIcon[row.lang]}</Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>
    </>
  );
};

export async function getStaticProps() {
  const dictionary = JSON.parse(JSON.stringify(await getDictionary()));

  return {
    props: {
      dictionary,
    },
  };
}
export default Home;
