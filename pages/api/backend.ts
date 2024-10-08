import { getBackendURL } from '@/utils/utils-data';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * API endpoint that forward the fetch request to the backend
 * @param req NextAPIRequest
 * @param res NextAPIResponse
 * @returns a promise with the axios result
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string;
  const body = req.body;
  const method = req.method;
  const authorization = req.headers.authorization;
  let finalQuery = '';

  // Extract the query params to forward on backend
  Object.keys(req.query).forEach((key: string) => {
    if (key !== 'path') {
      finalQuery += `${key}=${req.query[key]}&`;
    }
  });

  // Remove the last if no more
  if (finalQuery.endsWith('&')) {
    finalQuery = finalQuery.slice(0, -1);
  }

  return new Promise<void>((resolve, reject) => {
    axios({
      url: `${getBackendURL()}${path}?${finalQuery}`,
      method: method,
      headers: { Authorization: authorization },
      data: body,
    })
      .then((response) => {
        const data = response.data;
        res.status(200).send(data);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        res.status(500).end();
        resolve();
      });
  });
}
