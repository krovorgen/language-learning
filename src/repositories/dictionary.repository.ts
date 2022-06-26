import clientPromise from '@/repositories/mongodb';
import { DeleteResult, UpdateResult } from 'mongodb';
import {
  CreateDictionaryDtoType,
  DictionaryType,
  UpdateDictionaryDtoType,
} from '@/repositories/types';

const dictionary = clientPromise.db('test').collection<DictionaryType>('dictionary');

class DictionaryRepository {
  async getDictionary(): Promise<DictionaryType[]> {
    return await dictionary.find({}, { projection: { _id: 0 } }).toArray();
  }

  async getDictionaryById(id: string): Promise<DictionaryType | null> {
    return await dictionary.findOne({ id: +id }, { projection: { _id: 0 } });
  }

  async createDictionary(createDictionaryDto: CreateDictionaryDtoType): Promise<DictionaryType> {
    const newDictionary: DictionaryType = {
      ...createDictionaryDto,
      id: +new Date(),
      point: 0,
      lastRepetition: new Date(),
      workoutsCount: { correct: 0, incorrect: 0 },
    };
    await dictionary.insertOne(newDictionary);
    return newDictionary;
  }

  async updateDictionary(
    id: string,
    updateDictionaryDto: UpdateDictionaryDtoType,
  ): Promise<UpdateResult> {
    return await dictionary.updateOne({ id: +id }, { $set: updateDictionaryDto });
  }

  async deleteDictionary(id: string): Promise<DeleteResult> {
    return await dictionary.deleteOne({ id: +id });
  }

  async getWordWithLowPoint(): Promise<DictionaryType | null> {
    return await dictionary.findOne({}, { projection: { _id: 0 }, sort: { point: 1 } });
  }
}

export const dictionaryRepository = new DictionaryRepository();
