import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import stripe from '../../utils/stripe'; // this is your correctly configured Stripe instance

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}

  try {
    const { plan } = req.body;

    const priceId = plan === 'agency'
      ? process.env.STRIPE_PRICE_AGENCY
      : process.env.STRIPE_PRICE_CREATOR;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
