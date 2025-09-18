import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const metaTranslations = await getTranslations({
    locale,
    namespace: 'Metadata',
  });
  const pageTranslations = await getTranslations({
    locale,
    namespace: 'PolicyUgcPage',
  });

  return constructMetadata({
    title: `${pageTranslations('title')} | ${metaTranslations('title')}`,
    description: pageTranslations('description'),
    canonicalUrl: getUrlWithLocale('/policy/ugc', locale),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PolicyUgcPage' });
  const paragraphs = t.raw('body') as string[];

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="mt-4 space-y-4 text-muted-foreground">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-6 space-x-4">
        <LocaleLink className="underline" href="/ai/polaroid/generator">
          {t('backLink')}
        </LocaleLink>
        <LocaleLink className="underline" href="/terms">
          {t('termsLink')}
        </LocaleLink>
      </div>
    </main>
  );
}
