'use client';

import { useTranslations } from 'next-intl';

export function GlossarySection() {
  const t = useTranslations();
  const entries = Array.from({ length: 6 }).map((_, index) => ({
    term: t(`entries.${index}.term`),
    definition: t(`entries.${index}.definition`),
  }));

  return (
    <section id="glossar" className="py-16">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <div
              key={entry.term}
              className="rounded-lg border bg-muted/40 p-5 shadow-sm transition hover:border-primary/40"
            >
              <dt className="text-lg font-semibold text-primary">{entry.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {entry.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

