import { NextPage } from 'next';
import { Button } from '@alfalab/core-components/button';
import { getDictionary } from '@/lib/api/dictionary';

const Home: NextPage = ({ dictionary }: any) => {
  console.log(dictionary);
  return (
    <div>
      <Button>Hello world</Button>
    </div>
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
