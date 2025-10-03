'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function VisualsSection() {
  const t = useTranslations();
  const cards = Array.from({ length: 2 }).map((_, index) => ({
    title: t(`cards.${index}.title`),
    body: t(`cards.${index}.body`),
  }));

  return (
    <section id="schritt-verstaendnis" className="py-16 bg-background">
      <div className="container grid items-center gap-8 md:grid-cols-[3fr,2fr]">
        <div className="space-y-5">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground">{t('description')}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.title} className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild variant="outline" className="w-fit">
            <a href="/calculator/calculator.png" download>
              {t('downloadCta')}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">{t('downloadHint')}</p>
        </div>
        <div className="relative mx-auto max-w-md">
          <Image
            src="/calculator/calculator.png"
            alt={t('imageCaption')}
            width={640}
            height={640}
            className="rounded-2xl border shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
