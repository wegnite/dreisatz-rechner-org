'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function FormulasSection() {
  return (
    <section id="formeln" className="bg-muted/20 py-16">
      <div className="container space-y-10">
        <div className="text-center space-y-3">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Dreisatz-Formeln
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">
            Proportionaler und antiproportionaler Dreisatz im Überblick
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground">
            Merken Sie sich mit dem Dreisatz Rechner die wichtigsten Formeln, Rechenschritte und Kontrollfragen. Jede Box nennt typische Situationen, in denen der Dreisatz Rechner eingesetzt wird.
            Jede Box enthält ein Beispiel mit Einheiten sowie eine Interpretation, wann die Methode
            im Alltag angewendet wird.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-emerald-500 text-xl">
                Proportionaler Dreisatz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Formel:</strong> B₂ = B₁ × (A₂ ÷ A₁)
              </p>
              <p>
                <strong>Rechenweg:</strong> Teilen Sie zuerst den bekannten Wert durch die bekannte
                Menge, um den Wert pro Einheit zu erhalten. Multiplizieren Sie anschließend mit der
                gesuchten Menge.
              </p>
              <p>
                <strong>Kontrollfrage:</strong> Steigt der eine Wert, steigt der andere ebenfalls?
                → proportional.
              </p>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="font-medium">Beispiel im Dreisatz Rechner</p>
                <p>
                  5 kg Äpfel kosten 9,50 €. Wie viel kosten 3,2 kg?
                  <br />
                  Lösung: 9,50 € ÷ 5 = 1,90 € pro kg → 1,90 € × 3,2 = 6,08 €.
                </p>
                <p className="text-muted-foreground">
                  Typische Stichworte für den Dreisatz Rechner: Mengenberechnung, Einkauf, Mischungsverhältnis, Backrezepte.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-300/40">
            <CardHeader>
              <CardTitle className="text-amber-500 text-xl">
                Antiproportionaler Dreisatz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Formel:</strong> B₂ = (A₁ × B₁) ÷ A₂
              </p>
              <p>
                <strong>Rechenweg:</strong> Bilden Sie zunächst das Produkt aus den bekannten
                Größen. Teilen Sie dieses Gesamtprodukt durch die neue Menge.
              </p>
              <p>
                <strong>Kontrollfrage:</strong> Wenn ein Wert größer wird, wird der andere kleiner?
                → antiproportional.
              </p>
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="font-medium">Beispiel im Dreisatz Rechner</p>
                <p>
                  3 Monteur:innen erledigen eine Arbeit in 8 Stunden. Wie lange brauchen 5
                  Monteur:innen?
                  <br />
                  Lösung: 3 × 8 = 24 Stunden-Teams → 24 ÷ 5 = 4,8 Stunden.
                </p>
                <p className="text-muted-foreground">
                  Typische Stichworte: Teamarbeit, Maschinenlaufzeit, Geschwindigkeiten, Füllzeiten.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="tabellen" className="space-y-4">
          <h3 className="text-2xl font-semibold">Vergleichstabelle für häufige Aufgaben</h3>
          <p className="text-muted-foreground">
            Nutzen Sie die Tabelle, um passende Formeln und Kontrollfragen schnell zuzuordnen. Die
            Beispiele eignen sich hervorragend für Unterricht, Hausaufgaben und Prüfungsvorbereitung.
          </p>
          <div className="overflow-hidden rounded-xl border bg-background">
            <table className="min-w-full divide-y divide-border text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Situation</th>
                  <th className="px-4 py-3 text-left font-medium">Fragestellung</th>
                  <th className="px-4 py-3 text-left font-medium">Typ</th>
                  <th className="px-4 py-3 text-left font-medium">Mini-Strategie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3">Spendenvorbereitung</td>
                  <td className="px-4 py-3">Wie viel kostet 1,2 kg bei 7,80 € für 3 kg?</td>
                  <td className="px-4 py-3 text-emerald-500 font-medium">proportional</td>
                  <td className="px-4 py-3">Preis für 1 kg berechnen, dann hochrechnen.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Bauarbeiten</td>
                  <td className="px-4 py-3">Wie lange brauchen 9 Personen statt 6?</td>
                  <td className="px-4 py-3 text-amber-500 font-medium">antiproportional</td>
                  <td className="px-4 py-3">Produkt bilden und durch neue Personenzahl teilen.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Chemische Mischung</td>
                  <td className="px-4 py-3">Wie viel Lösungsmittel für 250 ml bei 60 g/150 ml?</td>
                  <td className="px-4 py-3 text-emerald-500 font-medium">proportional</td>
                  <td className="px-4 py-3">Grundwert auf 1 ml, anschließend auf Zielmenge.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Transportlogistik</td>
                  <td className="px-4 py-3">Wie viele Fahrten mit kleinerem LKW?</td>
                  <td className="px-4 py-3 text-amber-500 font-medium">antiproportional</td>
                  <td className="px-4 py-3">Ladung × Fahrten konstant halten.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3" id="berechnungsnotizen">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tipp: Einheiten prüfen</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Schreiben Sie die verwendeten Einheiten neben jede Zahl. Sobald sich eine Einheit
                unterscheidet (z. B. Minuten statt Stunden), rechnen Sie zuvor um.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tipp: Ergebnis plausibilisieren</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Stellen Sie sich die Ausgangssituation bildlich vor. Wenn der Wert deutlich größer
                oder kleiner ausfällt als erwartet, kontrollieren Sie den Rechenschritt.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tipp: Zwischenergebnis notieren</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Halten Sie den Wert pro Einheit bzw. das Gesamtprodukt schriftlich fest. Das hilft
                bei Prüfungen und erleichtert das Kontrollrechnen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

