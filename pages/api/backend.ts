import { getBackendURL } from '@/utils/utils-data';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string;
  const body = req.body;
  const method = req.method;
  return new Promise((resolve, reject) => {
    axios({
      url: `${getBackendURL()}/${path}`,
      method: method,
      data: body,
    })
      .then((response) => {
        const data = response.data;
        res.status(200).send(data);
        resolve(0);
      })
      .catch(() => {
        res.status(500).end();
        resolve(0);
      });
  });
}
