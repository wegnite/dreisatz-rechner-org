'use client';

import { useEffect, useState } from 'react';
import type { DreisatzExample } from './quick-examples';

type CalculationType = 'proportional' | 'antiproportional';

interface DreisatzCalculatorProps {
  example?: DreisatzExample;
}

export function DreisatzCalculator({ example }: DreisatzCalculatorProps) {
  const [a1, setA1] = useState('');
  const [b1, setB1] = useState('');
  const [a2, setA2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationType, setCalculationType] = useState<CalculationType>('proportional');

  useEffect(() => {
    if (!example) return;
    setA1(example.a1.toString());
    setB1(example.b1.toString());
    setA2(example.a2.toString());
    setCalculationType(example.type);
    setResult(null);
  }, [example]);

  useEffect(() => {
    const numA1 = parseFloat(a1);
    const numB1 = parseFloat(b1);
    const numA2 = parseFloat(a2);

    if (!isNaN(numA1) && !isNaN(numB1) && !isNaN(numA2) && numA1 !== 0) {
      let calculated: number;
      if (calculationType === 'proportional') {
        // Proportional: X = (A2 × B1) / A1
        calculated = (numA2 * numB1) / numA1;
      } else {
        // Antiproportional: X = (A1 × B1) / A2
        calculated = (numA1 * numB1) / numA2;
      }
      setResult(calculated);
    } else {
      setResult(null);
    }
  }, [a1, b1, a2, calculationType]);

  // Calculate intermediate step (per unit)
  const numA1 = parseFloat(a1);
  const numB1 = parseFloat(b1);
  const numA2 = parseFloat(a2);
  const perUnit = !isNaN(numA1) && !isNaN(numB1) && numA1 !== 0 ? numB1 / numA1 : null;

  return (
    <div className="w-full">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Calculator */}
        <div className="md:col-span-2">
          <form className="space-y-8">
            {/* Calculation Type Selector */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <label className="mb-3 block text-sm font-semibold text-gray-900">
                Art der Berechnung
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setCalculationType('proportional')}
                  className={`rounded-lg border-2 px-4 py-3 text-left transition-all ${
                    calculationType === 'proportional'
                      ? 'border-green-500 bg-green-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">Proportional</div>
                  <div className="mt-1 text-xs text-gray-600">
                    Je mehr A, desto mehr B
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationType('antiproportional')}
                  className={`rounded-lg border-2 px-4 py-3 text-left transition-all ${
                    calculationType === 'antiproportional'
                      ? 'border-orange-500 bg-orange-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">Antiproportional</div>
                  <div className="mt-1 text-xs text-gray-600">
                    Je mehr A, desto weniger B
                  </div>
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Zugrundeliegendes Verhältnis
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="valueA" className="mb-2 block text-sm font-medium text-gray-700">
                    Wert A
                  </label>
                  <input
                    type="number"
                    id="valueA"
                    value={a1}
                    onChange={(e) => setA1(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoComplete="off"
                    tabIndex={1}
                  />
                </div>
                <div>
                  <label htmlFor="valueB" className="mb-2 block text-sm font-medium text-gray-700">
                    Wert B
                  </label>
                  <input
                    type="number"
                    id="valueB"
                    value={b1}
                    onChange={(e) => setB1(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoComplete="off"
                    tabIndex={2}
                  />
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Zu errechnendes Verhältnis
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="valueC" className="mb-2 block text-sm font-medium text-gray-700">
                    Wert C
                  </label>
                  <input
                    type="number"
                    id="valueC"
                    value={a2}
                    onChange={(e) => setA2(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-base focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoComplete="off"
                    tabIndex={3}
                  />
                </div>
                <div>
                  <label htmlFor="result" className="mb-2 block text-sm font-medium text-gray-700">
                    Ergebnis X
                  </label>
                  <div className="w-full rounded-md border-0 px-4 py-2.5 text-base font-bold text-red-600">
                    {result !== null ? result.toFixed(4) : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Dreisatz-Tabelle (Calculation Steps) */}
            {result !== null && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Dreisatz-Tabelle</h2>
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Schritt
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Wert A
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                          →
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Wert B
                        </th>
                        <th className="hidden px-6 py-3 text-left text-sm font-semibold text-gray-900 md:table-cell">
                          Rechenweg
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Step 1: Known relationship */}
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Bekanntes Verhältnis
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{a1}</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-500">→</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{b1}</td>
                        <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                          Ausgangswerte
                        </td>
                      </tr>

                      {/* Step 2: Calculate per unit */}
                      <tr className="bg-blue-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Rückrechnung auf 1
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">1</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-500">→</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {perUnit?.toFixed(4)}
                        </td>
                        <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                          {calculationType === 'proportional'
                            ? `÷ ${a1} (beide Seiten)`
                            : `× ${a1} (linke Seite ÷, rechte Seite ×)`
                          }
                        </td>
                      </tr>

                      {/* Step 3: Calculate result */}
                      <tr className="bg-green-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Berechnetes Verhältnis
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{a2}</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-500">→</td>
                        <td className="px-6 py-4 text-sm font-bold text-red-600">
                          {result.toFixed(4)}
                        </td>
                        <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                          {calculationType === 'proportional'
                            ? `× ${a2} (beide Seiten)`
                            : `× ${a2} auf linker Seite, ÷ ${a2} auf rechter Seite`
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Formula Display */}
                <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Dreisatz-Formel</h3>
                  <div className="space-y-3">
                    <div className="rounded-md bg-white p-4 font-mono text-base">
                      {calculationType === 'proportional' ? (
                        <div className="text-center">
                          X = (A2 × B1) ÷ A1 = ({a2} × {b1}) ÷ {a1} = <span className="font-bold text-red-600">{result.toFixed(4)}</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          X = (A1 × B1) ÷ A2 = ({a1} × {b1}) ÷ {a2} = <span className="font-bold text-red-600">{result.toFixed(4)}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong className="font-semibold">Zusammenhang:</strong>{' '}
                      {calculationType === 'proportional'
                        ? 'Bei proportionalen Verhältnissen wachsen beide Werte gleichmäßig. Verdoppelt sich A, verdoppelt sich auch B.'
                        : 'Bei antiproportionalen Verhältnissen verhalten sich die Werte umgekehrt. Verdoppelt sich A, halbiert sich B.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Column - Information */}
        <div className="space-y-6 rounded-lg bg-gray-50 p-6">
          <div>
            <p className="mb-4 text-sm leading-relaxed text-gray-700">
              <strong className="font-semibold">Tja, der liebe Dreisatz.</strong> Eigentlich ein recht einfacher Mathematischer Satz, den man aber gerne mal vergisst. Kein Problem, denn hier hat man die Möglichkeit, diesen schnell ausrechnen zu lassen.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900">
              Formel: <span className="font-mono">X = C × B ÷ A</span>
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              Kleine Beispielrechnung:
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              Mein Auto kommt mit 60 l Benzin insgesamt 750 km weit. Wie weit kommt es mit nur 5 l aus dem Reservekanister?
            </p>
            <button
              type="button"
              onClick={() => {
                setA1('60');
                setB1('750');
                setA2('5');
              }}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              &gt; Beispiel laden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
