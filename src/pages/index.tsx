import type { GetServerSideProps, NextPage } from 'next';
import { Button } from '@alfalab/core-components/button';
import { getDictionary } from '../../lib/api/dictionary';

const Home = ({ results }: { results: any }) => {
  console.log(results);
  return (
    <div>
      <Button>Hello world</Button>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const results = await getDictionary();

  return {
    props: {
      results,
    },
  };
};
