'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export function ChecklistSection() {
  const checklist = [
    {
      title: 'Einheiten konsequent prüfen',
      description:
        'Notieren Sie hinter jeder Zahl sofort die Einheit (€, km, Minuten) und prüfen Sie im Dreisatz Rechner, ob alle Werte vergleichbar sind. Mischen Sie keine Einheiten innerhalb eines Dreisatzes – rechnen Sie vorher um.',
    },
    {
      title: 'Richtige Dreisatzart erkennen',
      description:
        'Stellen Sie sich die Veränderung gedanklich vor. Wenn ein Wert steigt und der andere sinkt, handelt es sich um einen antiproportionalen Dreisatz.',
    },
    {
      title: 'Zwischenwerte dokumentieren',
      description:
        'Schreiben Sie den Wert pro Einheit oder das Gesamtprodukt auf. Das erleichtert die Kontrolle und die spätere Erklärung des Rechenwegs.',
    },
    {
      title: 'Ergebnis plausibilisieren',
      description:
        'Überprüfen Sie abschließend, ob der neue Wert realistisch ist. Nutzen Sie die ursprünglichen Zahlen, um eine grobe Schätzung vorzunehmen.',
    },
  ];

  return (
    <section id="fehlervermeidung" className="bg-muted/30 py-16">
      <div className="container space-y-10">
        <div className="text-center space-y-3">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Fehler vermeiden
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">
            Checkliste für sichere Dreisatz Rechner Berechnungen im Alltag
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            Halten Sie sich an diese Kontrollpunkte, um typische Stolperfallen zu vermeiden. Ideal
            für Prüfungen, Klassenarbeiten und schnelles Nachrechnen im Alltag.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {checklist.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

