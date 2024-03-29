export enum DictionaryLangType {
  eng = 'eng',
  tr = 'tr',
}

export type WorkoutsCountType = {
  correct: number;
  incorrect: number;
};

export type DictionaryType = {
  id: number;
  lang: DictionaryLangType;
  word: string;
  translation: string;
  point: number;
  lastRepetition: Date;
  workoutsCount: WorkoutsCountType;
  isModerated: boolean;
};

export type CreateDictionaryDtoType = {
  lang: DictionaryLangType;
  word: string;
  translation: string;
};

export type UpdateDictionaryDtoType = {
  word?: string;
  translation?: string;
  point?: number;
  lastRepetition?: Date;
  workoutsCount?: WorkoutsCountType;
  isModerated?: boolean;
};

export type StatisticsType = {
  countWords: number;
  totalPoint: number;
  totalWorkoutsCount: WorkoutsCountType;
};
