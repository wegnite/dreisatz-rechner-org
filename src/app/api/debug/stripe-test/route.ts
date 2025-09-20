import { NextResponse } from 'next/server';
import { Stripe } from 'stripe';

const DEBUG_VERSION = '2025-09-20T02:07Z';

export async function GET() {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY;

    if (!secret) {
      return NextResponse.json(
        {
          ok: false,
          version: DEBUG_VERSION,
          error: 'Missing STRIPE_SECRET_KEY in runtime env',
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const result = priceId
      ? await stripe.prices.retrieve(priceId)
      : undefined;

    return NextResponse.json({
      ok: true,
      version: DEBUG_VERSION,
      price: result
        ? {
            id: result.id,
            product: typeof result.product === 'string' ? result.product : result.product.id,
            active: result.active,
            currency: result.currency,
            unit_amount: result.unit_amount,
          }
        : null,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : JSON.stringify(error);

    return NextResponse.json(
      {
        ok: false,
        version: DEBUG_VERSION,
        error: message,
      },
      { status: 500 }
    );
  }
}
