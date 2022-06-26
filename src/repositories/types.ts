export enum DictionaryLangType {
  eng = 'eng',
  tr = 'tr',
}

export type DictionaryType = {
  id: number;
  lang: DictionaryLangType;
  word: string;
  translation: string;
  point: number;
  lastRepetition: Date;
};
export type CreateDictionaryDtoType = {
  lang: DictionaryLangType;
  word: string;
  translation: string;
};
export type UpdateDictionaryDtoType = {
  word: string;
  translation: string;
  point: number;
  lastRepetition: Date;
};
