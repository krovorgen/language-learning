import type { NextApiRequest, NextApiResponse } from 'next';
import { createDictionary, getDictionary } from '@/lib/api/dictionary';
import { catchHandler } from '@/lib/catchHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await getDictionary();
      return res.status(200).json(result);
    } catch ({ response }) {
      catchHandler(response);
    }
  } else if (req.method === 'POST') {
    try {
      const result = await createDictionary(req.body);
      return res.status(200).json(result);
    } catch ({ response }) {
      catchHandler(response);
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
