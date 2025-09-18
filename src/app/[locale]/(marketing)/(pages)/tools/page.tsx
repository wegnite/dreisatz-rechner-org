import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const pt = await getTranslations({ locale, namespace: 'ToolsPage' });
  return constructMetadata({
    title: pt('title') + ' | ' + t('title'),
    description: pt('description'),
    canonicalUrl: getUrlWithLocale('/tools', locale),
  });
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ToolsPage' });
  const items = [
    {
      title: t('items.wordGame.title'),
      desc: t('items.wordGame.description'),
      href: Routes.AIImage,
    },
    {
      title: t('items.wordLists.title'),
      desc: t('items.wordLists.description'),
      href: Routes.Blog,
    },
    {
      title: t('items.statistics.title'),
      desc: t('items.statistics.description'),
      href: Routes.AIImage,
    },
    {
      title: t('items.hints.title'),
      desc: t('items.hints.description'),
      href: Routes.AIImage,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-3 text-muted-foreground max-w-3xl">{t('description')}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="p-6 space-y-2 border bg-card/50">
            <h3 className="font-medium text-lg">{it.title}</h3>
            <p className="text-sm text-muted-foreground">{it.desc}</p>
            <LocaleLink
              href={it.href}
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'mt-3'
              )}
            >
              {t('cta')}
            </LocaleLink>
          </Card>
        ))}
      </div>
    </div>
  );
}
