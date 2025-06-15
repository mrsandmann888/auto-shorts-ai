import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).end('Method Not Allowed'); }
  const { url } = req.body as { url: string };
  if (!url) return res.status(400).json({ error: 'Missing YouTube URL' });
  res.status(200).json({ message: 'Processing stub – integrate your AI service here.', shorts: [] });
}
