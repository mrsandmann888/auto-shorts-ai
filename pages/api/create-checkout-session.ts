import type { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../utils/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).end('Method Not Allowed'); }

  const { plan } = req.body as { plan: 'creator' | 'agency' };
  const priceId = plan === 'agency' ? process.env.STRIPE_PRICE_AGENCY! : process.env.STRIPE_PRICE_CREATOR!;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/?success=1`,
    cancel_url: `${req.headers.origin}/?canceled=1`,
  });
  res.status(200).json({ url: session.url });
}
