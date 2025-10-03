'use client';

import { Button } from '@/components/ui/button';
import { useMessages, useTranslations } from 'next-intl';
import {
  Candy,
  Clock,
  DollarSign,
  Fuel,
  PawPrint,
  Ruler,
  ShoppingCart,
  Users,
  Car,
} from 'lucide-react';

export interface DreisatzExample {
  title: string;
  description: string;
  a1: number;
  b1: number;
  a2: number;
  unitA: string;
  unitB: string;
  type: 'proportional' | 'antiproportional';
}

const ICON_MAP: Record<string, JSX.Element> = {
  shopping: <ShoppingCart className="h-5 w-5" />,
  fuel: <Fuel className="h-5 w-5" />,
  calorie: <Candy className="h-5 w-5" />,
  time: <Clock className="h-5 w-5" />,
  scale: <Ruler className="h-5 w-5" />,
  currency: <DollarSign className="h-5 w-5" />,
  animal: <PawPrint className="h-5 w-5" />,
  team: <Users className="h-5 w-5" />,
  speed: <Car className="h-5 w-5" />,
};

interface QuickExamplesProps {
  onExampleClick?: (example: DreisatzExample) => void;
}

export function QuickExamples({ onExampleClick }: QuickExamplesProps) {
  const messages = useMessages() as Record<string, any>;
  const t = useTranslations();
  const examples = (messages?.DreisatzExamples as any[]) || [];

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          {t('examplesHeading')}
        </h2>
        <p className="text-sm text-muted-foreground">{t('examplesDescription')}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example, index) => {
          const values = example['values'] || {};
          const payload: DreisatzExample = {
            title: example['title'],
            description: example['description'],
            a1: Number(values['a1'] ?? 0),
            b1: Number(values['b1'] ?? 0),
            a2: Number(values['a2'] ?? 0),
            unitA: values['unitA'] ?? '',
            unitB: values['unitB'] ?? '',
            type: (values['type'] ?? 'proportional') as DreisatzExample['type'],
          };
          const iconName = (example['icon'] as string) || 'shopping';
          const icon = ICON_MAP[iconName] ?? ICON_MAP['shopping'];
          const typeLabel =
            payload.type === 'proportional'
 ? t('typeLabelProportional') : t('typeLabelAntiproportional');

          return (
            <button
              key={index}
              type="button"
              onClick={() => onExampleClick?.(payload)}
              className="rounded-lg border border-border bg-background p-4 text-left transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={"rounded-md p-2 " +
                      (payload.type === 'proportional'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-amber-100 text-amber-600')}
                  >
                    {icon}
                  </div>
                  <span className="font-semibold text-foreground">{payload.title}</span>
                </div>
                <span
                  className={"rounded-full px-2 py-0.5 text-xs font-medium " +
                    (payload.type === 'proportional'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700')}
                >
                  {typeLabel}
                </span>
              </div>
              <p className="mb-2 text-sm text-muted-foreground">{payload.description}</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>{example['known']}</div>
                <div>{example['question']}</div>
              </div>
              <Button variant="link" className="mt-3 h-auto px-0 text-sm">
                {t('exampleCta')}
              </Button>
            </button>
          );
        })}
      </div>
    </div>
  );
}
