import clientPromise from '../mongodb';

type DataType = { lang: 'eng'; word: string; translation: string; point: number };

export async function getDictionary(): Promise<any> {
  const client = await clientPromise;
  const collection = client.db('test').collection<DataType>('dictionary');
  return collection.find({}, { projection: { _id: 0 } }).toArray();
}
export async function createDictionary(body: DataType): Promise<any> {
  const client = await clientPromise;
  const collection = client.db('test').collection<DataType>('dictionary');

  return await collection.insertOne(body);
}
