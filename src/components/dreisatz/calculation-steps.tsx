'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Download, Share2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalculationStepsProps {
  result: {
    result: number;
    steps: {
      step1: { description: string; calculation: string; value: number };
      step2: { description: string; calculation: string; value: number };
    };
    formula: string;
  };
  type: 'proportional' | 'antiproportional';
  unitA: string;
  unitB: string;
  a1: number;
  b1: number;
  a2: number;
}

export function CalculationSteps({
  result,
  type,
  unitA,
  unitB,
  a1,
  b1,
  a2,
}: CalculationStepsProps) {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
          Ergebnis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Result */}
        <div className="rounded-lg bg-background p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {a2} {unitA} entsprechen
          </p>
          <p className="mt-2 text-4xl font-bold text-primary">
            {result.result.toFixed(2)} {unitB}
          </p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Rechenweg</h3>
          </div>

          <div className="space-y-4 rounded-lg border bg-background p-4">
            {/* Step 1 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">
                Schritt 1: {result.steps.step1.description}
              </p>
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {a1} {unitA}
                  </span>
                  <span>→</span>
                  <span>
                    {b1} {unitB}
                  </span>
                </div>
                <div className="my-2 text-center text-xs text-muted-foreground">
                  {type === 'proportional' ? `÷${a1}` : `×`} auf beiden Seiten
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {type === 'proportional' ? '1' : a1} {unitA}
                  </span>
                  <span>→</span>
                  <span>
                    {result.steps.step1.value.toFixed(4)}{' '}
                    {type === 'proportional' ? unitB : unitB}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Berechnung: {result.steps.step1.calculation}
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">
                Schritt 2: {result.steps.step2.description}
              </p>
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {type === 'proportional' ? '1' : a1} {unitA}
                  </span>
                  <span>→</span>
                  <span>
                    {result.steps.step1.value.toFixed(4)} {unitB}
                  </span>
                </div>
                <div className="my-2 text-center text-xs text-muted-foreground">
                  {type === 'proportional' ? `×${a2}` : `÷${a2}`} auf beiden
                  Seiten
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {a2} {unitA}
                  </span>
                  <span>→</span>
                  <span className="font-bold text-primary">
                    {result.result.toFixed(2)} {unitB}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Berechnung: {result.steps.step2.calculation}
              </p>
            </div>
          </div>

          {/* Formula */}
          <div className="rounded-lg border bg-muted p-4">
            <p className="mb-2 text-sm font-medium">
              Formel ({type === 'proportional' ? 'Proportional' : 'Antiproportional'}):
            </p>
            <code className="text-sm">{result.formula}</code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Als PDF speichern
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Link teilen
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Grafik anzeigen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
