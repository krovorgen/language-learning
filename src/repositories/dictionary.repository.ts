import clientPromise from '@/repositories/mongodb';
import { DeleteResult, UpdateResult } from 'mongodb';
import {
  CreateDictionaryDtoType,
  DictionaryType,
  StatisticsType,
  UpdateDictionaryDtoType,
  WorkoutsCountType,
} from '@/repositories/types';

const dictionary = clientPromise.db('test').collection<DictionaryType>('dictionary');

class DictionaryRepository {
  async getDictionary(): Promise<DictionaryType[]> {
    return await dictionary
      .find({ isModerated: true }, { projection: { _id: 0 } })
      .sort({ word: 1 })
      .toArray();
  }

  async getNotModeratedDictionary(): Promise<DictionaryType[]> {
    return await dictionary
      .find({ isModerated: false }, { projection: { _id: 0 } })
      .sort({ word: 1 })
      .toArray();
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
      isModerated: false,
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
    return await dictionary.findOne(
      { isModerated: true },
      { projection: { _id: 0 }, sort: { point: 1 } },
    );
  }

  async getCountDictionary(): Promise<number> {
    return await dictionary.countDocuments();
  }

  async getTotalPoint(): Promise<number> {
    return (
      await dictionary
        .aggregate([{ $group: { _id: null, totalPoint: { $sum: '$point' } } }])
        .toArray()
    )[0].totalPoint;
  }

  async totalWorkoutsCount(): Promise<WorkoutsCountType> {
    const correct = (
      await dictionary
        .aggregate([{ $group: { _id: null, totalCorrect: { $sum: '$workoutsCount.correct' } } }])
        .toArray()
    )[0].totalCorrect;

    const incorrect = (
      await dictionary
        .aggregate([
          { $group: { _id: null, totalIncorrect: { $sum: '$workoutsCount.incorrect' } } },
        ])
        .toArray()
    )[0].totalIncorrect;

    return {
      correct,
      incorrect,
    };
  }

  async getStatistics(): Promise<StatisticsType> {
    return {
      countWords: await this.getCountDictionary(),
      totalPoint: await this.getTotalPoint(),
      totalWorkoutsCount: await this.totalWorkoutsCount(),
    };
  }
}

export const dictionaryRepository = new DictionaryRepository();
