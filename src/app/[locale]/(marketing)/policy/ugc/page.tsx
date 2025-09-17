import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  await params;
  return constructMetadata({
    title: 'UGC & Copyright Policy — AI Polaroid Photo',
    description:
      'Creators may upload only media they have rights to use. We review takedown requests within 24 hours and provide safe remix tools.',
    canonicalUrl: 'https://aipolaroidphoto.org/policy/ugc',
  });
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">UGC & Copyright Policy</h1>
      <p className="mt-4 text-muted-foreground">
        AI Polaroid Photo lets you combine your own photos with AI-generated
        effects. Only upload images, prompts, and overlays you have permission to
        use. We do not host unlicensed celebrity likenesses or commercial IP.
        For takedown requests, email support@aipolaroidphoto.org with the
        relevant URLs and proof of ownership. We respond within 24 hours.
      </p>
      <div className="mt-6 space-x-4">
        <a className="underline" href="/ai/polaroid/generator">
          Back to generator →
        </a>
        <a className="underline" href="/terms">
          Review Terms of Service →
        </a>
      </div>
    </main>
  );
}
