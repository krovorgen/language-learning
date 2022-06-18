import { NextPage } from 'next';
import Head from 'next/head';
import { Table } from '@alfalab/core-components/table/modern';
import { LevelStudy } from '@/components/LevelStudy';
import { DictionaryType, getDictionary } from '@/lib/api/dictionary';

type Props = {
  dictionary: DictionaryType[];
};

const Home: NextPage<Props> = ({ dictionary }) => {
  return (
    <>
      <Head>
        <title>Dictionary</title>
        <meta property="og:title" content="Dictionary" key="title" />
      </Head>
      <Table>
        <Table.THead>
          <Table.THeadCell title="Слово">Слово</Table.THeadCell>
          <Table.THeadCell title="Перевод">Перевод</Table.THeadCell>
          <Table.THeadCell title="Владение">Владение</Table.THeadCell>
          <Table.THeadCell title="Язык" width={100} textAlign="center">
            Язык
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {dictionary.map((row) => (
            <Table.TRow key={row.id}>
              <Table.TCell>{row.word}</Table.TCell>
              <Table.TCell>{row.translation}</Table.TCell>
              <Table.TCell>
                <LevelStudy point={row.point} />
              </Table.TCell>
              <Table.TCell>{row.lang}</Table.TCell>
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
