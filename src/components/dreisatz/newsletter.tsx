'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function NewsletterSection() {
  const t = useTranslations();
  const [email, setEmail] = useState('');

  return (
    <section id="newsletter" className="bg-muted/20 py-16">
      <div className="container space-y-6 text-center">
        <span className="text-sm font-medium text-primary uppercase tracking-wide">
          {t('label')}
        </span>
        <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">{t('description')}</p>

        <form
          className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setEmail('');
          }}
        >
          <Input
            id="dreisatz-newsletter"
            type="email"
            placeholder={t('placeholder')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button type="submit" className="shrink-0">
            {t('button')}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">{t('legal')}</p>
      </div>
    </section>
  );
}

