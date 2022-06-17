import clientPromise from '../mongodb';

export type DictionaryType = {
  id: number;
  lang: 'eng';
  word: string;
  translation: string;
  point: number;
};

export type CreateBodyType = {
  lang: 'eng';
  word: string;
  translation: string;
};

const dictionary = clientPromise.db('test').collection<DictionaryType>('dictionary');

export async function getDictionary(): Promise<any> {
  return await dictionary.find({}, { projection: { _id: 0 } }).toArray();
}
export async function createDictionary(body: CreateBodyType): Promise<any> {
  const newDictionary: DictionaryType = { ...body, id: +new Date(), point: 0 };
  await dictionary.insertOne(newDictionary);
  return newDictionary;
}
