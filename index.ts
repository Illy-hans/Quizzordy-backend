import { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';
import app from './src/app'; // or './app' depending on your structure

const handler = serverless(app);

export default async function(req: VercelRequest, res: VercelResponse) {
    return handler(req, res);
}