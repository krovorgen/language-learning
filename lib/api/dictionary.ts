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

export async function getDictionary(): Promise<any> {
  const client = await clientPromise;
  const collection = client.db('test').collection<DictionaryType>('dictionary');
  return collection.find({}, { projection: { _id: 0 } }).toArray();
}
export async function createDictionary(body: CreateBodyType): Promise<any> {
  const client = await clientPromise;
  const collection = client.db('test').collection<DictionaryType>('dictionary');

  const data: DictionaryType = { ...body, id: +new Date(), point: 0 };

  return await collection.insertOne(data);
}
