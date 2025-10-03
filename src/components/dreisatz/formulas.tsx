'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export function FormulasSection() {
  const t = useTranslations();
  const sections = Array.from({ length: 2 }).map((_, index) => ({
    name: t(`sections.${index}.name`),
    formula: t(`sections.${index}.formula`),
    steps: Array.from({ length: 2 }).map((__, stepIndex) =>
      t(`sections.${index}.steps.${stepIndex}`)
    ),
    question: t(`sections.${index}.question`),
    example: t(`sections.${index}.example`),
    tags: t(`sections.${index}.tags`),
  }));
  const table = Array.from({ length: 4 }).map((_, index) => ({
    situation: t(`table.${index}.situation`),
    question: t(`table.${index}.question`),
    type: t(`table.${index}.type`),
    strategy: t(`table.${index}.strategy`),
  }));
  const tips = Array.from({ length: 3 }).map((_, index) => t(`tips.${index}`));

  return (
    <section id="formeln" className="bg-muted/20 py-16">
      <div className="container space-y-10">
        <div className="space-y-3 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">{t('description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.name} className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{section.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <strong>Formel:</strong> {section.formula}
                </p>
                <ul className="list-disc space-y-1 pl-4">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <p>
                  <strong>Kontrollfrage:</strong> {section.question}
                </p>
                <p>
                  <strong>Beispiel:</strong> {section.example}
                </p>
                <p className="text-xs uppercase tracking-wide text-primary/80">{section.tags}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4" id="tabellen">
          <h3 className="text-2xl font-semibold">{t('tableTitle')}</h3>
          <div className="overflow-hidden rounded-xl border bg-background">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">{t('tableHead.situation')}</th>
                  <th className="px-4 py-3 text-left font-medium">{t('tableHead.question')}</th>
                  <th className="px-4 py-3 text-left font-medium">{t('tableHead.type')}</th>
                  <th className="px-4 py-3 text-left font-medium">{t('tableHead.strategy')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.map((row) => (
                  <tr key={row.question}>
                    <td className="px-4 py-3 font-medium text-foreground">{row.situation}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.question}</td>
                    <td className="px-4 py-3 text-primary font-semibold">{row.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3" id="berechnungsnotizen">
          {tips.map((tip) => (
            <Card key={tip} className="bg-background/80">
              <CardContent className="p-6 text-sm text-muted-foreground">
                {tip}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

