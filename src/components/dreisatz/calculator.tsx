'use client';

import { useState } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalculationSteps } from './calculation-steps';

type CalculationType = 'proportional' | 'antiproportional';

interface CalculationResult {
  result: number;
  steps: {
    step1: { description: string; calculation: string; value: number };
    step2: { description: string; calculation: string; value: number };
  };
  formula: string;
}

export function DreisatzCalculator() {
  const [type, setType] = useState<CalculationType>('proportional');
  const [a1, setA1] = useState('500');
  const [b1, setB1] = useState('3.85');
  const [a2, setA2] = useState('200');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [unitA, setUnitA] = useState('Gramm');
  const [unitB, setUnitB] = useState('Euro');

  const calculate = () => {
    const numA1 = parseFloat(a1);
    const numB1 = parseFloat(b1);
    const numA2 = parseFloat(a2);

    if (isNaN(numA1) || isNaN(numB1) || isNaN(numA2)) {
      return;
    }

    let finalResult: number;
    let step1Value: number;
    let step1Calc: string;
    let step2Calc: string;

    if (type === 'proportional') {
      // Step 1: Calculate value for 1 unit of A
      step1Value = numB1 / numA1;
      step1Calc = `${numB1} ÷ ${numA1} = ${step1Value.toFixed(4)}`;

      // Step 2: Calculate for A2
      finalResult = step1Value * numA2;
      step2Calc = `${step1Value.toFixed(4)} × ${numA2} = ${finalResult.toFixed(2)}`;
    } else {
      // Antiproportional
      // Step 1: Calculate total (product)
      step1Value = numA1 * numB1;
      step1Calc = `${numA1} × ${numB1} = ${step1Value.toFixed(4)}`;

      // Step 2: Divide by new A value
      finalResult = step1Value / numA2;
      step2Calc = `${step1Value.toFixed(4)} ÷ ${numA2} = ${finalResult.toFixed(2)}`;
    }

    const calculationResult: CalculationResult = {
      result: finalResult,
      steps: {
        step1: {
          description:
            type === 'proportional'
              ? 'Auf 1 Einheit zurückrechnen'
              : 'Gesamtwert berechnen',
          calculation: step1Calc,
          value: step1Value,
        },
        step2: {
          description:
            type === 'proportional'
              ? 'Auf gesuchte Menge hochrechnen'
              : 'Durch neue Menge teilen',
          calculation: step2Calc,
          value: finalResult,
        },
      },
      formula:
        type === 'proportional'
          ? `B₂ = B₁ × (A₂ / A₁) = ${numB1} × (${numA2} / ${numA1})`
          : `B₂ = (A₁ × B₁) / A₂ = (${numA1} × ${numB1}) / ${numA2}`,
    };

    setResult(calculationResult);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Calculator Type Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card
          className={`cursor-pointer border-2 transition-all ${
            type === 'proportional'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => setType('proportional')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5" />
              Proportional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Je mehr A, desto mehr B
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Beispiel: Mehr Gramm → Mehr Euro
            </p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer border-2 transition-all ${
            type === 'antiproportional'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
          onClick={() => setType('antiproportional')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5" />
              Antiproportional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Je mehr A, desto weniger B
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Beispiel: Mehr Arbeiter → Weniger Zeit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Bekanntes Verhältnis
            <Info className="h-4 w-4 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="a1">Größe A₁</Label>
              <div className="flex gap-2">
                <Input
                  id="a1"
                  type="number"
                  value={a1}
                  onChange={(e) => setA1(e.target.value)}
                  placeholder="500"
                  className="text-lg"
                />
                <Input
                  value={unitA}
                  onChange={(e) => setUnitA(e.target.value)}
                  placeholder="Einheit"
                  className="w-32"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="b1">Größe B₁</Label>
              <div className="flex gap-2">
                <Input
                  id="b1"
                  type="number"
                  value={b1}
                  onChange={(e) => setB1(e.target.value)}
                  placeholder="3.85"
                  className="text-lg"
                />
                <Input
                  value={unitB}
                  onChange={(e) => setUnitB(e.target.value)}
                  placeholder="Einheit"
                  className="w-32"
                />
              </div>
            </div>
          </div>

          <div className="my-4 flex justify-center">
            <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground" />
          </div>

          <div className="space-y-4">
            <CardTitle className="text-base">Gesuchtes Verhältnis</CardTitle>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="a2">Größe A₂</Label>
                <div className="flex gap-2">
                  <Input
                    id="a2"
                    type="number"
                    value={a2}
                    onChange={(e) => setA2(e.target.value)}
                    placeholder="200"
                    className="text-lg"
                  />
                  <Input
                    value={unitA}
                    disabled
                    placeholder="Einheit"
                    className="w-32"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="result">Größe B₂ (Ergebnis)</Label>
                <div className="flex gap-2">
                  <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 text-lg">
                    {result ? result.result.toFixed(2) : '?'}
                  </div>
                  <Input
                    value={unitB}
                    disabled
                    placeholder="Einheit"
                    className="w-32"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={calculate} className="mt-6 w-full" size="lg">
            <Calculator className="mr-2 h-4 w-4" />
            Dreisatz Berechnen
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <CalculationSteps
          result={result}
          type={type}
          unitA={unitA}
          unitB={unitB}
          a1={parseFloat(a1)}
          b1={parseFloat(b1)}
          a2={parseFloat(a2)}
        />
      )}
    </div>
  );
}
