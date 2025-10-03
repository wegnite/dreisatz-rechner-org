export function EducationalContent() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold text-gray-900">
          Wie funktioniert der Dreisatz Rechner?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          Der Dreisatz ist eine grundlegende Rechenmethode zur Lösung von Proportionalitätsaufgaben.
          Mit drei bekannten Werten kann ein vierter Wert berechnet werden. Unser Dreisatz Rechner
          automatisiert diese Berechnung und zeigt Ihnen jeden Rechenschritt im Detail.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Dieser Online Dreisatz Rechner eignet sich perfekt für Schüler, Studenten und alle, die
          schnell und zuverlässig Dreisatzaufgaben lösen möchten. Egal ob proportionaler oder
          antiproportionaler Dreisatz – der Rechner führt Sie Schritt für Schritt zur Lösung.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Proportionaler Dreisatz */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Proportionaler Dreisatz
          </h3>
          <p className="mb-4 text-sm text-gray-700">
            <strong>Regel:</strong> Je mehr/weniger A → desto mehr/weniger B
          </p>
          <div className="mb-4 rounded-md bg-gray-50 p-4">
            <p className="mb-2 text-sm font-medium text-gray-900">Beispiele:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Einkaufspreise (mehr Menge = mehr Kosten)</li>
              <li>• Fahrstrecken (mehr Zeit = mehr Kilometer)</li>
              <li>• Rezepte (mehr Personen = mehr Zutaten)</li>
            </ul>
          </div>
          <div className="rounded-md bg-green-50 p-4">
            <p className="mb-2 text-sm font-medium text-green-900">Rechenweg:</p>
            <ol className="space-y-1 text-sm text-green-700">
              <li>1. Auf 1 Einheit zurückrechnen (÷)</li>
              <li>2. Auf gesuchte Menge hochrechnen (×)</li>
            </ol>
          </div>
        </div>

        {/* Antiproportionaler Dreisatz */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Antiproportionaler Dreisatz
          </h3>
          <p className="mb-4 text-sm text-gray-700">
            <strong>Regel:</strong> Je mehr A → desto weniger B
          </p>
          <div className="mb-4 rounded-md bg-gray-50 p-4">
            <p className="mb-2 text-sm font-medium text-gray-900">Beispiele:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Arbeitszeit (mehr Arbeiter = weniger Zeit)</li>
              <li>• Geschwindigkeit (schneller = kürzere Zeit)</li>
              <li>• Vorräte (mehr Personen = kürzer haltbar)</li>
            </ul>
          </div>
          <div className="rounded-md bg-orange-50 p-4">
            <p className="mb-2 text-sm font-medium text-orange-900">Rechenweg:</p>
            <ol className="space-y-1 text-sm text-orange-700">
              <li>1. Gesamtwert berechnen (×)</li>
              <li>2. Durch neue Menge teilen (÷)</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Merkhilfe */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          💡 Wichtige Hinweise für die Nutzung des Dreisatz Rechners
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>1. Einheiten beachten:</strong> Alle Werte müssen in denselben Einheiten angegeben werden
            (z.B. nur Gramm oder nur Kilogramm, nicht gemischt). Der Dreisatz Rechner zeigt Ihnen,
            wenn Einheiten nicht übereinstimmen.
          </p>
          <p>
            <strong>2. Proportionalität prüfen:</strong> Überlegen Sie, ob mehr von A zu mehr oder weniger von B führt.
            Unser Rechner unterstützt beide Varianten – proportionalen und antiproportionalen Dreisatz.
          </p>
          <p>
            <strong>3. Formel verstehen:</strong> Der Dreisatz Rechner wendet die Formel X = C × B ÷ A an
            (wobei A und B das bekannte Verhältnis sind, C der neue Wert und X das Ergebnis).
            Jeder Rechenschritt wird transparent dargestellt.
          </p>
          <p>
            <strong>4. Lernen durch Beispiele:</strong> Nutzen Sie die vorgegebenen Beispiele im Dreisatz Rechner,
            um die Methode besser zu verstehen. Klicken Sie einfach auf ein Beispiel, und der Rechner
            zeigt Ihnen die komplette Lösung mit allen Zwischenschritten.
          </p>
        </div>
      </div>
    </div>
  );
}
