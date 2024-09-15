import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { NextApiResponse } from 'next';

// This API get data from the JSON inside the folder /data
export default async function handler(req: NextApiRequestQuery, res: NextApiResponse) {
  // Find the absolute path of the "json" directory
  const jsonDirectory = path.join(process.cwd(), 'data');
  // Read the "data.json" file
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');
  // Return the content of the data file in JSON format
  res.status(200).json(JSON.parse(fileContents));
}
