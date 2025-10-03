import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';

export function EducationalContent() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold">
          Wie funktioniert der Dreisatz?
        </h2>
        <p className="text-muted-foreground">
          Verstehen Sie die Grundlagen in wenigen Minuten
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Proportional */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-lg bg-green-500/10 p-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              Proportional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 font-medium">Je mehr A → mehr B</p>
              <p className="mb-2 font-medium">Je weniger A → weniger B</p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium">Beispiele:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Einkaufspreise (mehr kaufen = mehr zahlen)</li>
                <li>• Entfernungen (mehr Zeit = mehr Strecke)</li>
                <li>• Mengenumrechnung (mehr Gramm = mehr Kilogramm)</li>
                <li>• Rezepte (mehr Personen = mehr Zutaten)</li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-green-500/20 bg-green-500/5 p-4">
              <p className="mb-2 text-sm font-medium text-green-600 dark:text-green-400">
                Rechenregel:
              </p>
              <ol className="space-y-2 text-sm">
                <li>1. Auf 1 Einheit zurückrechnen (÷)</li>
                <li>2. Auf gesuchte Menge hochrechnen (×)</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Antiproportional */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-lg bg-orange-500/10 p-2">
                <TrendingDown className="h-5 w-5 text-orange-500" />
              </div>
              Antiproportional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 font-medium">Je mehr A → weniger B</p>
              <p className="mb-2 font-medium">Je weniger A → mehr B</p>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium">Beispiele:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Arbeitszeit (mehr Arbeiter = weniger Zeit)</li>
                <li>
                  • Geschwindigkeit (schneller fahren = weniger Fahrzeit)
                </li>
                <li>• Personenanzahl (mehr Teilung = weniger pro Person)</li>
                <li>• Hundefutter (mehr Hunde = weniger Tage)</li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-orange-500/20 bg-orange-500/5 p-4">
              <p className="mb-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                Rechenregel:
              </p>
              <ol className="space-y-2 text-sm">
                <li>1. Gesamtwert berechnen (×)</li>
                <li>2. Durch neue Menge teilen (÷)</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Merkhilfe */}
      <Card className="mt-6 border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Merkhilfe
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              1
            </div>
            <div>
              <p className="font-medium">
                Beide Werte steigen/fallen zusammen?
              </p>
              <p className="text-sm text-muted-foreground">
                → Verwenden Sie den <strong>proportionalen</strong> Dreisatz
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              2
            </div>
            <div>
              <p className="font-medium">
                Ein Wert steigt, der andere fällt?
              </p>
              <p className="text-sm text-muted-foreground">
                → Verwenden Sie den <strong>antiproportionalen</strong>{' '}
                Dreisatz
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              3
            </div>
            <div>
              <p className="font-medium">Einheiten immer gleich halten!</p>
              <p className="text-sm text-muted-foreground">
                Gramm bleibt Gramm, Euro bleibt Euro – niemals mischen
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
