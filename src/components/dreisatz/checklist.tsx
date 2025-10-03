'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ChecklistSection() {
  const t = useTranslations();
  const items = Array.from({ length: 4 }).map((_, index) => ({
    title: t(`items.${index}.title`),
    body: t(`items.${index}.body`),
  }));

  return (
    <section id="fehlervermeidung" className="bg-muted/30 py-16">
      <div className="container space-y-10">
        <div className="space-y-3 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

