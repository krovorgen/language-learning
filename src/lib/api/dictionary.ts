import clientPromise from '../mongodb';
import { DeleteResult, UpdateResult } from 'mongodb';

export type DictionaryLangType = 'eng' | 'tr';

export type DictionaryType = {
  id: number;
  lang: DictionaryLangType;
  word: string;
  translation: string[];
  point: number;
  lastRepetition: Date;
};

export type CreateDictionaryDtoType = {
  lang: DictionaryLangType;
  word: string;
  translation: string[];
};

export type UpdateDictionaryDtoType = {
  word: string;
  translation: string[];
  point: number;
  lastRepetition: Date;
};

const dictionary = clientPromise.db('test').collection<DictionaryType>('dictionary');

export async function getDictionary(): Promise<DictionaryType[]> {
  return await dictionary.find({}, { projection: { _id: 0 } }).toArray();
}
export async function getDictionaryById(id: string): Promise<DictionaryType | null> {
  return await dictionary.findOne({ id: +id }, { projection: { _id: 0 } });
}
export async function createDictionary(
  createDictionaryDto: CreateDictionaryDtoType,
): Promise<DictionaryType> {
  const newDictionary: DictionaryType = {
    ...createDictionaryDto,
    id: +new Date(),
    point: 0,
    lastRepetition: new Date(),
  };
  await dictionary.insertOne(newDictionary);
  return newDictionary;
}
export async function updateDictionary(
  id: string,
  updateDictionaryDto: UpdateDictionaryDtoType,
): Promise<UpdateResult> {
  return await dictionary.updateOne({ id: +id }, { $set: updateDictionaryDto });
}
export async function deleteDictionary(id: string): Promise<DeleteResult> {
  return await dictionary.deleteOne({ id: +id });
}
