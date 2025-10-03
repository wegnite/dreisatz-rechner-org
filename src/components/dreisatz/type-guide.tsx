'use client';

import { AlertCircle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

export function TypeGuide() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold text-gray-900">
          Proportional oder Antiproportional?
        </h2>
        <p className="text-base text-gray-600">
          Der wichtigste Schritt beim Dreisatz: Die richtige Art der Berechnung wählen.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Proportional Card */}
        <div className="rounded-lg border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-900">Proportional</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-gray-900">Merkregel:</span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>"Je mehr A, desto mehr B"</strong>
                <br />
                <strong>"Je weniger A, desto weniger B"</strong>
              </p>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">Typische Beispiele:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-600">•</span>
                  <span>
                    <strong>Einkauf:</strong> Mehr Äpfel → höherer Preis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-600">•</span>
                  <span>
                    <strong>Strecke:</strong> Mehr Kilometer → mehr Benzin
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-600">•</span>
                  <span>
                    <strong>Kalorien:</strong> Mehr Gramm → mehr Kalorien
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-green-600">•</span>
                  <span>
                    <strong>Wechselkurs:</strong> Mehr Euro → mehr Dollar
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-100 p-3">
              <p className="text-xs font-medium text-green-900">
                💡 Test: Wenn sich einer der Werte verdoppelt, verdoppelt sich auch der andere?
                → Dann ist es proportional!
              </p>
            </div>
          </div>
        </div>

        {/* Antiproportional Card */}
        <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-2">
              <TrendingDown className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-orange-900">Antiproportional</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-gray-900">Merkregel:</span>
              </div>
              <p className="text-sm text-gray-700">
                <strong>"Je mehr A, desto weniger B"</strong>
                <br />
                <strong>"Je weniger A, desto mehr B"</strong>
              </p>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-900">Typische Beispiele:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-orange-600">•</span>
                  <span>
                    <strong>Geschwindigkeit:</strong> Mehr km/h → weniger Zeit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-orange-600">•</span>
                  <span>
                    <strong>Arbeiter:</strong> Mehr Personen → weniger Zeit
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-orange-600">•</span>
                  <span>
                    <strong>Vorrat:</strong> Mehr Hunde → Futter reicht kürzer
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-orange-600">•</span>
                  <span>
                    <strong>Miete teilen:</strong> Mehr Personen → jeder zahlt weniger
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-orange-100 p-3">
              <p className="text-xs font-medium text-orange-900">
                💡 Test: Wenn sich einer der Werte verdoppelt, halbiert sich der andere?
                → Dann ist es antiproportional!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="text-sm text-gray-700">
            <p className="mb-2 font-semibold text-gray-900">
              Häufiger Fehler: Die falsche Art wählen
            </p>
            <p>
              Die Wahl zwischen proportional und antiproportional ist entscheidend für das richtige
              Ergebnis. Überlegen Sie sich immer: <strong>Was passiert, wenn ich den ersten Wert verdopple?</strong>
            </p>
            <ul className="mt-2 space-y-1">
              <li>✓ Verdoppelt sich der zweite Wert auch? → Proportional</li>
              <li>✓ Halbiert sich der zweite Wert? → Antiproportional</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Decision Table */}
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="bg-gray-50 px-6 py-3">
          <h4 className="font-semibold text-gray-900">Schnelle Entscheidungshilfe</h4>
        </div>
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Wenn in der Aufgabe steht...
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Dann ist es...
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm text-gray-700">
                Preis, Kosten, Kalorien, Menge, Strecke, Gewicht
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Proportional
                </span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-gray-700">
                Geschwindigkeit & Zeit, Arbeiter & Zeit, Personen & Kosten pro Person
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                  Antiproportional
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
