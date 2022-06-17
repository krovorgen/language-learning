import type { NextApiRequest, NextApiResponse } from 'next';
import { createDictionary, getDictionary } from '@/lib/api/dictionary';
import { catchHandler } from '@/lib/catchHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await getDictionary();
        return res.status(200).json(result);
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    case 'POST':
      try {
        const createDictionaryDto = await createDictionary(req.body);
        return res.status(200).json(createDictionaryDto);
      } catch ({ response }) {
        catchHandler(response);
      }
      break;
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
