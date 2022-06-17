import clientPromise from '../mongodb';

export type DictionaryType = {
  id: number;
  lang: 'eng';
  word: string;
  translation: string;
  point: number;
};

export type CreateDictionaryDtoType = {
  lang: 'eng';
  word: string;
  translation: string;
};

export type UpdateDictionaryDtoType = {
  word: string;
  translation: string;
  point: number;
};

const dictionary = clientPromise.db('test').collection<DictionaryType>('dictionary');

export async function getDictionary(): Promise<DictionaryType[]> {
  return await dictionary.find({}, { projection: { _id: 0 } }).toArray();
}
export async function createDictionary(
  createDictionaryDto: CreateDictionaryDtoType,
): Promise<DictionaryType> {
  const newDictionary: DictionaryType = { ...createDictionaryDto, id: +new Date(), point: 0 };
  await dictionary.insertOne(newDictionary);
  return newDictionary;
}
export async function updateDictionary(
  id: string,
  updateDictionaryDto: UpdateDictionaryDtoType,
): Promise<void> {
  await dictionary.updateOne({ id: +id }, { $set: updateDictionaryDto });
}
export async function deleteDictionary(id: string): Promise<void> {
  await dictionary.deleteOne({ id: +id });
}
