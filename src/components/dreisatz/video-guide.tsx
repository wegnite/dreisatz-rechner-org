'use client';

import Image from 'next/image';

export function VideoGuideSection() {
  return (
    <section id="dreisatz-video" className="py-16 bg-muted/30">
      <div className="container grid gap-8 md:grid-cols-[3fr,2fr] items-center">
        <div className="space-y-4">
          <span className="text-sm font-medium text-primary uppercase tracking-wide">
            Video &amp; Arbeitsblatt
          </span>
          <h2 className="text-3xl font-serif font-bold md:text-4xl">
            Video: Dreisatz Rechner Schritt-für-Schritt einsetzen
          </h2>
          <p className="text-muted-foreground">
            Die kurze Video-Anleitung zeigt, wie Dreisatz Textaufgaben direkt in den Rechner
            eingefügt werden. Lernende sehen, wie Analyse, Formelschritt und Antwortsatz aufgebaut
            werden. Ergänzend steht eine Infografik zum Download zur Verfügung.
          </p>
          <a
            href="/calculator/calculator.png"
            download
            className="inline-flex w-fit items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Infografik herunterladen
          </a>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background shadow-xl">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/AKafqY4nHCk"
                title="Dreisatz Rechner Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-primary/30 bg-background p-4">
            <Image
              src="/calculator/calculator-favicon.ico"
              alt="Dreisatz Rechner Icon"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="text-sm text-muted-foreground">
              Tipp: Nutzen Sie das Video als Einstieg in Unterrichtsstunden. Stoppen Sie nach jedem
              Rechenschritt und lassen Sie Lernende den Dreisatz Rechner selbst bedienen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

