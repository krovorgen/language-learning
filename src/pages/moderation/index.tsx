import React from 'react';
import { dictionaryRepository } from '@/repositories/dictionary.repository';
import { NextPage } from 'next';
import { DictionaryType } from '@/repositories/types';
import { Typography } from '@alfalab/core-components/typography';
import { ModerationWord } from '@/components/ModerationWord';

import styles from './Moderation.module.scss';

type Props = {
  dictionary: DictionaryType[];
};

const Moderation: NextPage<Props> = ({ dictionary }) => {
  return (
    <section>
      <div className="container">
        <Typography.Title className={styles.title} tag="h1">
          Проверка
        </Typography.Title>
        {!!dictionary.length ? (
          dictionary.map((el) => (
            <ModerationWord key={el.id} id={el.id} word={el.word} translation={el.translation} />
          ))
        ) : (
          <>Слов на проверке нет</>
        )}
      </div>
    </section>
  );
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
