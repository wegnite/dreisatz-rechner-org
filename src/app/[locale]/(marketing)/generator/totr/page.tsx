import { TotrMemeGenerator } from '@/components/totr/TotrMemeGenerator';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  return constructMetadata({
    title: 'TOTR Meme Generator — Make a TOTR (TOTЯ, Тотя) Meme Online',
    description:
      'Free online TOTR meme generator with parody-style templates. Add text, resize, and export PNG with watermark. No copyrighted assets built-in.',
    canonicalUrl: getUrlWithLocale('/generator/totr', locale),
  });
}

export default function Page() {
  return (
    <main className="container mx-auto py-8">
      <TotrMemeGenerator />
    </main>
  );
}
