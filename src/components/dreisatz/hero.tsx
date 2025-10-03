import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function DreisatzHero() {
  const t = useTranslations('HomePage');
  const stats = Array.from({ length: 3 }).map((_, index) => ({
    value: t(`stats.items.${index}.value`),
    label: t(`stats.items.${index}.label`),
  }));

  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-b from-slate-950 via-slate-930 to-slate-900 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),transparent_65%)]" />
        <div className="absolute -left-48 bottom-0 h-[360px] w-[360px] rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-[280px] w-[280px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl space-y-6 text-left">
          <div className="flex items-center gap-3 text-sm font-medium text-primary">
            <Image
              src="/calculator/calculator.svg"
              alt={t('title')}
              width={56}
              height={56}
              className="h-12 w-12 rounded-xl border border-primary/30 bg-primary/10 p-2"
              priority
            />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
            {t('hero.title')}
          </h1>

          <p className="text-lg leading-relaxed text-slate-200/90 sm:text-xl">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="#rechner">{t('hero.primaryCta')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-primary/40 bg-white/5 px-6 text-white hover:bg-white/10"
            >
              <Link href="#dreisatz-video">{t('hero.secondaryCta')}</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((item, index) => (
              <StatItem key={index} value={item.value} label={item.label} />
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center md:mx-0">
          <div className="relative rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_30px_100px_-60px_rgba(56,189,248,0.75)] backdrop-blur">
            <Image
              src="/calculator/calculator.png"
              alt="Screenshot Dreisatz Rechner Oberfläche"
              width={540}
              height={380}
              className="rounded-2xl"
              priority
            />
            <p className="mt-4 text-sm text-slate-200/80">
              Dreisatz Rechner mit KI-Textmodus &amp; klassischer Eingabe – jeder Schritt wird erläutert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-background/80 p-4">
      <h3 className="text-2xl font-semibold text-white">{value}</h3>
      <p className="mt-1 text-sm text-slate-300/90">{label}</p>
    </div>
  );
}
