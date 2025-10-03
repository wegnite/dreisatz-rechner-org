'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function VideoGuideSection() {
  const t = useTranslations();

  return (
    <section id="dreisatz-video" className="bg-muted/30 py-16">
      <div className="container grid items-center gap-8 md:grid-cols-[3fr,2fr]">
        <div className="space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
          <p className="text-muted-foreground">{t('description')}</p>
          <Button asChild className="w-fit">
            <a href="/calculator/calculator.png" download>
              {t('downloadCta')}
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">{t('downloadHint')}</p>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-xl">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/AKafqY4nHCk"
                title="Dreisatz Rechner Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="size-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-primary/30 bg-background p-4">
            <Image
              src="/calculator/calculator-favicon.ico"
              alt="Dreisatz Rechner Icon"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="text-sm text-muted-foreground">{t('tip')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

