'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Fuel, Candy, Clock, Ruler, DollarSign, Users, Car, PawPrint } from 'lucide-react';

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

interface ExampleCard {
  icon: React.ReactNode;
  payload: DreisatzExample;
}

const examples: ExampleCard[] = [
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    payload: {
      title: 'Einkauf',
      description: '5 Äpfel kosten 2,50 €',
      a1: 5,
      b1: 2.5,
      a2: 3,
      unitA: 'Äpfel',
      unitB: 'Euro',
      type: 'proportional',
    },
  },
  {
    icon: <Fuel className="h-5 w-5" />,
    payload: {
      title: 'Kraftstoff',
      description: '8 Liter auf 100 km, Strecke 350 km',
      a1: 100,
      b1: 8,
      a2: 350,
      unitA: 'Kilometer',
      unitB: 'Liter',
      type: 'proportional',
    },
  },
  {
    icon: <Candy className="h-5 w-5" />,
    payload: {
      title: 'Kalorien',
      description: '100 g entsprechen 480 kcal',
      a1: 100,
      b1: 480,
      a2: 65,
      unitA: 'Gramm',
      unitB: 'kcal',
      type: 'proportional',
    },
  },
  {
    icon: <Clock className="h-5 w-5" />,
    payload: {
      title: 'Zeit & Arbeit',
      description: '3 Maler benötigen 5 Stunden',
      a1: 3,
      b1: 5,
      a2: 5,
      unitA: 'Maler',
      unitB: 'Stunden',
      type: 'antiproportional',
    },
  },
  {
    icon: <Ruler className="h-5 w-5" />,
    payload: {
      title: 'Maßstab',
      description: '1 cm im Plan entspricht 50 cm real',
      a1: 1,
      b1: 50,
      a2: 12,
      unitA: 'cm (Plan)',
      unitB: 'cm (Real)',
      type: 'proportional',
    },
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    payload: {
      title: 'Wechselkurs',
      description: '100 € entsprechen 110 $',
      a1: 100,
      b1: 110,
      a2: 250,
      unitA: 'Euro',
      unitB: 'US-Dollar',
      type: 'proportional',
    },
  },
  {
    icon: <Car className="h-5 w-5" />,
    payload: {
      title: 'Geschwindigkeit & Zeit',
      description: 'Mit 80 km/h braucht man 3 Stunden',
      a1: 80,
      b1: 3,
      a2: 120,
      unitA: 'km/h',
      unitB: 'Stunden',
      type: 'antiproportional',
    },
  },
  {
    icon: <PawPrint className="h-5 w-5" />,
    payload: {
      title: 'Futter für Tiere',
      description: 'Futter für 3 Hunde reicht 10 Tage',
      a1: 3,
      b1: 10,
      a2: 5,
      unitA: 'Hunde',
      unitB: 'Tage',
      type: 'antiproportional',
    },
  },
  {
    icon: <Users className="h-5 w-5" />,
    payload: {
      title: 'Arbeitszeit',
      description: '2 Personen benötigen 8 Stunden',
      a1: 2,
      b1: 8,
      a2: 4,
      unitA: 'Personen',
      unitB: 'Stunden',
      type: 'antiproportional',
    },
  },
];

interface QuickExamplesProps {
  onExampleClick?: (example: DreisatzExample) => void;
}

export function QuickExamples({ onExampleClick }: QuickExamplesProps) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Beispielrechnungen für den Dreisatz Rechner
        </h2>
        <p className="text-sm text-gray-600">
          Klicken Sie auf ein Beispiel, um die Werte automatisch in den Dreisatz Rechner zu übernehmen
          und die Berechnung mit allen Zwischenschritten anzuzeigen. So lernen Sie die Methode am besten kennen.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {examples.map((example, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onExampleClick?.(example.payload)}
            className="rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className={`rounded-md p-2 ${
                  example.payload.type === 'proportional'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-orange-50 text-orange-600'
                }`}>
                  {example.icon}
                </div>
                <span className="font-semibold text-gray-900">{example.payload.title}</span>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                example.payload.type === 'proportional'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {example.payload.type === 'proportional' ? 'Prop.' : 'Anti.'}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-600">
              {example.payload.description}
            </p>
            <div className="space-y-1 text-xs text-gray-500">
              <div>
                {example.payload.a1} {example.payload.unitA} → {example.payload.b1}{' '}
                {example.payload.unitB}
              </div>
              <div>
                {example.payload.a2} {example.payload.unitA} → ?
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
