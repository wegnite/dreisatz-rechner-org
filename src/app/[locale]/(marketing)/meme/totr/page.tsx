import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale, shouldAppendLocale } from '@/lib/urls/urls';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

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
    title: 'AI Polaroid Photo — Nostalgic Instant Photo Generator',
    description:
      'Create AI-generated polaroid photos with vintage film borders, caption overlays, and export-ready templates.',
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
