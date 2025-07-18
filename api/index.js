// api/index.js
import app from '../src/app.js';
import { createServer } from 'http';
import { parse } from 'url';

// Required for Vercel to handle the request
export default async function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  app.handle(req, res, parsedUrl);
}
