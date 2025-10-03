'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Fuel, Candy, Clock, Ruler, DollarSign } from 'lucide-react';

interface Example {
  icon: React.ReactNode;
  title: string;
  description: string;
  a1: string;
  b1: string;
  a2: string;
  unitA: string;
  unitB: string;
  type: 'proportional' | 'antiproportional';
}

const examples: Example[] = [
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: 'Einkauf',
    description: '5 Äpfel kosten 2,50 €',
    a1: '5',
    b1: '2.50',
    a2: '3',
    unitA: 'Äpfel',
    unitB: 'Euro',
    type: 'proportional',
  },
  {
    icon: <Fuel className="h-5 w-5" />,
    title: 'Kraftstoff',
    description: '8L/100km, 45L getankt',
    a1: '8',
    b1: '100',
    a2: '45',
    unitA: 'Liter',
    unitB: 'km',
    type: 'proportional',
  },
  {
    icon: <Candy className="h-5 w-5" />,
    title: 'Kalorien',
    description: '100g = 480kcal',
    a1: '100',
    b1: '480',
    a2: '65',
    unitA: 'Gramm',
    unitB: 'kcal',
    type: 'proportional',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Zeit/Arbeit',
    description: '3 Maler = 5 Stunden',
    a1: '3',
    b1: '5',
    a2: '5',
    unitA: 'Maler',
    unitB: 'Stunden',
    type: 'antiproportional',
  },
  {
    icon: <Ruler className="h-5 w-5" />,
    title: 'Maßstab',
    description: '1:50 Bauplan',
    a1: '1',
    b1: '50',
    a2: '12',
    unitA: 'cm (Plan)',
    unitB: 'cm (Real)',
    type: 'proportional',
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: 'Wechselkurs',
    description: '100€ = 110$',
    a1: '100',
    b1: '110',
    a2: '250',
    unitA: 'Euro',
    unitB: 'Dollar',
    type: 'proportional',
  },
];

interface QuickExamplesProps {
  onExampleClick?: (example: Omit<Example, 'icon'>) => void;
}

export function QuickExamples({ onExampleClick }: QuickExamplesProps) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">
          Schnellbeispiele – Einfach klicken
        </h2>
        <p className="text-muted-foreground">
          Wählen Sie ein Beispiel aus, um es sofort zu berechnen
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {examples.map((example, index) => (
          <Card
            key={index}
            className="group cursor-pointer transition-all hover:border-primary hover:shadow-lg"
            onClick={() => onExampleClick?.(example)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="rounded-lg bg-primary/10 p-2 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  {example.icon}
                </div>
                {example.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {example.description}
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bekannt:</span>
                  <span>
                    {example.a1} {example.unitA} → {example.b1} {example.unitB}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gesucht:</span>
                  <span>
                    {example.a2} {example.unitA} → ?
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Typ:</span>
                  <span className="capitalize">{example.type}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onExampleClick?.(example);
                }}
              >
                Berechnen →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
