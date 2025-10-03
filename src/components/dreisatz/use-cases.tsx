'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickExamples, type DreisatzExample } from './quick-examples';

interface UseCasesSectionProps {
  onExampleClick: (example: DreisatzExample) => void;
}

export function UseCasesSection({ onExampleClick }: UseCasesSectionProps) {
  return (
    <section id="anwendungsfaelle" className="py-16">
      <div className="container space-y-12">
        <div className="text-center space-y-3">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Praxisnah rechnen
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">
            Typische Anwendungsfälle für den Dreisatz Rechner in Deutschland
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            Ob Einkauf, Physikaufgabe oder Projektplanung – der Dreisatz hilft überall dort, wo
            Verhältnisse verglichen werden. Wählen Sie ein Beispiel, lassen Sie sich den Rechenweg
            anzeigen und übertragen Sie die Struktur auf Ihre Aufgabe.
          </p>
        </div>

        <QuickExamples onExampleClick={onExampleClick} />

        <div className="grid gap-6 md:grid-cols-3" id="leitfaden-kurz">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Beruf &amp; Alltag</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Kalkulieren Sie Angebote, Mengenzuschläge oder Liefermengen. Ein korrektes
                Verhältnis spart Kosten und verhindert Engpässe im Lager.
              </p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Materialbedarf in Bauprojekten</li>
                <li>Rezeptanpassung in Gastronomie</li>
                <li>Kostenvergleiche und Rabatte</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Schule &amp; Studium</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3" id="schule">
              <p>
                In Mathe, Physik, Chemie und Wirtschaft zählt der Dreisatz zu den Basiskompetenzen.
                Nutzen Sie unsere Schritt-für-Schritt-Erklärungen für Unterricht und Hausaufgaben.
              </p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Arbeitsblätter für proportional/antiproportional</li>
                <li>Prüfungsvorbereitung mit Lösungsweg</li>
                <li>Selbstkontrolle mit Zwischenfragen</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Technik &amp; Wissenschaft mit dem Dreisatz Rechner</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Skalieren Sie Messwerte, Geschwindigkeiten oder Energiebedarf. Der Rechner liefert
                eine saubere Dokumentation für Laborbuch und Projektreport.
              </p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Strom- und Druckberechnungen</li>
                <li>Dosierung in Laborrezepturen</li>
                <li>Maschinenlaufzeiten &amp; Kapazitäten</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div id="uebungen" className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-lg">Übungsaufgaben zum Mitrechnen</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>1.</strong> Ein Drucker schafft 120 Seiten in 6 Minuten. Berechnen Sie im Dreisatz
                Rechner, wie lange ein Modell benötigt, das 150 Seiten in 6 Minuten druckt, um 420
                Seiten fertigzustellen.
              </p>
              <p>
                <strong>2.</strong> 18 Liter Farbe reichen für 240 m². Verwenden Sie den Dreisatz Rechner,
                um den Farbbedarf für 86 m² zu bestimmen.
              </p>
              <p>
                <strong>3.</strong> Vier Server bearbeiten einen Datenstapel in 15 Minuten. Wie lange dauert
                es mit sechs Servern? Prüfen Sie das Ergebnis mit dem antiproportionalen Dreisatz.
              </p>
              <p className="italic">
                Nutzen Sie den klassischen Modus im Rechner, um Ihre Ergebnisse direkt zu prüfen.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Lernziele &amp; Kompetenzraster</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Grundschule:</strong> Verhältnisse benennen, Einheiten bewusst wählen.
              </p>
              <p>
                <strong>Sekundarstufe I:</strong> komplexe Textaufgaben strukturieren, richtige
                Dreisatzart erkennen, Rechenschritte begründen.
              </p>
              <p>
                <strong>Berufsschule/FOS:</strong> Prozentrechnen, Mischkalkulationen und technische
                Kennzahlen mithilfe des Dreisatzes darstellen.
              </p>
              <p>
                Ergänzen Sie eigene Beispiele, um branchenspezifische Vokabeln (z. B. Lohnkosten,
                Maschinenstunden, Stoffmengenkonzentration) zu trainieren.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
