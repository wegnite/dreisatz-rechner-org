import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { Camera, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Section = {
  title: string;
  body: string[];
};

type Hero = {
  title: string;
  description: string;
  primaryCta?: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AIVintagePhotoPage' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    canonicalUrl: getUrlWithLocale('/ai/vintage-photo', locale),
  });
}

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AIVintagePhotoPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AIVintagePhotoPage' });

  const hero = t.raw('hero') as Hero;
  const sections = t.raw('sections') as Section[];

  const generatorHref = getUrlWithLocale('/ai/polaroid/generator', locale);

  return (
    <div className="bg-background">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" className="w-fit gap-2">
              <Camera className="h-3.5 w-3.5" />
              {t('title')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {hero.title}
            </h1>
            <p className="text-lg text-muted-foreground">{hero.description}</p>
            {hero.primaryCta ? (
              <div className="pt-4">
                <Button size="lg" asChild>
                  <Link href={generatorHref}>{hero.primaryCta}</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-16 md:grid-cols-2 md:py-20">
        {sections.map((section, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {index + 1}
                </span>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="border-t bg-muted/20">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <Badge variant="outline" className="mx-auto w-fit gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              {t('hero.title')}
            </Badge>
            <p className="text-muted-foreground">{t('description')}</p>
            <Button size="lg" asChild>
              <Link href={generatorHref}>{hero.primaryCta ?? t('hero.title')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
