import React from 'react';
import { dictionaryRepository } from '@/repositories/dictionary.repository';
import { NextPage } from 'next';
import { DictionaryType } from '@/repositories/types';

type Props = {
  dictionary: DictionaryType[];
};

const Moderation: NextPage<Props> = ({ dictionary }) => {
  return <div>{JSON.stringify(dictionary)}</div>;
};

export async function getServerSideProps() {
  const dictionary = JSON.parse(
    JSON.stringify(await dictionaryRepository.getNotModeratedDictionary()),
  );

  return {
    props: {
      dictionary,
    },
  };
}

export default Moderation;
