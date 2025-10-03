import { DreisatzHomepage } from '@/components/dreisatz';
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
    title: 'Dreisatz Rechner – Verhältnisrechnung meistern',
    description: 'Dreisatz Rechner löst proportionale und antiproportionale Aufgaben mit erklärten Schritten. Ideal für Schule, Berufsausbildung und kaufmännische Kalkulationen.',
    canonicalUrl: getUrlWithLocale('/', locale),
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  return <DreisatzHomepage />;
}
