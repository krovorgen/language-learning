import type { NextApiRequest, NextApiResponse } from 'next';
import { catchHandler } from '@/lib/catchHandler';
import { dictionaryRepository } from '@/repositories/dictionary.repository';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await dictionaryRepository.getDictionary();
        return res.status(200).json(result);
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    case 'POST':
      try {
        const createDictionaryDto = await dictionaryRepository.createDictionary(req.body);
        return res.status(200).json(createDictionaryDto);
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
