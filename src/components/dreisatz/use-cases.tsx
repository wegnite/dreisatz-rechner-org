'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { QuickExamples, type DreisatzExample } from './quick-examples';

interface UseCasesSectionProps {
  onExampleClick: (example: DreisatzExample) => void;
}

export function UseCasesSection({ onExampleClick }: UseCasesSectionProps) {
  const t = useTranslations();
  const categories = Array.from({ length: 3 }).map((_, index) => ({
    title: t(`categories.${index}.title`),
    body: t(`categories.${index}.body`),
    bullets: Array.from({ length: 3 }).map((__, bulletIndex) =>
      t(`categories.${index}.bullets.${bulletIndex}`)
    ),
  }));
  const exercises = Array.from({ length: 3 }).map((_, index) =>
    t(`exercises.${index}`)
  );
  const learningGoals = Array.from({ length: 3 }).map((_, index) =>
    t(`learningGoals.points.${index}`)
  );

  return (
    <section id="anwendungsfaelle" className="py-16">
      <div className="container space-y-12">
        <div className="space-y-3 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            {t('label')}
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">{t('description')}</p>
        </div>

        <QuickExamples onExampleClick={onExampleClick} />

        <div className="grid gap-6 md:grid-cols-3" id="leitfaden-kurz">
          {categories.map((category) => (
            <Card key={category.title} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{category.body}</p>
                <ul className="list-disc space-y-1 pl-4">
                  {category.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div id="uebungen" className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg">{t('labelExercises')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {exercises.map((exercise, index) => (
                <p key={exercise}>
                  <strong>{index + 1}.</strong> {exercise}
                </p>
              ))}
              <p className="italic">{t('exerciseNote')}</p>
            </CardContent>
          </Card>

          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">{t('learningGoals.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {learningGoals.map((goal) => (
                <p key={goal}>{goal}</p>
              ))}
              <p>{t('learningGoals.note')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

