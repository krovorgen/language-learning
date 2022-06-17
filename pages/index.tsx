import { NextPage } from 'next';
import { DictionaryType, getDictionary } from '@/lib/api/dictionary';
import { Table } from '@alfalab/core-components/table';

type Props = {
  dictionary: DictionaryType[];
};

enum DictionaryLanguage {
  'eng' = 'Английский',
}

const Home: NextPage<Props> = ({ dictionary }) => {
  return (
    <>
      <h1>11</h1>
      <Table>
        <Table.THead>
          <Table.THeadCell title="Язык">Язык</Table.THeadCell>
          <Table.THeadCell title="Слово">Слово</Table.THeadCell>
          <Table.THeadCell title="Перевод">Перевод</Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {dictionary.map((row) => (
            <Table.TRow key={row.id}>
              <Table.TCell>{DictionaryLanguage[row.lang]}</Table.TCell>
              <Table.TCell>{row.word}</Table.TCell>
              <Table.TCell>{row.translation}</Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
      </Table>
    </>
  );
};

export async function getStaticProps() {
  const dictionary = await getDictionary();
  return {
    props: {
      dictionary,
    },
  };
}
export default Home;
