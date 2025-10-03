'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function VisualsSection() {
  return (
    <section id="schritt-verstaendnis" className="py-16 bg-background">
      <div className="container grid gap-8 md:grid-cols-[3fr,2fr] items-center">
        <div className="space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Schritt-für-Schritt-Verständnis
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">
            Dreisatz Rechner mit visuellen Erklärungen
          </h2>
          <p className="text-muted-foreground">
            Die grafische Darstellung hilft, den Dreisatz zu verinnerlichen: Unser Dreisatz Rechner
            zeigt Farbmarkierungen für A₁, B₁, A₂ und B₂, sodass Lernende den Zusammenhang zwischen
            Mengen sofort erkennen.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base">Videoempfehlung</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Kombinieren Sie den Dreisatz Rechner mit kurzen Erklärvideos: Lassen Sie sich den
                  Rechenweg vorlesen, während Sie parallel die Werte im Tool überprüfen.
                </p>
                <p>
                  Tipp: Nutzen Sie Screen-Recorder oder Dokumentenkamera, um Lernfolien mit dem
                  Ergebnisbild zu erstellen.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="text-base">Infografik nutzen</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>
                  Das Symbol im Dreisatz Rechner kann als Anker in Arbeitsblättern dienen. Drucken
                  Sie den Screenshot aus und verbinden Sie Pfeile mit den Rechenschritten – so
                  behalten Lernende die Struktur im Blick.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="relative mx-auto max-w-md">
          <Image
            src="/calculator/calculator.png"
            alt="Visualisierung Dreisatz Rechner"
            width={640}
            height={640}
            className="rounded-2xl border shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
