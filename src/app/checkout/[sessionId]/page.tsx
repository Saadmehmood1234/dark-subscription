import { loadStripe } from '@stripe/stripe-js';
import { redirect } from 'next/navigation';

export default async function CheckoutPage({
  params,
}: {
  params: { sessionId: string }
}) {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  
  if (stripe) {
    await stripe.redirectToCheckout({
      sessionId: params.sessionId,
    });
  }

  return null;
}