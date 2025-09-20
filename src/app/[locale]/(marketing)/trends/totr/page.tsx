import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale, shouldAppendLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { redirect } from 'next/navigation';

const TARGET_PATH = '/ai/polaroid';

function getLocalizedTarget(locale: Locale): string {
  return shouldAppendLocale(locale) ? `/${locale}${TARGET_PATH}` : TARGET_PATH;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  return constructMetadata({
    title: 'AI Polaroid Photo — Latest Updates & Inspiration',
    description:
      'Stay current with AI polaroid photo trends, gallery spotlights, and workflow updates for instant-film style edits.',
    canonicalUrl: getUrlWithLocale(TARGET_PATH, locale),
    noIndex: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(getLocalizedTarget(locale));
}
