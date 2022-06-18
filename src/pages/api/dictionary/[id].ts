import { NextApiRequest, NextApiResponse } from 'next';

import { catchHandler } from '@/lib/catchHandler';
import { dictionaryRepository } from '@/repositories/dictionary.repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const result = await dictionaryRepository.getDictionaryById(id as string);
        if (result) return res.status(200).json(result);
        return res.status(404).json({ error: ['Не найдено'] });
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    case 'PATCH':
      try {
        const updateDictionaryDtoType = await dictionaryRepository.updateDictionary(
          id as string,
          req.body,
        );
        return res.status(200).json(updateDictionaryDtoType);
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    case 'DELETE':
      try {
        const updateDictionaryDtoType = await dictionaryRepository.deleteDictionary(id as string);
        return res.status(200).json(updateDictionaryDtoType);
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
