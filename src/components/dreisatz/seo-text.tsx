'use client';

import { useTranslations } from 'next-intl';

export function DreisatzSeoText() {
  const t = useTranslations();
  const paragraphs = Array.from({ length: 2 }).map((_, index) =>
    t(`paragraphs.${index}`)
  );

  return (
    <section id="dreisatz-wissen" className="bg-muted/10 py-16">
      <div className="container space-y-6 text-left text-muted-foreground">
        <h2 className="text-2xl font-serif font-semibold">{t('title')}</h2>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

