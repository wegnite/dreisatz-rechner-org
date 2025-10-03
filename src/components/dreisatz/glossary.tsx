'use client';

export function GlossarySection() {
  const entries = [
    {
      term: 'Grundwert (A₁)',
      definition:
        'Die bekannte Ausgangsmenge oder Bezugsgröße im Dreisatz Rechner, z. B. 5 kg, 3 Arbeiter, 100 km. Sie bildet die Basis für die Verhältnisrechnung.',
    },
    {
      term: 'Bezugswert (B₁)',
      definition:
        'Der bekannte Wert, der zum Grundwert im Dreisatz Rechner gehört, z. B. 9,50 €, 8 Stunden oder 45 Liter. Er wird genutzt, um den Wert pro Einheit zu bestimmen.',
    },
    {
      term: 'Zielmenge (A₂)',
      definition:
        'Die gesuchte Menge oder Vergleichsgröße, die Sie im Dreisatz Rechner ermitteln. Mit ihr skalieren Sie den Wert nach oben oder unten.',
    },
    {
      term: 'Gesuchter Wert (B₂)',
      definition:
        'Das Ergebnis des Dreisatzes, das der Dreisatz Rechner berechnet. Der Wert, der zur Zielmenge proportional bzw. antiproportional gehört.',
    },
    {
      term: 'Einheitenschritt',
      definition:
        'Der Zwischenschritt beim proportionalen Dreisatz im Dreisatz Rechner: Ermitteln Sie den Wert für genau eine Einheit, bevor Sie hochrechnen.',
    },
    {
      term: 'Gesamtprodukt',
      definition:
        'Zwischenschritt beim antiproportionalen Dreisatz im Dreisatz Rechner: Produkt aus Ausgangsmenge und Bezugswert, das anschließend durch die neue Menge geteilt wird.',
    },
  ];

  return (
    <section id="glossar" className="py-16">
      <div className="container space-y-8">
        <div className="text-center space-y-3">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Glossar
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">
            Wichtige Begriffe rund um den Dreisatz Rechner
          </h2>
          <p className="text-muted-foreground">
            Nutzen Sie die Definitionssammlung, um Fachbegriffe klar zuzuordnen – perfekt für
            Unterrichtsgespräche und Prüfungswiederholung.
          </p>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          {entries.map((entry) => (
            <div
              key={entry.term}
              className="rounded-lg border bg-muted/40 p-5 shadow-sm transition hover:border-primary/40"
            >
              <dt className="text-lg font-semibold text-primary">{entry.term}</dt>
              <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {entry.definition}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

