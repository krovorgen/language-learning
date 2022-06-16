import clientPromise from '../mongodb';

export async function getDictionary(): Promise<any> {
  const client = await clientPromise;
  const collection = client.db('test').collection('dictionary');
  const results = await collection.findOne({}, { projection: { _id: 0 } });
  if (results) {
    return {
      ...results,
    };
  } else {
    return null;
  }
}
